import { useState, useRef } from "react";
import { WaitlistData, ApiResponse } from "@/lib/types";
import {
  trackWaitlistFormStarted,
  trackWaitlistFormSubmitted,
  trackWaitlistFormSuccess,
  trackWaitlistFormError,
} from "@/lib/analytics";

export function useWaitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const hasTrackedStart = useRef(false);

  const trackStart = () => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackWaitlistFormStarted();
    }
  };

  const submit = async (data: WaitlistData) => {
    setStatus("loading");
    setMessage("");
    trackWaitlistFormSubmitted();

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData: ApiResponse = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(responseData.message || "Successfully joined!");
        trackWaitlistFormSuccess();
        return true;
      } else {
        setStatus("error");
        const errorMsg = responseData.error || "Something went wrong";
        setMessage(errorMsg);
        trackWaitlistFormError(errorMsg);
        return false;
      }
    } catch {
      setStatus("error");
      const errorMsg = "Failed to submit. Please try again.";
      setMessage(errorMsg);
      trackWaitlistFormError(errorMsg);
      return false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setMessage("");
    hasTrackedStart.current = false;
  };

  return { status, message, submit, trackStart, reset };
}
