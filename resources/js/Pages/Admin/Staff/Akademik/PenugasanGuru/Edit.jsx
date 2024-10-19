import DashboardLayout from "@/Components/Admin/Layout";
import SelectInput from "@/Components/Common/SelectInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";
import { useRef } from "react";

const CreateKelas = ({ auth, guru, kelas, mataPelajaran, penugasan }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        kelas_id: penugasan.data.kelas.id.toString(),
        mata_pelajaran_id: penugasan.data.mataPelajaran.id.toString(),
        guru_id: penugasan.data.guru.id.toString()
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("staff.penugasan.update", penugasan.data.id), {
            onError: (errors) => {
                if (errors.message) {
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
                    description: "Update Penugasan Guru successfully.",
                });
            },
        });
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="p-6">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1 bg-primary/5">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Update Penugasan Guru
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Please fill in all the required information below
                        </p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectInput
                                    name="guru_id"
                                    value={data.guru_id}
                                    onChange={(value) =>
                                        setData("guru_id", value)
                                    }
                                    label="Guru"
                                    errorMessage={errors.guru_id}
                                    notEmpty
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih guru" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {guru.data.map((item) => {
                                                return (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}
                                                    >
                                                        {item.nama_lengkap}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectInput>
                                <SelectInput
                                    name="mata_pelajaran_id"
                                    value={data.mata_pelajaran_id}
                                    onChange={(value) =>
                                        setData("mata_pelajaran_id", value)
                                    }
                                    label="Mata Pelajaran"
                                    errorMessage={errors.mata_pelajaran_id}
                                    notEmpty
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Mata Pelajaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {mataPelajaran.data.map((item) => {
                                                return (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}
                                                    >
                                                        {
                                                            item.nama_mata_pelajaran
                                                        }
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectInput>
                                <SelectInput
                                    name="kelas_id"
                                    value={data.kelas_id}
                                    onChange={(value) =>
                                        setData("kelas_id", value)
                                    }
                                    label="Kelas"
                                    errorMessage={errors.kelas_id}
                                    notEmpty
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kelas" />
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
                            </div>
                            <div className="flex justify-end items-center mt-3 gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={route("staff.penugasan.index")}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit">Update</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateKelas;
