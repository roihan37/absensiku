import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  UsersRound,
  UserRound,
  CircleArrowRight,
  ChartNoAxesCombined
} from 'lucide-react';

export default function Page() {
  return (
    < >
      <div className=" gap-4 ">
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
                <Button className="w-full bg-blue-700 hover:bg-blue-800">Lihat detail <CircleArrowRight /></Button>
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
                <Button className="w-full bg-emerald-700 hover:bg-emerald-800">Lihat detail <CircleArrowRight /></Button>
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
                <Button className="w-full bg-yellow-700 hover:bg-yellow-800">Lihat detail <CircleArrowRight /></Button>
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
                <Button className="w-full bg-red-700 hover:bg-red-800">Lihat detail <CircleArrowRight /></Button>
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
                <Button className="w-full bg-cyan-700 hover:bg-cyan-800">Lihat detail <CircleArrowRight /></Button>
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
                <Button className="w-full bg-sky-700 hover:bg-sky-800">Lihat detail <CircleArrowRight /></Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

    </>
  )
}
