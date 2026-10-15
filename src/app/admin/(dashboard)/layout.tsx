"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import type { Page } from "@/lib/supabase/types";

/**
 * The server-enforced /admin gate (proxy.ts) doesn't exist under static
 * export, so this client-side check is now the only thing standing between
 * this layout and an unauthenticated visitor — the data itself stays safe
 * because every write still goes through Supabase RLS as `authenticated`,
 * same as before.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    });

    supabase
      .from("pages")
      .select("*")
      .order("title_ar")
      .then(({ data }) => setPages(data ?? []));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
    });
    return () => subscription.unsubscribe();
  }, [router]);

  if (!ready) return null;

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 p-4 sm:p-6">
      <Sidebar pages={pages} />
      <main className="min-w-0 flex-1 pb-10">{children}</main>
    </div>
  );
}
