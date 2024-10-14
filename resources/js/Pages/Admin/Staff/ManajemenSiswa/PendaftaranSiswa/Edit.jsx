import DashboardLayout from "@/Components/Admin/Layout";
import SelectInput from "@/Components/Common/SelectInput";
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
import { Link, useForm } from "@inertiajs/react";

const EditPendaftaran = ({ auth, pendaftaran, jurusan }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        nama_lengkap: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        alamat: "",
        telepon: "",
        email: "",
        jenis_kelamin: "",
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
            <h1 className="text-xl font-semibold">Edit Kelas Page</h1>
            <form onSubmit={submit} className="mt-5">
                <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <TextInput
                        id="nama_kelas"
                        type="text"
                        name="nama_kelas"
                        value={data.nama_kelas}
                        onChange={(e) => setData("nama_kelas", e.target.value)}
                        label="Nama Kelas"
                        errorMessage={errors.nama_kelas}
                    />
                    <TextInput
                        id="kapasitas"
                        type="number"
                        name="kapasitas"
                        value={data.kapasitas}
                        onChange={(e) => setData("kapasitas", e.target.value)}
                        label="Kapasitas Kelas"
                        errorMessage={errors.kapasitas}
                    />
                    <SelectInput
                        name="tahun_ajaran_id"
                        value={data.tahun_ajaran_id}
                        onChange={(value) => setData("tahun_ajaran_id", value)}
                        label="Tahun Ajaran"
                        errorMessage={errors.tahun_ajaran_id}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih tahun ajaran" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {tahunAjaran.data.map((item) => {
                                    return (
                                        <SelectItem
                                            key={item.id}
                                            value={item.id.toString()}
                                        >
                                            {item.tahun_ajaran}
                                        </SelectItem>
                                    );
                                })}
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
