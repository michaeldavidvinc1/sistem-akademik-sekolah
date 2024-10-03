import DashboardLayout from "@/Components/Admin/Layout";
import TextArea from "@/Components/Common/Textarea";
import TextInput from "@/Components/Common/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const EditTahunAjaran = ({ auth, tahunAjaran }) => {
    const toast = useRef(null);
    const { data, setData, put, processing, errors, reset } = useForm({
        tahun_ajaran: tahunAjaran.data.tahun_ajaran,
        tanggal_mulai: tahunAjaran.data.tanggal_mulai,
        tanggal_selesai: tahunAjaran.data.tanggal_selesai,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("staff.tahun-ajaran.update", tahunAjaran.data.id), {
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
            <h1 className="text-xl font-semibold">Edit Tahun Ajaran Page</h1>
            <form onSubmit={submit} className="mt-5">
                <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <TextInput
                        id="tahun_ajaran"
                        type="text"
                        name="tahun_ajaran"
                        value={data.tahun_ajaran}
                        onChange={(e) =>
                            setData("tahun_ajaran", e.target.value)
                        }
                        label="Tahun Ajaran"
                        errorMessage={errors.tahun_ajaran}
                    />
                    <TextInput
                        id="tanggal_mulai"
                        type="date"
                        name="tanggal_mulai"
                        value={data.tanggal_mulai}
                        onChange={(e) =>
                            setData("tanggal_mulai", e.target.value)
                        }
                        label="Tanggal Mulai"
                        errorMessage={errors.tanggal_mulai}
                    />
                    <TextInput
                        id="tanggal_selesai"
                        type="date"
                        name="tanggal_selesai"
                        value={data.tanggal_selesai}
                        onChange={(e) =>
                            setData("tanggal_selesai", e.target.value)
                        }
                        label="Tanggal Selesai"
                        errorMessage={errors.tanggal_selesai}
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

export default EditTahunAjaran;
