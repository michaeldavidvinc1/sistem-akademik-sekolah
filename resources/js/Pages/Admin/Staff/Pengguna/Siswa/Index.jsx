import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import { Link } from "@inertiajs/react";
import { SquarePen, Trash2 } from "lucide-react";
import React from "react";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";

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
        field: "created_at",
        header: "Created at",
    },
];

const Index = ({ auth, siswa }) => {
    const actionTemplate = (rowData) => {
        return (
            <div className="flex gap-3">
                <Link
                    href={route("staff.siswa.edit", rowData.id)}
                    className="text-yellow-500 hover:text-yellow-600 flex gap-1 items-center "
                >
                    <SquarePen className="w-4" /> Edit
                </Link>
                <button
                    className="text-red-500 hover:text-red-600 flex gap-1 items-center"
                    // onClick={() => handleDelete(rowData.id)}
                >
                    <Trash2 className="w-4" />
                    Delete
                </button>
            </div>
        );
    };
    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Siswa List</h1>
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
