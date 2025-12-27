import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Initialize Resend lazily to avoid build-time errors
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured, email notifications disabled");
    return null;
  }
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, company } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert([{ email: email.trim().toLowerCase(), name: name?.trim() || null, company: company?.trim() || null }]);

    if (dbError) {
      // Unique constraint violation - already on waitlist
      if (dbError.code === "23505") {
        return NextResponse.json(
          { message: "You are already on the waitlist!" },
          { status: 200 }
        );
      }
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    // Send notification email to owner
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: "Entourage <onboarding@resend.dev>",
          to: "iivo.angerpuro@gmail.com",
          subject: "New Waitlist Signup - Entourage",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000; margin-bottom: 24px;">New Waitlist Signup</h2>
              <div style="background: #f9f9f9; padding: 20px; border: 1px solid #e5e5e5;">
                <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${email}</p>
                ${name ? `<p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${name}</p>` : ""}
                ${company ? `<p style="margin: 0 0 12px 0;"><strong>Company:</strong> ${company}</p>` : ""}
                <p style="margin: 0; color: #666;"><strong>Signed up:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        // Log but don't fail the request if email fails
        console.error("Email notification error:", emailError);
      }
    }

    return NextResponse.json(
      { message: "Successfully joined the waitlist!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
