import DashboardLayout from "@/Components/Admin/Layout";
import { Link, router } from "@inertiajs/react";
import { ArrowUpDown, MoreHorizontal, SquarePen } from "lucide-react";
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
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

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
        accessorKey: "kelas.nama_kelas",
        header: "Kelas",
    },
    {
        accessorKey: "jurusan.nama_jurusan",
        header: "Jurusan",
    },
    {
        accessorKey: "tanggal_daftar",
        header: "Tanggal Lahir",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const data = row.original;
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
                                href={route("staff.siswa.edit", data.id)}
                                className=" flex gap-2 items-center "
                            >
                                <SquarePen className="w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
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

    const handleReset = () => {
        router.get(route("staff.siswa.index"));
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Siswa List</h1>
            </div>
            <div className="mb-5">
                <div className="flex justify-end gap-2 items-center">
                    <SelectInput
                        name="jurusan_id"
                        value={queryParams?.jurusan_id}
                        onChange={(value) =>
                            searchFieldChanged("jurusan_id", value)
                        }
                    >
                        <SelectTrigger className="w-[200px]">
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
                        value={queryParams?.kelas_id}
                        onChange={(value) =>
                            searchFieldChanged("kelas_id", value)
                        }
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter kelas" />
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
                    <Button variant="ghost" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
            <Datatable columns={columns} data={siswa.data} />
        </DashboardLayout>
    );
};

export default Index;
