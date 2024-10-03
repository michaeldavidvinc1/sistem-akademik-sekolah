import DashboardLayout from "@/Components/Admin/Layout";
import TextArea from "@/Components/Common/Textarea";
import TextInput from "@/Components/Common/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const EditJurusan = ({ auth, jurusan }) => {
    console.log(jurusan);
    const toast = useRef(null);
    const { data, setData, put, processing, errors, reset } = useForm({
        kode_jurusan: jurusan.data.kode_jurusan,
        nama_jurusan: jurusan.data.nama_jurusan,
        deskripsi: jurusan.data.deskripsi,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("staff.jurusan.update", jurusan.data.id), {
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
            <h1 className="text-xl font-semibold">Edit Jurusan Page</h1>
            <form onSubmit={submit} className="mt-5">
                <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <TextInput
                        id="kode_jurusan"
                        type="text"
                        name="kode_jurusan"
                        value={data.kode_jurusan}
                        onChange={(e) =>
                            setData("kode_jurusan", e.target.value)
                        }
                        label="Kode Jurusan"
                        errorMessage={errors.kode_jurusan}
                    />
                    <TextInput
                        id="nama_jurusan"
                        type="text"
                        name="nama_jurusan"
                        value={data.nama_jurusan}
                        onChange={(e) =>
                            setData("nama_jurusan", e.target.value)
                        }
                        label="Nama Jurusan"
                        errorMessage={errors.nama_jurusan}
                    />
                    <TextArea
                        id="deskripsi"
                        name="deskripsi"
                        value={data.deskripsi}
                        onChange={(e) => setData("deskripsi", e.target.value)}
                        label="Deskripsi"
                        errorMessage={errors.deskripsi}
                    />
                </div>
                <div className="flex justify-end items-center mt-3 gap-3">
                    <Link
                        className="px-3 py-3 hover:bg-gray-100 rounded-lg font-bold border border-gray-100"
                        href={route("staff.jurusan.index")}
                    >
                        Cancel
                    </Link>
                    <Button type="submit" label="Update" size="small" />
                </div>
            </form>
        </DashboardLayout>
    );
};

export default EditJurusan;
