"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavAbsensi } from "@/components/nav-absensi"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "BIODATA",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Data Siswa",
          url: "/data-siswa",
        },
        {
          title: "Data Guru",
          url: "/data-guru",
        },
        {
          title: "Data Admin",
          url: "/data-admin",
        },
        {
          title: "Data Piket",
          url: "/data-piket",
        },
      ],
    },
    {
      title: "ADMINISTRASI",
      icon: Bot,
      items: [
        {
          title: "Data Sekolah",
          url: "/data-sekolah",
        },
        {
          title: "Data Tahun Pelajaran",
          url: "/data-tahun-pelajaran",
        },
        {
          title: "Data Kelas",
          url: "/data-kelas",
        },
        {
          title: "Data Hari Libur",
          url: "/data-hari-libur",
        },
      ],
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  absensi: [
    {
      name: "Absensi",
      url: "/absensi",
      icon: Frame,
    },
    {
      name: "Rekap Absensi",
      url: "/rekap-absensi",
      icon: PieChart,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAbsensi absensi={data.absensi} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
