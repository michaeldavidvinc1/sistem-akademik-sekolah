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
import {
    ArrowUpDown,
    MoreHorizontal,
    ShieldCheck,
    ShieldX,
    SquarePen,
    Trash2,
} from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
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
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "tanggal_pendaftaran",
        header: "Tanggal Pendaftaran",
    },
    {
        accessorKey: "jurusan.nama_jurusan",
        header: "Nama Jurusan",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const data = row.original;
            let variant;
            let statusText;

            switch (data.status) {
                case "waiting":
                    variant = "outline";
                    statusText = "Waiting";
                    break;
                case "approved":
                    variant = "success";
                    statusText = "Approved";
                    break;
                case "decline":
                    variant = "destructive";
                    statusText = "Declined";
                    break;
                default:
                    variant = "default";
                    statusText = data.status === 0 ? "Inactive" : "Active";
            }

            return <Badge variant={variant}>{statusText}</Badge>;
        },
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
                        router.delete(route("staff.mapel.destroy", id), {
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
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer text-green-500"
                                onClick={() => handleDelete(data.id)}
                            >
                                <ShieldCheck className="w-4" /> Approve
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer text-red-500"
                                onClick={() => handleDelete(data.id)}
                            >
                                <ShieldX className="w-4" /> Decline
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={route("staff.pendaftaran.edit", data.id)}
                                className=" flex gap-2 items-center "
                            >
                                <SquarePen className="w-4" /> Edit
                            </Link>
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
