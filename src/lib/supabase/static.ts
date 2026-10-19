import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * For the public site's data layer (src/lib/cms/queries.ts, overrides.ts).
 * Static export prerenders every page at `next build` time, with no request
 * and no cookies to read — this is a plain anon-key client with no cookie
 * plumbing at all, safe to call at build time. It carries the exact same
 * (anon, unauthenticated) RLS role the old cookie-based client had for
 * visitors, so every existing public read policy keeps working unchanged.
 *
 * Deliberately NOT forcing `cache: "no-store"` here: supabase-js calls the
 * global `fetch`, which Next patches to cache AND dedupe by URL — the
 * dedupe is what lets one build's ~14 page renders share one fetch instead
 * of repeating the same Supabase round trip per page. no-store disables
 * both, and without dedupe a full build times out (confirmed locally, see
 * the build-cache note in package.json's build script). The actual staleness
 * risk this was trying to fix — a rebuild reusing a *previous* build's
 * cached Supabase response — is handled instead by clearing .next/cache at
 * the start of every build, so a build only ever caches/dedupes within
 * itself, never across builds.
 */
export function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
