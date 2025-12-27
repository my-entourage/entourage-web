# PostHog MCP Guide for Entourage Web

This guide helps Claude Code use the PostHog MCP tools effectively for the Entourage Web project.

## Project Context

- **Product**: Entourage - AI task extraction platform
- **Stage**: Marketing landing page with waitlist
- **Goal**: Track user behavior to optimize conversion funnel

---

## Events to Track

### Core Events (Custom)

| Event Name | Description | Properties |
|------------|-------------|------------|
| `cta_clicked` | User clicks a call-to-action button | `location`: "hero" \| "secondary_cta" \| "header" |
| `waitlist_form_started` | User begins filling waitlist form | - |
| `waitlist_form_submitted` | User submits waitlist form | `has_company`: boolean |
| `waitlist_form_success` | Waitlist signup successful | - |
| `waitlist_form_error` | Waitlist signup failed | `error`: string |
| `faq_opened` | User opens FAQ accordion | `question`: string |
| `theme_toggled` | User toggles theme | `theme`: "light" \| "dark" |
| `external_link_clicked` | User clicks external link | `destination`: string |
| `sign_in_started` | User begins sign-in process | - |
| `sign_in_success` | User successfully signs in | - |
| `sign_in_error` | Sign-in failed | `error`: string |

### Auto-Captured Events (PostHog Default)

| Event Name | Description |
|------------|-------------|
| `$pageview` | Page load or route change |
| `$pageleave` | User leaves page (includes time on page, scroll depth) |
| `$autocapture` | Clicks, form inputs, etc. |
| `$web_vitals` | Core Web Vitals metrics |
| `$identify` | User identification |

---

## Key Queries to Create

### 1. Waitlist Conversion Funnel

Use `mcp__posthog__query-run` with FunnelsQuery:

```json
{
  "query": {
    "kind": "InsightVizNode",
    "source": {
      "kind": "FunnelsQuery",
      "series": [
        { "kind": "EventsNode", "event": "$pageview", "custom_name": "Visited Site" },
        { "kind": "EventsNode", "event": "cta_clicked", "custom_name": "Clicked CTA" },
        { "kind": "EventsNode", "event": "waitlist_form_started", "custom_name": "Started Form" },
        { "kind": "EventsNode", "event": "waitlist_form_submitted", "custom_name": "Submitted Form" },
        { "kind": "EventsNode", "event": "waitlist_form_success", "custom_name": "Signup Success" }
      ],
      "funnelsFilter": {
        "funnelOrderType": "ordered",
        "funnelWindowInterval": 7,
        "funnelWindowIntervalUnit": "day"
      },
      "dateRange": { "date_from": "-30d" }
    }
  }
}
```

### 2. CTA Click Breakdown by Location

Use `mcp__posthog__query-run` with TrendsQuery:

```json
{
  "query": {
    "kind": "InsightVizNode",
    "source": {
      "kind": "TrendsQuery",
      "series": [
        { "kind": "EventsNode", "event": "cta_clicked", "custom_name": "CTA Clicks" }
      ],
      "breakdownFilter": {
        "breakdown": "location",
        "breakdown_type": "event"
      },
      "dateRange": { "date_from": "-30d" },
      "interval": "day"
    }
  }
}
```

### 3. FAQ Engagement

Use `mcp__posthog__query-run`:

```json
{
  "query": {
    "kind": "InsightVizNode",
    "source": {
      "kind": "TrendsQuery",
      "series": [
        { "kind": "EventsNode", "event": "faq_opened", "custom_name": "FAQ Views" }
      ],
      "breakdownFilter": {
        "breakdown": "question",
        "breakdown_type": "event"
      },
      "dateRange": { "date_from": "-30d" }
    }
  }
}
```

### 4. Daily Pageviews

```json
{
  "query": {
    "kind": "InsightVizNode",
    "source": {
      "kind": "TrendsQuery",
      "series": [
        { "kind": "EventsNode", "event": "$pageview", "custom_name": "Pageviews" }
      ],
      "dateRange": { "date_from": "-30d" },
      "interval": "day"
    }
  }
}
```

### 5. Theme Preference Distribution

```json
{
  "query": {
    "kind": "InsightVizNode",
    "source": {
      "kind": "TrendsQuery",
      "series": [
        { "kind": "EventsNode", "event": "theme_toggled", "custom_name": "Theme Toggles" }
      ],
      "breakdownFilter": {
        "breakdown": "theme",
        "breakdown_type": "event"
      },
      "trendsFilter": { "display": "ActionsPie" },
      "dateRange": { "date_from": "-30d" }
    }
  }
}
```

---

## Useful MCP Commands

### Check Event Definitions
```
mcp__posthog__event-definitions-list
```
Lists all tracked events. Use to verify custom events are being captured.

### Check Event Properties
```
mcp__posthog__properties-list
type: "event"
eventName: "cta_clicked"
```
Lists properties for a specific event.

### Run Ad-Hoc Query
```
mcp__posthog__query-run
```
Execute trends, funnels, or HogQL queries.

### Create Saved Insight
```
mcp__posthog__insight-create-from-query
```
After testing a query, save it as an insight.

### Create Dashboard
```
mcp__posthog__dashboard-create
name: "Entourage Marketing Analytics"
description: "Conversion funnel and engagement metrics"
```

### Add Insight to Dashboard
```
mcp__posthog__add-insight-to-dashboard
insightId: "..."
dashboardId: ...
```

---

## Recommended Dashboard Structure

### Dashboard: "Entourage Marketing Analytics"

**Tiles:**
1. **Waitlist Conversion Funnel** (FunnelsQuery)
   - Shows: Visit → CTA → Form Start → Submit → Success

2. **Daily Pageviews** (TrendsQuery, line chart)
   - Shows: Traffic trends over time

3. **CTA Performance** (TrendsQuery, bar chart)
   - Shows: Clicks by location (hero vs secondary)

4. **FAQ Engagement** (TrendsQuery, table)
   - Shows: Most viewed questions

5. **Waitlist Signups** (TrendsQuery, bold number)
   - Shows: Total successful signups

6. **Conversion Rate** (TrendsQuery, bold number)
   - Shows: % of visitors who sign up

---

## Common Tasks

### "How many people signed up for the waitlist this week?"

```
mcp__posthog__query-run with:
- event: "waitlist_form_success"
- math: "total"
- dateRange: { "date_from": "-7d" }
```

### "What's our conversion rate from visit to signup?"

Create a funnel query with $pageview → waitlist_form_success.

### "Which CTA performs better?"

Query `cta_clicked` with breakdown by `location` property.

### "Are people engaging with FAQs?"

Query `faq_opened` with breakdown by `question` property.

### "What's our traffic trend?"

Query `$pageview` with daily interval over 30 days.

---

## Event Naming Convention

Use **snake_case** for all custom events:
- `waitlist_form_started` (not `waitlistFormStarted`)
- `cta_clicked` (not `ctaClicked`)

Properties also use **snake_case**:
- `has_company` (not `hasCompany`)
- `error_message` (not `errorMessage`)

---

## Troubleshooting

### Events not appearing?
1. Check `NEXT_PUBLIC_POSTHOG_KEY` is set
2. Verify PostHog is initialized (check Network tab)
3. Wait a few minutes for events to process

### User not identified?
1. Ensure Clerk is loaded before identification
2. Check `usePostHogIdentify` hook is running

### Missing properties?
1. Use `mcp__posthog__properties-list` to check what's captured
2. Verify property is passed in `posthog.capture()` call
