import { createClient } from "@/lib/supabase/client";

export type SignInState = { error?: string; ok?: boolean } | undefined;

/**
 * Runs in the browser (no server to host a Server Action under static
 * export) — the admin dashboard's whole auth model is the Supabase session
 * this creates, refreshed automatically by the browser client itself.
 */
export async function signIn(_prevState: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
  }

  return { ok: true };
}
