/** Parses editor-written JSON-LD. Bad JSON returns undefined so one typo can't fail the whole export. */
export function parseJsonLd(raw?: string | null): unknown {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    console.warn(`Ignoring invalid structuredData: ${raw.slice(0, 60)}`);
    return undefined;
  }
}

/**
 * Serialises structured data for a `<script type="application/ld+json">` tag.
 *
 * `JSON.stringify` leaves `<`, `>` and `&` intact, so a CMS value containing
 * `</script>` closes the tag and injects markup (stored XSS). Escaping those
 * characters to `\uXXXX` keeps the payload valid JSON for crawlers and inert
 * for the HTML parser. U+2028/U+2029 are escaped for the same reason in JS
 * contexts.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    /[<>&\u2028\u2029]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
  );
}
