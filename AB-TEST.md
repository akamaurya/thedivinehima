# A/B Test: WordPress (old) vs New Site

Compare how visitors experience the old WordPress site against the new site,
measured by **Book Now clicks** (clicks to the asiatech.in booking engine).

## Architecture

- `thedivinehima.com` (apex, DNS at BigRock, WordPress on HostGator) — **stays as-is**.
- `new.thedivinehima.com` (new subdomain → GitHub Pages) — serves this repo.
- A snippet on WordPress assigns each new visitor **50/50** via a first-party
  cookie (`th_variant`): `control` stays on WordPress, `new` is redirected to
  `new.thedivinehima.com`. A shared visitor id (`th_did`) is carried across the
  redirect via `?ph_did=` so both sites resolve to **one person** in PostHog.
- Both sites send events to the **same PostHog project**, tagged
  `site_variant: control | new`.
- Analysis: a PostHog funnel **`$pageview` → `book_now_click`**, broken down by
  `site_variant`.

Nothing on the apex domain changes, so rollback is: stop the WordPress redirect
(delete the snippet) — everyone is back on WordPress instantly.

## One-time setup (in order)

1. **PostHog project** — create a free project at https://us.posthog.com. Copy
   the **Project API Key** (`phc_...`) from Settings → Project.

2. **Add the key in this repo** — replace `phc_REPLACE_ME` in
   `src/components/Analytics.tsx` with your real key. Do the same in the
   WordPress snippet below.

3. **DNS at BigRock** — add ONE record (leave everything else alone):
   - Type `CNAME`, Host/Name `new`, Value `akamaurya.github.io`.

4. **GitHub Pages custom domain** — pushing this branch deploys `public/CNAME`
   (`new.thedivinehima.com`), which auto-sets the custom domain. In the repo,
   Settings → Pages, wait for the DNS check to pass, then tick **Enforce HTTPS**.

5. **Deploy** — commit & push `main`. The site publishes to
   `https://new.thedivinehima.com`. (The old `akamaurya.github.io/thedivinehima`
   URL stops working — expected, the basePath was removed for the custom domain.)
   Verify the new site loads and, in PostHog → Activity, that a pageview appears.

6. **Add the snippet to WordPress** — paste the snippet below into the site-wide
   `<head>`. Easiest via the free **WPCode** or **Insert Headers and Footers**
   plugin (Header, site-wide). Placing it high in `<head>` minimizes any flash
   before the redirect.

7. **Verify the WordPress "Book Now" link** really points at
   `asiatech.in/booking_engine`. If it differs, update the URL match in both the
   snippet and `src/components/Analytics.tsx` (`classifyAnchor`).

## PostHog analysis (after ~a few hundred visits per arm)

- Product Analytics → New → **Funnel**:
  - Step 1: `$pageview`  →  Step 2: `book_now_click`
  - **Breakdown by** event property `site_variant`.
- The two lines (`control` vs `new`) give conversion rate per site. Let it run
  until each arm has enough sessions to be meaningful (rule of thumb: a few
  hundred conversions per arm before trusting the difference).
- Optional: also compare `email_click` / `phone_click`, session duration, and
  bounce between the two variants for a fuller "experience" picture.

## Changing the split

Edit `SPLIT_TO_NEW` in the WordPress snippet (`0.5` = 50%). Existing visitors
keep their assignment (sticky cookie); only new visitors follow the new ratio.

---

## WordPress `<head>` snippet

Replace `phc_REPLACE_ME` with your PostHog Project API Key before pasting.

```html
<!-- The Divine Hima — A/B test assignment (paste site-wide in <head>) -->
<script>
(function () {
  var NEW_SITE = 'https://new.thedivinehima.com';
  var SPLIT_TO_NEW = 0.5;   // 0.5 = send 50% of new visitors to the new site
  var COOKIE_DAYS = 180;

  function getCookie(n) {
    var m = document.cookie.match('(?:^|; )' + n + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }
  function setCookie(n, v) {
    document.cookie = n + '=' + encodeURIComponent(v) +
      ';path=/;max-age=' + (60 * 60 * 24 * COOKIE_DAYS) + ';SameSite=Lax';
  }
  function uuid() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
      : 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  // Shared visitor id (same person across WordPress <-> new site in PostHog).
  var did = getCookie('th_did');
  if (!did) { did = uuid(); setCookie('th_did', did); }

  // Sticky 50/50 assignment.
  var variant = getCookie('th_variant');
  if (!variant) {
    variant = (Math.random() < SPLIT_TO_NEW) ? 'new' : 'control';
    setCookie('th_variant', variant);
  }

  // "new" cohort: redirect immediately (no analytics wait = no flash); they get
  // tracked on the new site, which reads ph_did to keep the same identity.
  if (variant === 'new') {
    var sep = location.search ? '&' : '?';
    location.replace(NEW_SITE + location.pathname + location.search + sep +
      'ph_did=' + encodeURIComponent(did));
    return;
  }

  // "control" cohort stays on WordPress -> load PostHog, tag events as control.
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init('phc_REPLACE_ME', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    bootstrap: { distinctID: did }
  });
  posthog.register({ site_variant: 'control' });

  // Mirror the new site's conversion events so both cohorts are comparable.
  document.addEventListener('click', function (event) {
    var a = (event.target && event.target.closest) ? event.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var text = (a.textContent || '').trim().slice(0, 100);
    if (href.indexOf('asiatech.in/booking_engine') !== -1) {
      posthog.capture('book_now_click', { link_url: href, link_text: text });
    } else if (href.indexOf('mailto:') === 0) {
      posthog.capture('email_click', { link_url: href, email_address: href.replace(/^mailto:/, '') });
    } else if (href.indexOf('tel:') === 0) {
      posthog.capture('phone_click', { link_url: href, phone_number: href.replace(/^tel:/, '') });
    }
  });
})();
</script>
```
