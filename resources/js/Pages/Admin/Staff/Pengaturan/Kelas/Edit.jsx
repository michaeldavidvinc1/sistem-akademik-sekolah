import DashboardLayout from "@/Components/Admin/Layout";
import SelectInput from "@/Components/Common/SelectInput";
import TextInput from "@/Components/Common/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useRef } from "react";

const EditKelas = ({ auth, tahunAjaran, jurusan, kelas }) => {
    const toast = useRef(null);
    const { data, setData, put, processing, errors, reset } = useForm({
        nama_kelas: kelas.data.nama_kelas,
        kapasitas: kelas.data.kapasitas,
        tahun_ajaran_id: kelas.data.tahun_ajaran.id,
        jurusan_id: kelas.data.jurusan.id,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("staff.kelas.update", kelas.data.id), {
            onError: (errors) => {
                if (errors.name) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: errors.name,
                        life: 3000,
                    });
                }
            },
        });
    };

    return (
        <DashboardLayout auth={auth}>
            <Toast ref={toast} />
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
                        onChange={(e) => setData("tahun_ajaran_id", e.value)}
                        label="Tahun Ajaran"
                        errorMessage={errors.tahun_ajaran_id}
                        options={tahunAjaran.data}
                        optionLabel="tahun_ajaran"
                        optionValue="id"
                    />
                    <SelectInput
                        name="jurusan_id"
                        value={data.jurusan_id}
                        onChange={(e) => setData("jurusan_id", e.value)}
                        label="Jurusan"
                        errorMessage={errors.jurusan_id}
                        options={jurusan.data}
                        optionLabel="nama_jurusan"
                        optionValue="id"
                    />
                </div>
                <div className="flex justify-end items-center mt-3 gap-3">
                    <Link
                        className="px-3 py-3 hover:bg-gray-100 rounded-lg font-bold border border-gray-100"
                        href={route("staff.tahun-ajaran.index")}
                    >
                        Cancel
                    </Link>
                    <Button type="submit" label="Update" size="small" />
                </div>
            </form>
        </DashboardLayout>
    );
};

export default EditKelas;
