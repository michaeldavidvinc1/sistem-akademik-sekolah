import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import { Link, router } from "@inertiajs/react";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import SelectInput from "@/Components/Common/SelectInput";

const columns = [
    {
        field: "nama_lengkap",
        header: "Nama",
        sortable: true,
    },
    {
        field: "user.email",
        header: "Email",
    },
    {
        field: "alamat",
        header: "Alamat",
    },
    {
        field: "status",
        header: "Status",
    },
    {
        field: "kelas.nama_kelas",
        header: "Kelas",
    },
    {
        field: "jurusan.nama_jurusan",
        header: "Jurusan",
    },
    {
        field: "tanggal_daftar",
        header: "Tanggal Daftar",
    },
];

const Index = ({ auth, siswa, kelas, jurusan, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("staff.siswa.index"), queryParams);
    };

    const actionTemplate = (rowData) => {
        return (
            <div className="flex gap-3">
                <Link
                    href={route("staff.siswa.edit", rowData.id)}
                    className="text-yellow-500 hover:text-yellow-600 flex gap-1 items-center "
                >
                    <SquarePen className="w-4" /> Edit
                </Link>
            </div>
        );
    };
    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Siswa List</h1>
            </div>
            <div className="w-1/3 mb-5">
                <div className="flex justify-end gap-2">
                    <SelectInput
                        name="jurusan_id"
                        value={queryParams?.jurusan_id}
                        onChange={(e) =>
                            searchFieldChanged("jurusan_id", e.target.value)
                        }
                        options={jurusan.data}
                        optionLabel="nama_jurusan"
                        optionValue="id"
                    />
                    <SelectInput
                        name="kelas_id"
                        value={queryParams?.kelas_id}
                        onChange={(e) =>
                            searchFieldChanged("kelas_id", e.target.value)
                        }
                        options={kelas.data}
                        optionLabel="nama_kelas"
                        optionValue="id"
                    />
                </div>
            </div>
            <Datatable
                data={siswa.data}
                column={columns}
                actionTemplate={actionTemplate}
            />
        </DashboardLayout>
    );
};

export default Index;
