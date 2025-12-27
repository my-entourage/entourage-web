# SEO Optimization Implementation Plan

## Overview

Implement comprehensive SEO optimization for the Entourage marketing landing page following Next.js 16 best practices. This includes metadata configuration, Open Graph/Twitter cards, JSON-LD structured data, sitemap, robots.txt, and dynamic OG image generation.

## Current State Analysis

**Existing Setup:**
- Basic metadata in `src/app/layout.tsx:28-31` with only title and description
- No `metadataBase` configured (causes broken social preview URLs)
- No Open Graph or Twitter card metadata
- No sitemap.ts or robots.ts
- No JSON-LD structured data
- Only favicon.ico in public/

**What's Already Good:**
- Fonts use `display: "swap"` for performance
- `lang="en"` set on `<html>` tag
- Proper font loading with next/font

## Desired End State

After implementation:
- Complete metadata with all SEO fields in layout.tsx
- Open Graph and Twitter cards configured for social sharing
- Organization schema in layout, SoftwareApplication schema on landing page
- Dynamic OG image generation at `/opengraph-image`
- Sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`

**Verification:**
- Social previews work on Twitter/LinkedIn/Facebook debug tools
- Google Rich Results Test passes for structured data
- Lighthouse SEO score is 100
- `/sitemap.xml` and `/robots.txt` return valid content

## What We're NOT Doing

- Adding page-specific metadata for other routes (only root for now)
- Implementing blog/dynamic page SEO (no blog exists yet)
- Adding Google Analytics or Search Console verification
- Creating multiple sitemap files (single page site)
- Adding alternate language versions

## Implementation Approach

Use Next.js 16 native features exclusively - no third-party SEO packages. All files use TypeScript and follow existing project conventions.

---

## Phase 1: Metadata Foundation

### Overview

Configure complete metadata in root layout with metadataBase, title template, and all standard SEO fields.

### Changes Required:

#### 1. Update Root Layout Metadata

**File**: `src/app/layout.tsx`

**Changes**: Replace the existing metadata export with comprehensive configuration

```tsx
import type { Metadata } from "next";

const siteUrl = "https://myentourage.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Entourage - AI Task Extraction",
    template: "%s | Entourage",
  },
  description:
    "Know what needs to be done. Without touching your task list. Automatically extract actionable items from meetings, chats, emails, and documents.",
  keywords: [
    "AI",
    "task extraction",
    "productivity",
    "automation",
    "task management",
    "meeting notes",
    "email processing",
  ],
  authors: [{ name: "Entourage" }],
  creator: "Entourage",
  publisher: "Entourage",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Entourage",
    title: "Entourage - AI Task Extraction",
    description:
      "Know what needs to be done. Without touching your task list.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Entourage - AI Task Extraction Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entourage - AI Task Extraction",
    description:
      "Know what needs to be done. Without touching your task list.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
};
```

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `pnpm build`
- [x] Type checking passes: `pnpm tsc --noEmit`
- [x] Dev server starts: `pnpm dev`

#### Manual Verification:
- [ ] View page source shows complete meta tags
- [ ] `<meta property="og:title">` is present
- [ ] `<meta name="twitter:card">` is present

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 2.

---

## Phase 2: Dynamic OG Image

### Overview

Create a dynamic Open Graph image using Next.js ImageResponse API. This generates a branded 1200x630 image on-the-fly.

### Changes Required:

#### 1. Create OG Image Route

**File**: `src/app/opengraph-image.tsx`

**Changes**: Create new file with ImageResponse

```tsx
import { ImageResponse } from "next/og";

