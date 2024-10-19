import DashboardLayout from "@/Components/Admin/Layout";
import SelectInput from "@/Components/Common/SelectInput";
import TextInput from "@/Components/Common/TextInput";
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

const EditKelas = ({ auth, tahunAjaran, jurusan, kelas }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        nama_kelas: kelas.data.nama_kelas,
        kapasitas: kelas.data.kapasitas,
        tahun_ajaran_id: kelas.data.tahun_ajaran.id.toString(),
        jurusan_id: kelas.data.jurusan.id.toString(),
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("staff.kelas.update", kelas.data.id), {
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
                    description: "Update Kelas successfully.",
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
                            Update Kelas
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Please fill in all the required information below
                        </p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextInput
                                    id="nama_kelas"
                                    type="text"
                                    name="nama_kelas"
                                    value={data.nama_kelas}
                                    onChange={(e) =>
                                        setData("nama_kelas", e.target.value)
                                    }
                                    label="Nama Kelas"
                                    errorMessage={errors.nama_kelas}
                                    notEmpty
                                />
                                <TextInput
                                    id="kapasitas"
                                    type="number"
                                    name="kapasitas"
                                    value={data.kapasitas}
                                    onChange={(e) =>
                                        setData("kapasitas", e.target.value)
                                    }
                                    label="Kapasitas Kelas"
                                    errorMessage={errors.kapasitas}
                                    notEmpty
                                />
                                <SelectInput
                                    name="tahun_ajaran_id"
                                    value={data.tahun_ajaran_id}
                                    onChange={(value) =>
                                        setData("tahun_ajaran_id", value)
                                    }
                                    label="Tahun Ajaran"
                                    errorMessage={errors.tahun_ajaran_id}
                                    notEmpty
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tahun ajaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {tahunAjaran.data.map((item) => {
                                                return (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}
                                                    >
                                                        {item.tahun_ajaran}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectInput>
                                <SelectInput
                                    name="jurusan_id"
                                    value={data.jurusan_id}
                                    onChange={(value) =>
                                        setData("jurusan_id", value)
                                    }
                                    label="Jurusan"
                                    errorMessage={errors.jurusan_id}
                                    notEmpty
                                >
                                    <SelectTrigger>
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
                            </div>
                            <div className="flex justify-end items-center mt-3 gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={route("staff.kelas.index")}>
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

export default EditKelas;
