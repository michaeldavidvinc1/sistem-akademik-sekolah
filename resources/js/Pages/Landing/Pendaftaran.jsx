import SelectInput from "@/Components/Common/SelectInput";
import TextArea from "@/Components/Common/Textarea";
import TextInput from "@/Components/Common/TextInput";
import HeaderLandingPage from "@/Components/LandingPage/Header";
import { Button } from "@/Components/ui/button";
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useForm } from "@inertiajs/react";
import React from "react";

const Pendaftaran = ({jurusan}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_lengkap: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        alamat: "",
        telepon: "",
        email: "",
        jenis_kelamin: "",
        jurusan_id: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("pendaftaran.store"), {
            onError: (errors) => {
                if (errors.name) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: errors.message,
                    });
                }
            },
        });
    };
    return (
        <div>
            <HeaderLandingPage />
            <div className=" max-w-xl mx-auto">
                <h1 className="text-2xl text-center py-5">
                    Pendaftaran Siswa Baru
                </h1>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        <TextInput
                            id="nama_lengkap"
                            type="text"
                            name="nama_lengkap"
                            value={data.nama_lengkap}
                            onChange={(e) =>
                                setData("nama_lengkap", e.target.value)
                            }
                            label="Nama Lengkap"
                            errorMessage={errors.nama_lengkap}
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            label="Email"
                            errorMessage={errors.email}
                        />
                        <TextInput
                            id="tempat_lahir"
                            type="text"
                            name="tempat_lahir"
                            value={data.tempat_lahir}
                            onChange={(e) =>
                                setData("tempat_lahir", e.target.value)
                            }
                            label="Tempat Lahir"
                            errorMessage={errors.tempat_lahir}
                        />
                        <TextInput
                            id="tanggal_lahir"
                            type="date"
                            name="tanggal_lahir"
                            value={data.tanggal_lahir}
                            onChange={(e) =>
                                setData("tanggal_lahir", e.target.value)
                            }
                            label="Tanggal Lahir"
                            errorMessage={errors.tanggal_lahir}
                        />
                        <TextInput
                            id="telepon"
                            type="text"
                            name="telepon"
                            value={data.telepon}
                            onChange={(e) => setData("telepon", e.target.value)}
                            label="Nomor Telepon"
                            errorMessage={errors.telepon}
                        />
                        <SelectInput
                            name="jenis_kelamin"
                            value={data.jenis_kelamin}
                            onChange={(value) =>
                                setData("jenis_kelamin", value)
                            }
                            label="Jenis Kelamin"
                            errorMessage={errors.jenis_kelamin}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="l">
                                        Laki - Laki
                                    </SelectItem>
                                    <SelectItem value="p">
                                        Perempuan
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </SelectInput>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <SelectInput
                            name="jurusan_id"
                            value={data.jurusan_id}
                            onChange={(value) => setData("jurusan_id", value)}
                            label="Jurusan"
                            errorMessage={errors.jurusan_id}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih jurusan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {jurusan.data.map((item) => {
                                        return (
                                            <SelectItem
                                                key={item.id}
                                                value={item.id.toString()}
                                            >
                                                {item.nama_jurusan}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </SelectInput>
                        <TextArea
                            id="alamat"
                            name="alamat"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                            label="Alamat"
                            errorMessage={errors.alamat}
                        />
                    </div>
                    <div className="mt-5 ">
                        <Button>Daftar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Pendaftaran;
