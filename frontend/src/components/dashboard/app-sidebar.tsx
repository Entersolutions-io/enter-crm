"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Target,
  Mail,
  Zap,
  Key,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Customers", href: "/dashboard/customers", icon: Users },
  { title: "Segments", href: "/dashboard/segments", icon: Target },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const actionNav = [
  { title: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { title: "Automations", href: "/dashboard/automations", icon: Zap },
];

const settingsNav = [
  { title: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

function NavItem({ item, isActive }: { item: { title: string; href: string; icon: LucideIcon }; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={<Link href={item.href} />}
        className="flex items-center gap-3 px-4 py-2"
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
        <span className="text-sm">{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function NavGroup({ label, items, pathname }: { label: string; items: typeof mainNav; pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[11px] text-[#52525B] uppercase tracking-wider font-medium px-4">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
            return <NavItem key={item.href} item={item} isActive={isActive} />;
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar({ onSignOut }: { onSignOut?: () => void }) {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-[#1F1F23] bg-[#0E0E10]">
      <SidebarHeader className="px-4 py-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo height={24} />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavGroup label="Main" items={mainNav} pathname={pathname} />
        <SidebarSeparator className="bg-[#1F1F23]" />
        <NavGroup label="Actions" items={actionNav} pathname={pathname} />
        <SidebarSeparator className="bg-[#1F1F23]" />
        <NavGroup label="Settings" items={settingsNav} pathname={pathname} />
      </SidebarContent>

      <SidebarFooter className="border-t border-[#1F1F23] p-4">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors w-full px-2 py-1.5"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
