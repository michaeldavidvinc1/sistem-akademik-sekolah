import { Badge } from "@/Components/ui/badge";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import Swal from "sweetalert2";
import {
    ArrowUpDown,
    Eye,
    EyeOff,
    FileLock2,
    MoreHorizontal,
    ShieldBan,
    ShieldCheck,
    SquarePen,
    Trash2,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link, router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/Common/TextInput";
import {useState} from "react"
import { useToast } from "@/hooks/use-toast";

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
        accessorKey: "bukti_bayar",
        header: "Bukti Pembayaran",
        cell: ({ row }) => {
            const dataRow = row.original;
            return (
                <Dialog>
                    <DialogTrigger>
                        <img src={dataRow.bukti_bayar} alt="" width="50" className="rounded-sm" />
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <img src={dataRow.bukti_bayar} alt="" />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
        },
    },
    {
        accessorKey: "siswa.nama_lengkap",
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
        accessorKey: "status_pembayaran",
        header: "Status",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Badge variant={data.status_pembayaran === 'belum lunas' ? "destructive" : "success"}>
                    {data.status_pembayaran === 'belum lunas' ? "Pending" : "Success"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "tanggal_pembayaran",
        header: "Tanggal Pembayaran",
    },
    {
        accessorKey: "deskripsi",
        header: "Deskripsi Pembayaran",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const dataRow = row.original;
            const { toast } = useToast();

            const handleChangeStatus = (e) => {
                e.preventDefault();
                router.get(route('staff.pembayaran.approve', dataRow.id), {}, {
                    onSuccess: () => {
                        toast({
                            variant: "success",
                            title: "Success!",
                            description: "Pembayaran approve.",
                        });
                    },
                })
            }

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
                                href={dataRow.status_pembayaran === 'lunas' ? "#" : route("staff.pembayaran.approve", dataRow.id)}
                                className={`flex gap-2 items-center ${
                                    dataRow.status_pembayaran === 'lunas'
                                        ? "text-green-500 pointer-events-none" // Disable the link
                                        : "text-red-500"
                                }`}
                                onClick={dataRow.status_pembayaran === 'lunas' ? null : handleChangeStatus}
                            >
                                {dataRow.status_pembayaran === 'lunas' ? (
                                    <>
                                        <ShieldCheck className="w-4" /> Sudah Bayar
                                    </>
                                ) : (
                                    <>
                                        <ShieldBan className="w-4" /> Approve
                                    </>
                                )}
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
