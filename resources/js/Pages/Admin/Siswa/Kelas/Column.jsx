import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";
import { ArrowUpDown, Eye, EyeOff, FileLock2, MoreHorizontal, SquarePen } from "lucide-react";
import {useState} from "react"


export const columns = [
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
        accessorKey: "tempat_lahir",
        header: "Tempat Lahir",
    },
    {
        accessorKey: "tanggal_daftar",
        header: "Tanggal Lahir",
    },
    {
        accessorKey: "jenis_kelamin",
        header: "Jenis Kelamin",
        cell: ({row}) => {
            const dataRow = row.original;
            return (
                <span className="uppercase">{dataRow.jenis_kelamin}</span>
            )
        }
    },
];