import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import { Button } from "@/Components/ui/button";
import { Link, router } from "@inertiajs/react";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

const columns = [
    {
        accessorKey: "no",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    No
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "nama_kelas",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nama Kelas
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "kapasitas",
        header: "Kapasitas",
    },
    {
        accessorKey: "tahun_ajaran.tahun_ajaran",
        header: "Tahun Ajaran",
    },
    {
        accessorKey: "jurusan.nama_jurusan",
        header: "Jurusan",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
];

const Index = ({ auth, kelas }) => {
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
                router.delete(route("staff.kelas.destroy", id));
            }
        });
    };
    const actionTemplate = (rowData) => {
        return (
            <div className="flex gap-3">
                <Link
                    href={route("staff.kelas.edit", rowData.id)}
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
                <h1 className="text-xl font-semibold">Kelas List</h1>
                <Link
                    className="bg-primary text-white text-sm px-3 py-2 font-semibold rounded-lg hover:bg-primary/90"
                    href={route("staff.kelas.create")}
                >
                    Add Data
                </Link>
            </div>
            <Datatable columns={columns} data={kelas.data} />
        </DashboardLayout>
    );
};

export default Index;
