import DashboardLayout from "@/Components/Admin/Layout";
import { Link, router } from "@inertiajs/react";
import {
    ArrowUpDown,
    FileLock2,
    MoreHorizontal,
    ShieldBan,
    ShieldCheck,
    SquarePen,
    Trash2,
} from "lucide-react";
import React, { useState } from "react";
import SelectInput from "@/Components/Common/SelectInput";
import Datatable from "@/Components/Common/Datatable";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import Swal from "sweetalert2";
import { Badge } from "@/Components/ui/badge";

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
        accessorKey: "nama_lengkap",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nama Lengkap
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "user.email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Badge variant={data.status === 0 ? "destructive" : "default"}>
                    {data.status === 0 ? "Inactive" : "Active"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "tanggal_join",
        header: "Tanggal Join",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const data = row.original;
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
                        router.delete(route("staff.staff.destroy", id));
                    }
                });
            };
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link
                                href={route("staff.guru.edit", data.id)}
                                className=" flex gap-2 items-center "
                            >
                                <FileLock2 className="w-4" /> Change Password
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={route("staff.guru.edit", data.id)}
                                className={`flex gap-2 items-center ${
                                    data.status === 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {data.status === 0 ? (
                                    <>
                                        <ShieldCheck className="w-4" /> Active
                                    </>
                                ) : (
                                    <>
                                        <ShieldBan className="w-4" /> Inactive
                                    </>
                                )}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={route("staff.staff.edit", data.id)}
                                className=" flex gap-2 items-center "
                            >
                                <SquarePen className="w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer"
                                onClick={() => handleDelete(data.id)}
                            >
                                <Trash2 className="w-4" /> Delete
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Index = ({ auth, staff }) => {
    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Staff List</h1>
                <Link
                    className="bg-primary text-white text-sm px-3 py-2 font-semibold rounded-lg hover:bg-primary/90"
                    href={route("staff.staff.create")}
                >
                    Add Data
                </Link>
            </div>
            <Datatable columns={columns} data={staff.data} />
        </DashboardLayout>
    );
};

export default Index;
