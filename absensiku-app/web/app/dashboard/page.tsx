import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { 
  UsersRound, 
  UserRound,
  CircleArrowRight,
  ChartNoAxesCombined
} from 'lucide-react';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* DATA SISWA */}
            <Card className="bg-blue-500">
              <CardHeader>
                <CardTitle className="text-7xl font-bold text-zinc-200">12</CardTitle>
                <p className="font-medium ml-2 text-zinc-200">Data Siswa</p>
                <CardAction><UsersRound size={114} strokeWidth={1.5} className="text-blue-700" /></CardAction>
              </CardHeader>
              <CardFooter >
                <div className="flex flex-wrap w-full items-center gap-2 md:flex-row w-full">
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">Lihat detail <CircleArrowRight/></Button>
                </div>
              </CardFooter>
            </Card>

          {/* DATA GURU */}
            <Card className="bg-emerald-500">
              <CardHeader>
                <CardTitle className="text-7xl font-bold text-zinc-200">12</CardTitle>
                <p className="font-medium ml-2 text-zinc-200">Data Guru</p>
                <CardAction><UsersRound size={114} strokeWidth={1.5} className="text-emerald-700" /></CardAction>
              </CardHeader>
              <CardFooter >
                <div className="flex flex-wrap w-full items-center gap-2 md:flex-row w-full">
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800">Lihat detail <CircleArrowRight/></Button>
                </div>
              </CardFooter>
            </Card>

          {/* DATA ADMIN */}
            <Card className="bg-yellow-500">
              <CardHeader>
                <CardTitle className="text-7xl font-bold text-zinc-200">12</CardTitle>
                <p className="font-medium ml-2 text-zinc-200">Data Admin</p>
                <CardAction><UserRound size={114} strokeWidth={1.5} className="text-yellow-700" /></CardAction>
              </CardHeader>
              <CardFooter >
                <div className="flex flex-wrap w-full items-center gap-2 md:flex-row w-full">
                  <Button className="w-full bg-yellow-700 hover:bg-yellow-800">Lihat detail <CircleArrowRight/></Button>
                </div>
              </CardFooter>
            </Card>

          {/* DATA KELAS */}
            <Card className="bg-red-500">
              <CardHeader>
                <CardTitle className="text-7xl font-bold text-zinc-200">12</CardTitle>
                <p className="font-medium ml-2 text-zinc-200">Data Kelas</p>
                <CardAction><CircleArrowRight size={114} strokeWidth={1.5} className="text-red-700" /></CardAction>
              </CardHeader>
              <CardFooter >
                <div className="flex flex-wrap w-full items-center gap-2 md:flex-row w-full">
                  <Button className="w-full bg-red-700 hover:bg-red-800">Lihat detail <CircleArrowRight/></Button>
                </div>
              </CardFooter>
            </Card>

          {/* DATA TAHUN PELAJARAN */}
            <Card className="bg-cyan-500">
              <CardHeader>
                <CardTitle className="text-7xl font-bold text-zinc-200">12</CardTitle>
                <p className="font-medium ml-2 text-zinc-200">Data Tahun Pelajaran</p>
                <CardAction><ChartNoAxesCombined size={114} strokeWidth={1.5} className="text-cyan-700" /></CardAction>
              </CardHeader>
              <CardFooter >
                <div className="flex flex-wrap w-full items-center gap-2 md:flex-row w-full">
                  <Button className="w-full bg-cyan-700 hover:bg-cyan-800">Lihat detail <CircleArrowRight/></Button>
                </div>
              </CardFooter>
            </Card>

          {/* DATA Profil */}
            <Card className="bg-sky-500">
              <CardHeader>
                <CardTitle className="text-7xl font-bold text-zinc-200">Profil</CardTitle>
                <p className="font-medium ml-2 text-zinc-200">Profil Saya</p>
                <CardAction><UserRound size={114} strokeWidth={1.5} className="text-sky-700" /></CardAction>
              </CardHeader>
              <CardFooter >
                <div className="flex flex-wrap w-full items-center gap-2 md:flex-row w-full">
                  <Button className="w-full bg-sky-700 hover:bg-sky-800">Lihat detail <CircleArrowRight/></Button>
                </div>
              </CardFooter>
            </Card>



          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
