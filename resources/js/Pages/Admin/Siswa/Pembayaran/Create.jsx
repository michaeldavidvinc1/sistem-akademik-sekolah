import TextInput from "@/Components/Common/TextInput";
import UploadImage from "@/Components/Common/UploadImage";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const CreatePembayaran = () => {
    const [previewBukti, setPreviewBukti] = useState(null);
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        jumlah: "",
        deskripsi: "",
        bukti_bayar: null,
    });
    const handleImageChange = (e) => {
        setData("bukti_bayar", e.target.files[0]);
    };

    useEffect(() => {
        if (data.bukti_bayar) {
            const objectUrl = URL.createObjectURL(data.bukti_bayar);
            setPreviewBukti(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [data.bukti_bayar]);

    const submit = (e) => {
        e.preventDefault();

        post(route("siswa.pembayaran.store"), {
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
                    description: "Pembayaran berhasil.",
                });
            },
        });
    };
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    Add Data
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Pembayaran</DialogTitle>
                    <form onSubmit={submit}>
                        <div className="flex justify-center items-center mt-5">
                            <UploadImage
                                value={data.bukti_bayar}
                                handleImageChange={handleImageChange}
                                errorMessage={errors.bukti_bayar}
                                preview={previewBukti}
                                setPreview={setPreviewBukti}
                                label="Bukti Bayar"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                            <TextInput
                                id="jumlah"
                                type="number"
                                name="jumlah"
                                value={data.jumlah}
                                onChange={(e) =>
                                    setData("jumlah", e.target.value)
                                }
                                label="Jumlah Pembayaran"
                                errorMessage={errors.jumlah}
                                notEmpty
                            />
                            <TextInput
                                id="deskripsi"
                                type="text"
                                name="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                                label="Deskripsi Pembayaran"
                                errorMessage={errors.deskripsi}
                                notEmpty
                            />
                        </div>
                        <div className="flex justify-end items-center mt-3 gap-3">
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePembayaran;
