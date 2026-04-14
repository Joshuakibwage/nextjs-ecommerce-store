"use client";
import Link from "next/link";

import { ShoppingBag } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <Link href="/admin" className="flex items-center gap-2">
          <span> <ShoppingBag /> </span>
          Kona<span>Shop</span>
        </Link>
      
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar;