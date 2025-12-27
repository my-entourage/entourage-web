"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usePostHog } from "posthog-js/react";

/**
 * Identifies the current user in PostHog when authenticated via Clerk.
 * Automatically resets when user signs out.
 *
 * @example
 * // Use in a client component (typically in PostHogProvider)
 * function PostHogIdentifier() {
 *   usePostHogIdentify();
 *   return null;
 * }
 */
export function usePostHogIdentify() {
  const { user, isLoaded, isSignedIn } = useUser();
  const posthog = usePostHog();

  useEffect(() => {
    if (!isLoaded || !posthog) return;

    if (isSignedIn && user) {
      // Identify user with their Clerk ID and properties
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt?.toISOString(),
      });
    } else {
      // Reset when signed out to anonymize future events
      posthog.reset();
    }
  }, [isLoaded, isSignedIn, user, posthog]);
}
