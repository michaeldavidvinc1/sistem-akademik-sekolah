import DashboardLayout from "@/Components/Admin/Layout";
import SelectInput from "@/Components/Common/SelectInput";
import TextArea from "@/Components/Common/Textarea";
import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, router, useForm } from "@inertiajs/react";

const EditPendaftaran = ({ auth, pendaftaran, jurusan }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        nama_lengkap: pendaftaran.data.siswa.nama_lengkap,
        tanggal_lahir: pendaftaran.data.siswa.tanggal_lahir,
        tempat_lahir: pendaftaran.data.siswa.tempat_lahir,
        alamat: pendaftaran.data.siswa.alamat,
        telepon: pendaftaran.data.siswa.telepon,
        email: pendaftaran.data.email,
        jenis_kelamin: pendaftaran.data.siswa.jenis_kelamin,
        jurusan_id: pendaftaran.data.jurusan.id.toString(),
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("staff.pendaftaran.update", pendaftaran.data.id), {
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
        <DashboardLayout auth={auth}>
            <h1 className="text-xl font-semibold">Edit Pendaftaran Siswa Page</h1>
            <form onSubmit={submit} className="mt-5">
                <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4">
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
                        onChange={(value) => setData("jenis_kelamin", value)}
                        label="Jenis Kelamin"
                        errorMessage={errors.jenis_kelamin}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="l">Laki - Laki</SelectItem>
                                <SelectItem value="p">Perempuan</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectInput>
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
                <div className="flex justify-end items-center mt-3 gap-3">
                    <Link
                        className="px-3 py-3 hover:bg-gray-100 rounded-lg font-bold border border-gray-100"
                        href={route("staff.tahun-ajaran.index")}
                    >
                        Cancel
                    </Link>
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default EditPendaftaran;
