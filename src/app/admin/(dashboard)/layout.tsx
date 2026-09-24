import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: pages } = await supabase.from("pages").select("*").order("title_ar");

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 p-4 sm:p-6">
      <Sidebar pages={pages ?? []} />
      <main className="min-w-0 flex-1 pb-10">{children}</main>
    </div>
  );
}
