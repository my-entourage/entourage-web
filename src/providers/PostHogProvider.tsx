"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { usePostHogIdentify } from "@/hooks";

// Initialize PostHog only on client side
if (typeof window !== "undefined") {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (posthogKey && posthogHost) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: "identified_only",
      capture_pageview: false, // We capture manually for SPA navigation
      capture_pageleave: true,
      persistence: "localStorage+cookie",
    });
  }
}

/**
 * Captures pageview events for SPA navigation
 */
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthogClient = usePostHog();

  useEffect(() => {
    if (pathname && posthogClient) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthogClient.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthogClient]);

  return null;
}

/**
 * Wraps PageView in Suspense for useSearchParams
 */
function SuspendedPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}

/**
 * Identifies authenticated users in PostHog
 */
function PostHogIdentifier() {
  usePostHogIdentify();
  return null;
}

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only render PostHog provider on client
    setIsReady(true);
  }, []);

  // During SSR or before hydration, render children without PostHog
  if (!isReady) {
    return <>{children}</>;
  }

  // If PostHog is not configured, just render children
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <SuspendedPageView />
      <PostHogIdentifier />
      {children}
    </PHProvider>
  );
}
