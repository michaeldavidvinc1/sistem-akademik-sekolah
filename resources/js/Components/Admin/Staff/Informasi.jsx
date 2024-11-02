import React, { useState } from "react";
import {
    Mail,
    Plus,
    Clock,
    Trash2,
    User,
    GraduationCap,
    Users,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { router, useForm } from "@inertiajs/react";
import TextArea from "@/Components/Common/Textarea";
import SelectInput from "@/Components/Common/SelectInput";
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import Swal from "sweetalert2";

const Informasi = ({informasi}) => {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        pesan: "",
        tujuan: "",
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submit = (e) => {
        e.preventDefault();

        post(route("staff.informasi.store"), {
            onError: (errors) => {
                if (errors.name) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: errors.message,
                    });
                }
            },
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Informasi berhasil ditambah.",
                });
                setIsDialogOpen(false); 
                reset();
            },
        });
    };

    const getTargetBadgeStyles = (target) => {
        switch (target) {
            case "guru":
                return {
                    bg: "bg-blue-50",
                    text: "text-blue-600",
                    icon: <User size={14} className="mr-1" />,
                };
            case "siswa":
                return {
                    bg: "bg-green-50",
                    text: "text-green-600",
                    icon: <GraduationCap size={14} className="mr-1" />,
                };
            default:
                return {
                    bg: "bg-purple-50",
                    text: "text-purple-600",
                    icon: <Users size={14} className="mr-1" />,
                };
        }
    };

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
                router.delete(route("staff.informasi.destroy", id), {
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
        <div className="w-full">
            <div className="bg-white rounded-xl shadow-sm p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                        Informasi
                    </span>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <button className="flex items-center gap-1 text-gray-600">
                                <Plus size={18} />
                                <span>Informasi</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambahkan Informasi</DialogTitle>
                                <form onSubmit={submit}>
                                    <div className="mt-3 flex flex-col gap-4">
                                        <SelectInput
                                            name="tujuan"
                                            value={data.tujuan}
                                            onChange={(value) =>
                                                setData("tujuan", value)
                                            }
                                            label="Tujuan Informasi"
                                            errorMessage={errors.tujuan}
                                            notEmpty
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih tujuan informasi" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="guru">
                                                        Guru
                                                    </SelectItem>
                                                    <SelectItem value="siswa">
                                                        Siswa
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </SelectInput>
                                        <TextArea
                                            id="pesan"
                                            name="pesan"
                                            value={data.pesan}
                                            onChange={(e) =>
                                                setData("pesan", e.target.value)
                                            }
                                            label="Pesan Informasi"
                                            errorMessage={errors.pesan}
                                            notEmpty
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <Button type="submit" className="w-full">Save</Button>
                                    </div>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Notification List */}
                <div className="space-y-3">
                    {informasi.map((notification) => {
                        const targetStyle = getTargetBadgeStyles(
                            notification.tujuan
                        );

                        return (
                            <div
                                key={notification.id}
                                className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-start gap-3">
                                    <Mail
                                        className="text-green-500 mt-1 flex-shrink-0"
                                        size={20}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-gray-800">
                                                    {notification.user.name}
                                                </h3>
                                                <div
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${targetStyle.bg} ${targetStyle.text}`}
                                                >
                                                    {targetStyle.icon}
                                                    {notification.tujuan}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center text-gray-400 text-sm">
                                                    <Clock
                                                        size={14}
                                                        className="mr-1"
                                                    />
                                                    {notification.created_at}
                                                </div>
                                                <button className="text-gray-400 hover:text-red-500 transition-colors" onClick={() => handleDelete(notification.id)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            {notification.pesan}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Informasi;
