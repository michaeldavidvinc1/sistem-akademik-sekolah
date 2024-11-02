import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";
import {
    ArrowUpDown,
    MoreHorizontal,
    Trash2,
} from "lucide-react";
import EditPembayaran from "./Edit";
import Swal from "sweetalert2";
import { Badge } from "@/Components/ui/badge";

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
                        <img src={dataRow.bukti_bayar} alt="" width="50" />
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
        accessorKey: "tanggal_pembayaran",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Tanggal Pembayaran
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "jumlah",
        header: "Jumlah",
        cell: ({ getValue }) => {
            const formatRupiah = (value) => {
                return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                }).format(value);
            };
    
            return formatRupiah(getValue());
        }
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
        accessorKey: "deskripsi",
        header: "Deskripsi",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const data = row.original;
            const { toast } = useToast();
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
                        router.delete(route("siswa.pembayaran.destroy", id), {
                            onSuccess: () => {
                                toast({
                                    variant: "success",
                                    title: "Success!",
                                    description: "Delete data successfully.",
                                });
                            },
                        });
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
                        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                            <EditPembayaran dataRow={data} />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer text-red-500"
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
