import DashboardLayout from "@/Components/Admin/Layout";
import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

const EditStaff = ({ auth, staff }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        email: staff.data.user.email,
        nama_lengkap: staff.data.nama_lengkap,
    });
    const submit = (e) => {
        e.preventDefault();
        put(route("staff.staff.update", staff.data.id), {
            onError: (errors) => {
                if (errors.name) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: errors.message,
                    });
                }
            },
        });
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="p-6">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1 bg-primary/5">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Update Staff
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
                            </div>
                            <div className="flex justify-end items-center mt-3 gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={route("staff.staff.index")}>
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

export default EditStaff;
