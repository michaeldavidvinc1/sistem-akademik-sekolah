import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TextInput from "@/Components/Common/TextInput";
import { useForm } from "@inertiajs/react";
import { BookOpen, Briefcase, Building, Globe, Mail, MapPin, Phone, School, Upload } from "lucide-react";
import DashboardLayout from "@/Components/Admin/Layout";
import { Label } from "@/Components/ui/label";
import UploadImage from "@/Components/Common/UploadImage";
import { useToast } from "@/hooks/use-toast";

const Index = ({ auth, kepalaSekolah }) => {
    const [previewFoto, setPreviewFoto] = useState(kepalaSekolah.data.foto);
    const [previewTandaTangan, setPreviewTandaTangan] = useState(kepalaSekolah.data.tanda_tangan);
    const { toast } = useToast();
    const { data, setData, errors, post, processing } = useForm({
        foto: null,
        tanda_tangan: null,
        nama_lengkap: kepalaSekolah.data.nama_lengkap,
        nip: kepalaSekolah.data.nip,
        jenis_kelamin: kepalaSekolah.data.jenis_kelamin,
        tanggal_lahir: kepalaSekolah.data.tanggal_lahir,
        tempat_lahir: kepalaSekolah.data.tempat_lahir,
        alamat: kepalaSekolah.data.alamat,
        email: kepalaSekolah.data.email,
        telepon: kepalaSekolah.data.telepon,
        _method: "PUT",
    });

    const handleFotoChange = (e) => {
        setData("foto", e.target.files[0]);
    };

    const handleTandaTanganChange = (e) => {
        setData("tanda_tangan", e.target.files[0]);
    };

    useEffect(() => {
        if (data.foto) {
            const objectUrl = URL.createObjectURL(data.foto);
            setPreviewFoto(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [data.foto]);

    useEffect(() => {
        if (data.tanda_tangan) {
            const objectUrl = URL.createObjectURL(data.tanda_tangan);
            setPreviewTandaTangan(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [data.tanda_tangan]);

    const submit = (e) => {
        e.preventDefault();

        post(route("staff.kepala.update"), {
            onError: (errors) => {
                if (errors.name) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: errors.message,
                    });
                }
            },
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Update Kepala Sekolah successfully.",
                });
            },
        });
    };

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
                            Identitas Kepala Sekolah
                        </CardTitle>
                        <p className="text-center text-gray-600">
                            Lengkapi informasi kepala sekolah Anda dengan detail
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form className="space-y-8" onSubmit={submit}>
                            <div className="flex items-center justify-center space-x-8">
                                <UploadImage
                                    value={data.foto}
                                    handleImageChange={handleFotoChange}
                                    errorMessage={errors.foto}
                                    preview={previewFoto}
                                    setPreview={setPreviewFoto}
                                    label="Upload Foto"
                                />
                                <UploadImage
                                    value={data.tanda_tangan}
                                    handleImageChange={handleTandaTanganChange}
                                    errorMessage={errors.tanda_tangan}
                                    preview={previewTandaTangan}
                                    setPreview={setPreviewTandaTangan}
                                    label="Tanda Tangan"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="relative">
                                        <TextInput
                                            id="nama_lengkap"
                                            type="text"
                                            name="nama_lengkap"
                                            value={data.nama_lengkap}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_lengkap",
                                                    e.target.value
                                                )
                                            }
                                            label="Nama Lengkap"
                                            errorMessage={errors.nama_lengkap}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="nip"
                                            type="text"
                                            name="nip"
                                            value={data.nip}
                                            onChange={(e) =>
                                                setData("nip", e.target.value)
                                            }
                                            label="NIP"
                                            errorMessage={errors.nip}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="jenis_kelamin"
                                            type="text"
                                            name="jenis_kelamin"
                                            value={data.jenis_kelamin}
                                            onChange={(e) =>
                                                setData(
                                                    "jenis_kelamin",
                                                    e.target.value
                                                )
                                            }
                                            label="Jenis Kelamin"
                                            errorMessage={errors.jenis_kelamin}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="tanggal_lahir"
                                            type="date"
                                            name="tanggal_lahir"
                                            value={data.tanggal_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_lahir",
                                                    e.target.value
                                                )
                                            }
                                            label="Tanggal Lahir"
                                            errorMessage={errors.tanggal_lahir}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <TextInput
                                            id="tempat_lahir"
                                            type="text"
                                            name="tempat_lahir"
                                            value={data.tempat_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    "tempat_lahir",
                                                    e.target.value
                                                )
                                            }
                                            label="Tempat Lahir"
                                            errorMessage={errors.tempat_lahir}
                                        />
                                    </div>

                                    <div className="relative">
                                        <TextInput
                                            id="alamat"
                                            type="text"
                                            name="alamat"
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData("alamat", e.target.value)
                                            }
                                            label="Alamat"
                                            errorMessage={errors.alamat}
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
                                                setData("telepon", e.target.value)
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