import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * For public, anonymous reads only (the CMS content every visitor sees).
 * Unlike the client in server.ts, this never touches cookies() — calling
 * cookies() anywhere in a request forces Next.js to treat the whole route as
 * fully dynamic, which is what made every page a fresh, uncached Supabase
 * round trip. Public content is already gated by the `anon` RLS policies,
 * so no session is needed to read it, and these routes can now be cached
 * and revalidated on demand (see the admin actions' revalidatePath calls).
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
