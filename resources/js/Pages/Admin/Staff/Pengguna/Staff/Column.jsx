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
import { Link, router, useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import TextInput from "@/Components/Common/TextInput";
import { useState } from "react";
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
            const dataRow = row.original;
            const { toast } = useToast();
            const [seePassword, setSeePassword] = useState(false);
            const { data, setData, post, errors, reset } = useForm({
                password: "",
                confirm_password: "",
            });
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
                        router.delete(route("staff.guru.destroy", id), {
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

            const handleChangeStatus = (e) => {
                e.preventDefault();
                router.get(
                    route("staff.change.status", dataRow.id),
                    {},
                    {
                        onSuccess: () => {
                            toast({
                                variant: "success",
                                title: "Success!",
                                description: "Change status successfully.",
                            });
                        },
                    }
                );
            };

            const handleChangePassword = (e) => {
                e.preventDefault();
                post(route("staff.change.password", dataRow.id), {
                    onSuccess: () => {
                        reset("confirm_password", "password"),
                            toast({
                                variant: "success",
                                title: "Success!",
                                description: "Change password successfully.",
                            });
                    },
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
                        <DropdownMenuItem
                            onSelect={(event) => event.preventDefault()}
                        >
                            <Dialog>
                                <DialogTrigger asChild>
                                    <span className=" flex gap-2 items-center cursor-pointer">
                                        <FileLock2 className="w-4" /> Change
                                        Password
                                    </span>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Change Password
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <form
                                            onSubmit={handleChangePassword}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="relative">
                                                <TextInput
                                                    id="password"
                                                    type={
                                                        !seePassword
                                                            ? "password"
                                                            : "text"
                                                    }
                                                    name="password"
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Password"
                                                    errorMessage={
                                                        errors.password
                                                    }
                                                />
                                                <span
                                                    className="absolute right-1 top-[47%] transform w-8 h-8 p-0 flex justify-center items-center cursor-pointer"
                                                    onClick={() =>
                                                        setSeePassword(
                                                            !seePassword
                                                        )
                                                    }
                                                    text
                                                >
                                                    {seePassword ? (
                                                        <Eye className="w-5 h-5" />
                                                    ) : (
                                                        <EyeOff className="w-5 h-5" />
                                                    )}
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <TextInput
                                                    id="confirm_password"
                                                    type={
                                                        !seePassword
                                                            ? "password"
                                                            : "text"
                                                    }
                                                    name="password"
                                                    value={
                                                        data.confirm_password
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "confirm_password",
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Confirm Password"
                                                    errorMessage={
                                                        errors.confirm_password
                                                    }
                                                />
                                                <span
                                                    className="absolute right-1 top-[47%] transform w-8 h-8 p-0 flex justify-center items-center cursor-pointer"
                                                    onClick={() =>
                                                        setSeePassword(
                                                            !seePassword
                                                        )
                                                    }
                                                    text
                                                >
                                                    {seePassword ? (
                                                        <Eye className="w-5 h-5" />
                                                    ) : (
                                                        <EyeOff className="w-5 h-5" />
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-end items-center mt-6">
                                                <Button type="submit">
                                                    Update Password
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={route("staff.guru.edit", dataRow.id)}
                                className={`flex gap-2 items-center ${
                                    dataRow.status === 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                                onClick={handleChangeStatus}
                            >
                                {dataRow.status === 0 ? (
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
                                href={route("staff.staff.edit", dataRow.id)}
                                className=" flex gap-2 items-center "
                            >
                                <SquarePen className="w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer text-red-500"
                                onClick={() => handleDelete(dataRow.id)}
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
