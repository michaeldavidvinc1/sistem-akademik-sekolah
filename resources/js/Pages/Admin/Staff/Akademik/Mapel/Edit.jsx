import DashboardLayout from "@/Components/Admin/Layout";
import SelectInput from "@/Components/Common/SelectInput";
import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

const EditMapel = ({ auth, jurusan, mataPelajaran }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        kode_mata_pelajaran: mataPelajaran.data.kode_mata_pelajaran,
        nama_mata_pelajaran: mataPelajaran.data.nama_mata_pelajaran,
        jurusan_id: mataPelajaran.data.jurusan.id.toString(),
        kkm: mataPelajaran.data.kkm,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("staff.mapel.update", mataPelajaran.data.id), {
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
                    description: "Update Mata Pelajaran successfully.",
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
                            Add New Mata Pelajaran
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Please fill in all the required information below
                        </p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="mt-5">
                            <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                                <TextInput
                                    id="kode_mata_pelajaran"
                                    type="kode_mata_pelajaran"
                                    name="nama_kelas"
                                    value={data.kode_mata_pelajaran}
                                    onChange={(e) =>
                                        setData(
                                            "kode_mata_pelajaran",
                                            e.target.value
                                        )
                                    }
                                    label="Kode Mata Pelajaran"
                                    errorMessage={errors.kode_mata_pelajaran}
                                    notEmpty
                                />
                                <TextInput
                                    id="nama_mata_pelajaran"
                                    type="text"
                                    name="nama_mata_pelajaran"
                                    value={data.nama_mata_pelajaran}
                                    onChange={(e) =>
                                        setData(
                                            "nama_mata_pelajaran",
                                            e.target.value
                                        )
                                    }
                                    label="Nama Mata Pelajaran"
                                    errorMessage={errors.nama_mata_pelajaran}
                                    notEmpty
                                />
                                <SelectInput
                                    name="jurusan_id"
                                    value={data.jurusan_id}
                                    onChange={(value) =>
                                        setData("jurusan_id", value)
                                    }
                                    label="Jurusan"
                                    errorMessage={errors.jurusan_id}
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
                                <TextInput
                                    id="kkm"
                                    type="number"
                                    name="kkm"
                                    value={data.kkm}
                                    onChange={(e) =>
                                        setData(
                                            "kkm",
                                            e.target.value
                                        )
                                    }
                                    label="KKM"
                                    errorMessage={errors.kkm}
                                    notEmpty
                                />
                            </div>
                            <div className="flex justify-end items-center mt-3 gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={route("staff.mapel.index")}>
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

export default EditMapel;
