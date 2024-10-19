import DashboardLayout from "@/Components/Admin/Layout";
import RadioInput from "@/Components/Common/RadioInput";
import SelectInput from "@/Components/Common/SelectInput";
import TextArea from "@/Components/Common/Textarea";
import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";

const EditGuru = ({ auth, jurusan, guru }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        email: guru.data.user.email,
        nama_lengkap: guru.data.nama_lengkap,
        bidang_studi: guru.data.bidang_studi,
        alamat: guru.data.alamat,
        telepon: guru.data.telepon,
        jurusan_id: guru.data?.jurusan?.id.toString(),
    });
    const submit = (e) => {
        e.preventDefault();
        put(route("staff.guru.update", guru.data.id), {
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
                    description: "Update Guru successfully.",
                });
            }
        });
    };

    const statusCom = [
        { name: "Active", key: 1 },
        { name: "Inactive", key: 0 },
    ];
    return (
        <DashboardLayout auth={auth}>
             <div className="p-6">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1 bg-primary/5">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Update Guru
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Please fill in all the required information below
                        </p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextInput
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    label="Email"
                                    errorMessage={errors.email}
                                    notEmpty
                                />
                                <TextInput
                                    id="nama_lengkap"
                                    type="text"
                                    name="nama_lengkap"
                                    value={data.nama_lengkap}
                                    onChange={(e) =>
                                        setData("nama_lengkap", e.target.value)
                                    }
                                    label="Nama Lengkap"
                                    errorMessage={errors.nama_lengkap}
                                    notEmpty
                                />
                                <TextInput
                                    id="bidang_studi"
                                    type="text"
                                    name="bidang_studi"
                                    value={data.bidang_studi}
                                    onChange={(e) =>
                                        setData("bidang_studi", e.target.value)
                                    }
                                    label="Bidang Studi"
                                    errorMessage={errors.bidang_studi}
                                    notEmpty
                                />
                                <TextInput
                                    id="telepon"
                                    type="text"
                                    name="telepon"
                                    value={data.telepon}
                                    onChange={(e) =>
                                        setData("telepon", e.target.value)
                                    }
                                    label="Telepon"
                                    errorMessage={errors.telepon}
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
                                <TextArea
                                    id="alamat"
                                    name="alamat"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    label="Alamat"
                                    errorMessage={errors.alamat}
                                    notEmpty
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t">
                                <Button variant="outline" asChild>
                                    <Link href={route("staff.guru.index")}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Saving..." : "Update"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditGuru;
