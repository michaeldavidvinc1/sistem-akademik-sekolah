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
            const dataRow = row.original;
            const { toast } = useToast();
            const [seePassword, setSeePassword] = useState(false);
            const { data, setData, post, errors, reset } = useForm({
                password: "",
                confirm_password: "",
            });
            const handleChangePassword = (e) => {
                e.preventDefault();
                post(route("siswa.change.password", dataRow.id), {
                    onSuccess: () => {
                        reset('confirm_password', 'password'),
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
                                        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
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
                                                    notEmpty
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
                                                    notEmpty
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
                                href={route("staff.siswa.edit", dataRow.id)}
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