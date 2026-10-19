# Search discovery improvements

## Changes

- Added an explicit OAI-SearchBot allow rule, alongside the existing general crawler permission and XML sitemap link.
- Added six factual questions and answers about services, address, coverage enquiries, contact numbers, information needed for a service request and pricing enquiries.
- Rendered FAQ answers in server HTML with native details elements, so they are usable without browser scripts.
- Generated FAQPage structured data from the same central answer data, preventing discrepancies between visible answers and machine-readable content.
- Added a concise factual business description to the existing business identity graph.
- Retained the canonical URLs, service catalogue, per-service structured data, breadcrumbs, verified contact information and original service-area limits from the SEO work.

The general crawler rule already allowed search access before this change. The explicit rule makes that permission clear; it does not constitute a submission or guarantee search inclusion. No unrelated crawler policy was changed.

## Verification

`qa/search-discovery-check.mjs` verifies crawler-style HTTP requests across all 15 public pages, the robots rules, FAQ/content equality, operation without JavaScript and eight viewport widths. Test requests use a documented user-agent string, not an actual request originating from the crawler's published IP ranges.

Results are in `qa/search-discovery-results.json`. Re-run with `QA_BASE_URL` set to the final domain after it is connected.

## External steps

The final Hostinger domain and an official business-profile URL, if one exists, are still needed for the remaining domain and business-listing work. Inclusion and citation are decided by the search service and have not been claimed as verified.

## Primary guidance

Official OpenAI Docs: https://developers.openai.com/api/docs/bots

The documentation identifies OAI-SearchBot as the crawler used for ChatGPT search. It distinguishes this from GPTBot and user-initiated page fetches. It does not establish a special markup file or a guaranteed placement method.
