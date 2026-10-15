import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * For the public site's data layer (src/lib/cms/queries.ts, overrides.ts).
 * Static export prerenders every page at `next build` time, with no request
 * and no cookies to read — this is a plain anon-key client with no cookie
 * plumbing at all, safe to call at build time. It carries the exact same
 * (anon, unauthenticated) RLS role the old cookie-based client had for
 * visitors, so every existing public read policy keeps working unchanged.
 */
export function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
