"use client";

import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { clearAuth } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checked, authenticated } = useAuthGuard();
  const router = useRouter();
  const initials = "ES";

  function handleSignOut() {
    clearAuth();
    router.push("/login");
  }

  if (!checked || !authenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar onSignOut={handleSignOut} />
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b border-[#1F1F23] px-6 bg-[#0A0A0B]">
          <SidebarTrigger className="text-[#71717A] hover:text-[#A1A1AA] -ml-1" />
          <Separator orientation="vertical" className="h-5 bg-[#1F1F23]" />
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#6366F1]/[0.1] border border-[#6366F1]/[0.15] flex items-center justify-center">
              <span className="text-xs font-semibold text-[#A5B4FC]">{initials}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 bg-[#0A0A0B] min-h-[calc(100vh-3.5rem)]">
          <div className="mx-auto max-w-[1400px]">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
