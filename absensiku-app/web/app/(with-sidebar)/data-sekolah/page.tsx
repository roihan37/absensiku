import { SelectScrollable } from "@/components/select-scrollable";
import TableData from "@/components/table-data";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { Select } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import DropImage from "@/components/drop-image";


export default function Page() {
    return (
        <>
            <div className="mb-6">
                <h1 className="font-bold text-3xl">Data Sekolah</h1>
            </div>
            <div className="flex flex-row gap-4">
                <Card className="w-full">
                    <div className="-my-2 px-6">
                        <p>Edit Data Sekolah</p>
                    </div>
                    <hr className=" border-gray-300" />
                    <div className="px-6 flex flex-col gap-4">

                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">Nama Sekolah</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">Jenjang</p>
                            <SelectScrollable />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">NPSN</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">NSS</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">Telepon</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">Email</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">Website</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">Alamat</p>
                            <Textarea />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">Kode POS</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">Kepala Sekolah</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className="w-xs font-bold">NIP Kepala Sekolah</p>
                            <Input />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="w-xs"></div>
                            <div className="w-full flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Saya yakin akan mengubah data tersebut</Label>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="w-xs"></div>
                            <div className="w-full">

                                <Button type="submit" >
                                    Simpan
                                </Button>
                            </div>
                        </div>


                    </div>
                </Card>
                <Card className=" self-start">
                    <div className="-my-2 px-6">
                        <p>Edit Logo Sekolah</p>
                    </div>
                    <hr className=" border-gray-300" />
                    <div className="px-6 flex flex-col gap-4">
                        <div className="bg-muted w-md lg:flex items-center justify-center p-10">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg/1200px-Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg.png"
                                alt="Logo"
                                className="max-w-[100px] h-auto object-contain"
                            />
                        </div>
                        <p className="italic text-muted-foreground text-sm text-balance">Ganti Logo Sekolah</p>
                        <DropImage />
                    </div>
                </Card>
            </div>
        </>
    )
}