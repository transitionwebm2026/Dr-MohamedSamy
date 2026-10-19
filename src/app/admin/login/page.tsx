"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Lock, Mail } from "lucide-react";
import { signIn } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="gradient-brand w-full rounded-2xl border border-white/25 px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_30px_-8px_rgba(110,75,152,0.7)] transition-opacity disabled:opacity-60"
    >
      {pending ? "جارِ الدخول..." : "تسجيل الدخول"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(signIn, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(110,75,152,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(225,148,159,0.25),transparent_55%)]" />

      <div className="glass-strong w-full max-w-sm rounded-3xl p-8">
        <div className="gradient-brand mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/20">
          <Lock className="size-6 text-white" />
        </div>
        <h1 className="mt-5 text-center text-xl font-extrabold text-brand-ink">لوحة تحكم الموقع</h1>
        <p className="mt-1.5 text-center text-sm text-brand-ink-muted">دخول المسؤول فقط</p>

        <form action={formAction} className="mt-7 space-y-4">
          <div className="relative">
            <Mail className="pointer-events-none absolute end-4 top-1/2 size-4.5 -translate-y-1/2 text-brand-ink-muted" />
            <input
              type="email"
              name="email"
              required
              placeholder="البريد الإلكتروني"
              dir="ltr"
              className="glass w-full rounded-2xl py-3 pe-11 ps-4 text-end text-sm text-brand-ink outline-none placeholder:text-brand-ink-muted focus:border-brand-rose/60"
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute end-4 top-1/2 size-4.5 -translate-y-1/2 text-brand-ink-muted" />
            <input
              type="password"
              name="password"
              required
              placeholder="كلمة المرور"
              dir="ltr"
              className="glass w-full rounded-2xl py-3 pe-11 ps-4 text-end text-sm text-brand-ink outline-none placeholder:text-brand-ink-muted focus:border-brand-rose/60"
            />
          </div>

          {state?.error && (
            <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-center text-sm font-semibold text-red-400">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