export const alt = "Entourage - AI Task Extraction";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Plus corners */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            fontSize: 32,
            color: "#52525B",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            fontSize: 32,
            color: "#52525B",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            fontSize: 32,
            color: "#52525B",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            fontSize: 32,
            color: "#52525B",
          }}
        >
          +
        </div>

        {/* Logo text */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Entourage
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#A1A1AA",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Know what needs to be done.
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#A1A1AA",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Without touching your task list.
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#10B981",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
```

#### 2. Create Twitter Image (symlink behavior)

**File**: `src/app/twitter-image.tsx`

**Changes**: Create file that reuses OG image

```tsx
export { default, alt, size, contentType } from "./opengraph-image";
```

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `pnpm build`
- [x] Type checking passes: `pnpm tsc --noEmit`

#### Manual Verification:
- [ ] Navigate to `http://localhost:3000/opengraph-image` - shows generated image
- [ ] Image is 1200x630 with Entourage branding
- [ ] Plus corners visible in corners
- [ ] Emerald accent bar at bottom

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 3.

---

## Phase 3: JSON-LD Structured Data

### Overview

Add Organization schema to root layout and SoftwareApplication schema to the landing page for rich search results.

### Changes Required:

#### 1. Add Organization Schema to Layout

**File**: `src/app/layout.tsx`

**Changes**: Add JSON-LD script inside the `<head>` or as first child of `<body>`

```tsx
// Add this constant after the metadata export
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Entourage",
  url: "https://myentourage.dev",
  logo: "https://myentourage.dev/logo.svg",
  description:
    "AI-powered task extraction platform that automatically extracts actionable items from meetings, chats, emails, and documents.",
};

// Update the RootLayout component to include the script
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        // ... existing appearance config
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
            }}
          />
        </head>
        <body
          className={`${switzer.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

#### 2. Add SoftwareApplication Schema to Landing Page

**File**: `src/app/page.tsx`

**Changes**: Add JSON-LD for the product

```tsx
import { Header, Footer } from "@/components/layout";
import {
  Hero,
  TeamCredentialsSection,
  FlowSection,
  BentoFeatures,
  FAQ,
  SecondaryCTA,
} from "@/components/sections";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Entourage",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  description:
    "AI-powered task extraction platform that automatically extracts actionable items from meetings, chats, emails, and documents.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <Hero />
        <TeamCredentialsSection />
        <FlowSection />
        <BentoFeatures />
        <SecondaryCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `pnpm build`
- [x] Type checking passes: `pnpm tsc --noEmit`

#### Manual Verification:
- [ ] View page source shows `<script type="application/ld+json">`
- [ ] Organization schema present with correct URL
- [ ] SoftwareApplication schema present
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results) - no errors

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 4.

---

## Phase 4: Sitemap and Robots.txt

### Overview

Create sitemap.ts and robots.ts for search engine discovery.

### Changes Required:

#### 1. Create Sitemap

**File**: `src/app/sitemap.ts`

**Changes**: Create new file

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://myentourage.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

#### 2. Create Robots.txt

**File**: `src/app/robots.ts`

**Changes**: Create new file

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://myentourage.dev/sitemap.xml",
  };
}
```

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `pnpm build`
- [x] Type checking passes: `pnpm tsc --noEmit`

#### Manual Verification:
- [ ] Navigate to `http://localhost:3000/sitemap.xml` - shows valid XML
- [ ] Navigate to `http://localhost:3000/robots.txt` - shows valid robots.txt
- [ ] Sitemap contains the homepage URL
- [ ] Robots.txt references sitemap URL

**Implementation Note**: After completing this phase, all SEO implementation is complete.

---

## Testing Strategy

### Automated Tests:
- Build and type checking (covered in success criteria)

### Manual Testing Steps:

1. **Social Preview Testing:**
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

2. **Structured Data Testing:**
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Use [Schema Markup Validator](https://validator.schema.org/)

3. **Lighthouse Audit:**
   - Run Lighthouse in Chrome DevTools
   - SEO score should be 100
   - Check all SEO items pass

4. **Discovery Files:**
   - Verify `/sitemap.xml` returns valid XML
   - Verify `/robots.txt` returns valid content

## Performance Considerations

- OG image is generated on-demand and cached automatically
- No external API calls in metadata generation
- Static metadata reduces server load

## References

- Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js OG Image: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Next.js Sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Schema.org SoftwareApplication: https://schema.org/SoftwareApplication
