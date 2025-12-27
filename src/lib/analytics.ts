import posthog from "posthog-js";

/**
 * Analytics event types for type-safe tracking
 */
export const AnalyticsEvents = {
  // CTA Events
  CTA_CLICKED: "cta_clicked",

  // Waitlist Form Events
  WAITLIST_FORM_STARTED: "waitlist_form_started",
  WAITLIST_FORM_SUBMITTED: "waitlist_form_submitted",
  WAITLIST_FORM_SUCCESS: "waitlist_form_success",
  WAITLIST_FORM_ERROR: "waitlist_form_error",

  // FAQ Events
  FAQ_OPENED: "faq_opened",
  FAQ_CLOSED: "faq_closed",

  // Theme Events
  THEME_TOGGLED: "theme_toggled",
} as const;

export type AnalyticsEvent =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

/**
 * Track a CTA button click
 */
export function trackCTAClick(location: string, variant?: string) {
  posthog.capture(AnalyticsEvents.CTA_CLICKED, {
    location,
    variant,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  });
}

/**
 * Track waitlist form interactions
 */
export function trackWaitlistFormStarted() {
  posthog.capture(AnalyticsEvents.WAITLIST_FORM_STARTED);
}

export function trackWaitlistFormSubmitted() {
  posthog.capture(AnalyticsEvents.WAITLIST_FORM_SUBMITTED);
}

export function trackWaitlistFormSuccess() {
  posthog.capture(AnalyticsEvents.WAITLIST_FORM_SUCCESS);
}

export function trackWaitlistFormError(error: string) {
  posthog.capture(AnalyticsEvents.WAITLIST_FORM_ERROR, { error });
}

/**
 * Track FAQ accordion interactions
 */
export function trackFAQOpened(question: string, index: number) {
  posthog.capture(AnalyticsEvents.FAQ_OPENED, {
    question,
    index,
  });
}

export function trackFAQClosed(question: string, index: number) {
  posthog.capture(AnalyticsEvents.FAQ_CLOSED, {
    question,
    index,
  });
}

/**
 * Track theme toggle
 */
export function trackThemeToggle(theme: string) {
  posthog.capture(AnalyticsEvents.THEME_TOGGLED, {
    theme,
  });
}
