import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TextInput from "@/Components/Common/TextInput";
import { useForm } from "@inertiajs/react";
import {
    BookOpen,
    Briefcase,
    Building,
    Globe,
    Mail,
    MapPin,
    Phone,
    School,
    Upload,
} from "lucide-react";
import DashboardLayout from "@/Components/Admin/Layout";
import { Label } from "@/Components/ui/label";
import UploadImage from "@/Components/Common/UploadImage";

const Index = ({ auth }) => {
    const [previewLogo, setPreviewLogo] = useState(null);
    const { data, setData, errors } = useForm({
        logo: "",
        nama_sekolah: "",
        npsn: "",
        nis: "",
        alamat: "",
        kode_pos: "",
        website: "",
        email: "",
        telepon: "",
    });

    const handleImageChange = (e) => {
        setData("logo", e.target.files[0]);
    };

    useEffect(() => {
        if (data.logo) {
            const objectUrl = URL.createObjectURL(data.logo);
            setPreviewLogo(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [data.logo]);

    return (
        <DashboardLayout auth={auth}>
            <div className="px-4">
                <Card className="shadow-xl">
                    <CardHeader className="space-y-4 pb-8">
                        <div className="flex justify-center">
                            <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                                <School className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Identitas Sekolah
                        </CardTitle>
                        <p className="text-center text-gray-600">
                            Lengkapi informasi sekolah Anda dengan detail
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form className="space-y-8">
                            <div className="flex items-center justify-center">
                                <UploadImage
                                    value={data.logo}
                                    handleImageChange={handleImageChange}
                                    errorMessage={errors.photo}
                                    preview={previewLogo}
                                    setPreview={setPreviewLogo}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Field groups with icons */}
                                <div className="space-y-6">
                                    <div className="relative">
                                        <TextInput
                                            id="nama_sekolah"
                                            type="text"
                                            name="nama_sekolah"
                                            value={data.nama_sekolah}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_sekolah",
                                                    e.target.value
                                                )
                                            }
                                            label="Nama Sekolah"
                                            errorMessage={errors.nama_sekolah}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="npsn"
                                            type="text"
                                            name="npsn"
                                            value={data.npsn}
                                            onChange={(e) =>
                                                setData("npsn", e.target.value)
                                            }
                                            label="NPSN"
                                            errorMessage={errors.npsn}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="nis"
                                            type="text"
                                            name="nis"
                                            value={data.nis}
                                            onChange={(e) =>
                                                setData("nis", e.target.value)
                                            }
                                            label="NIS"
                                            errorMessage={errors.nis}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="kode_pos"
                                            type="number"
                                            name="kode_pos"
                                            value={data.kode_pos}
                                            onChange={(e) =>
                                                setData(
                                                    "kode_pos",
                                                    e.target.value
                                                )
                                            }
                                            label="Kode Pos"
                                            errorMessage={errors.kode_pos}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <TextInput
                                            id="alamat"
                                            type="text"
                                            name="alamat"
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData(
                                                    "alamat",
                                                    e.target.value
                                                )
                                            }
                                            label="Alamat"
                                            errorMessage={errors.alamat}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="website"
                                            type="text"
                                            name="website"
                                            value={data.website}
                                            onChange={(e) =>
                                                setData(
                                                    "website",
                                                    e.target.value
                                                )
                                            }
                                            label="Website"
                                            errorMessage={errors.website}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            label="Email"
                                            errorMessage={errors.email}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="telepon"
                                            type="text"
                                            name="telepon"
                                            value={data.telepon}
                                            onChange={(e) =>
                                                setData(
                                                    "telepon",
                                                    e.target.value
                                                )
                                            }
                                            label="Telepon"
                                            errorMessage={errors.telepon}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
