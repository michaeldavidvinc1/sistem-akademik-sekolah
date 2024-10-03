import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import { Link, router } from "@inertiajs/react";
import { SquarePen, Trash2 } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

const columns = [
    {
        field: "kode_jurusan",
        header: "Kode Jurusan",
        sortable: true,
    },
    {
        field: "nama_jurusan",
        header: "Nama Jurusan",
    },
    {
        field: "created_at",
        header: "Created at",
    },
];

const Index = ({ auth, jurusan }) => {
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You cannot undo this data again!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, Hapus",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                router.delete(route("staff.jurusan.destroy", id));
            }
        });
    };
    const actionTemplate = (rowData) => {
        return (
            <div className="flex gap-3">
                <Link
                    href={route("staff.jurusan.edit", rowData.id)}
                    className="text-yellow-500 hover:text-yellow-600 "
                >
                    <SquarePen className="w-4" />
                </Link>
                <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(rowData.id)}
                >
                    <Trash2 className="w-4" />
                </button>
            </div>
        );
    };
    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Jurusan List</h1>
                <Link
                    className="bg-primary text-white text-sm px-3 py-2 font-semibold rounded-lg hover:bg-primary/90"
                    href={route("staff.jurusan.create")}
                >
                    Add Data
                </Link>
            </div>
            <Datatable
                data={jurusan.data}
                column={columns}
                actionTemplate={actionTemplate}
            />
        </DashboardLayout>
    );
};

export default Index;
