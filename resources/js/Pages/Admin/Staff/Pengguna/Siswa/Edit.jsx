import DashboardLayout from "@/Components/Admin/Layout";
import RadioInput from "@/Components/Common/RadioInput";
import SelectInput from "@/Components/Common/SelectInput";
import TextArea from "@/Components/Common/Textarea";
import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";

const EditSiswa = ({ auth, siswa, jurusan, kelas }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        email: siswa.data.user.email,
        nama_lengkap: siswa.data.nama_lengkap,
        tanggal_lahir: siswa.data.tanggal_lahir,
        tempat_lahir: siswa.data.tempat_lahir,
        alamat: siswa.data.alamat,
        telepon: siswa.data.telepon,
        tanggal_daftar: siswa.data.tanggal_daftar,
        status: siswa.data.status,
        jenis_kelamin: siswa.data.jenis_kelamin,
        jurusan_id: siswa.data?.jurusan?.id.toString(),
        kelas_id: siswa.data.kelas.id.toString(),
    });
    const submit = (e) => {
        e.preventDefault();
        put(route("staff.siswa.update", siswa.data.id), {
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

    const jk = [
        { name: "Laki Laki", key: "l" },
        { name: "Perempan", key: "p" },
    ];

    const statusCom = [
        { name: "Active", key: 1 },
        { name: "Inactive", key: 0 },
    ];
    return (
        <DashboardLayout auth={auth}>
            <h1 className="text-xl font-semibold">Edit Kelas Page</h1>
            <form onSubmit={submit} className="mt-5">
                <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4">
                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        label="Email"
                        errorMessage={errors.email}
                    />
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
                        id="telepon"
                        type="text"
                        name="telepon"
                        value={data.telepon}
                        onChange={(e) => setData("telepon", e.target.value)}
                        label="Telepon"
                        errorMessage={errors.telepon}
                    />
                    <TextInput
                        id="tanggal_daftar"
                        type="date"
                        name="tanggal_daftar"
                        value={data.tanggal_daftar}
                        onChange={(e) =>
                            setData("tanggal_daftar", e.target.value)
                        }
                        label="Tanggal Daftar"
                        errorMessage={errors.tanggal_daftar}
                        disabled
                    />
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
                    <SelectInput
                        name="kelas_id"
                        value={data.kelas_id}
                        onChange={(value) => setData("kelas_id", value)}
                        label="Kelas"
                        errorMessage={errors.kelas_id}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {kelas.data.map((item) => {
                                    return (
                                        <SelectItem
                                            key={item.id}
                                            value={item.id.toString()}
                                        >
                                            {item.nama_kelas}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </SelectInput>
                    <RadioInput
                        category={jk}
                        errorMessage={errors.kelas_id}
                        label="Jenis Kelamin"
                        name="jenis_kelamin"
                        onChange={(e) => setData("jenis_kelamin", e.value)}
                        value={data.jenis_kelamin}
                    />
                    <RadioInput
                        category={statusCom}
                        errorMessage={errors.status}
                        label="Status"
                        name="status"
                        onChange={(e) => setData("status", e.value)}
                        value={data.status}
                    />
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
                    <Button variant="ghost">
                        <Link href={route("staff.siswa.index")}>Cancel</Link>
                    </Button>
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default EditSiswa;
