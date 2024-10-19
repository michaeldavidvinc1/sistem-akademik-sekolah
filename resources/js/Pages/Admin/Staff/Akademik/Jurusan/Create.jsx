import DashboardLayout from "@/Components/Admin/Layout";
import TextArea from "@/Components/Common/Textarea";
import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";

const CreateJurusan = ({ auth }) => {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        kode_jurusan: "",
        nama_jurusan: "",
        deskripsi: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("staff.jurusan.store"), {
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
                    description: "Create jurusan successfully.",
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
                            Add New Jurusan
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Please fill in all the required information below
                        </p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextInput
                                    id="kode_jurusan"
                                    type="text"
                                    name="kode_jurusan"
                                    value={data.kode_jurusan}
                                    onChange={(e) =>
                                        setData("kode_jurusan", e.target.value)
                                    }
                                    label="Kode Jurusan"
                                    errorMessage={errors.kode_jurusan}
                                    notEmpty
                                />
                                <TextInput
                                    id="nama_jurusan"
                                    type="text"
                                    name="nama_jurusan"
                                    value={data.nama_jurusan}
                                    onChange={(e) =>
                                        setData("nama_jurusan", e.target.value)
                                    }
                                    label="Nama Jurusan"
                                    errorMessage={errors.nama_jurusan}
                                    notEmpty
                                />
                                <TextArea
                                    id="deskripsi"
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
                                    <Link href={route("staff.jurusan.index")}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateJurusan;
