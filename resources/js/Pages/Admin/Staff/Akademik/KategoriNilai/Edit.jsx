import DashboardLayout from "@/Components/Admin/Layout";
import SelectInput from "@/Components/Common/SelectInput";
import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";

const CreateKelas = ({ auth, jenisPenilaian }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        kode_jenis_penilaian: jenisPenilaian.data.kode_jenis_penilaian,
        deskripsi: jenisPenilaian.data.deskripsi,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("staff.jenis-penilaian.update", jenisPenilaian.data.id), {
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
                    description: "Update Kategori Nilai successfully.",
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
                            Update Kategori Nilai
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Please fill in all the required information below
                        </p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextInput
                                    id="kode_jenis_penilaian"
                                    type="text"
                                    name="kode_jenis_penilaian"
                                    value={data.kode_jenis_penilaian}
                                    onChange={(e) =>
                                        setData("kode_jenis_penilaian", e.target.value)
                                    }
                                    label="Kode Kategori Nilai"
                                    errorMessage={errors.kode_jenis_penilaian}
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
                                    label="Deskripsi"
                                    errorMessage={errors.deskripsi}
                                    notEmpty
                                />
                            </div>
                            <div className="flex justify-end items-center mt-3 gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={route("staff.jenis-penilaian.index")}>
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
