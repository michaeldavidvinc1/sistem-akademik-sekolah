import DashboardLayout from "@/Components/Admin/Layout";
import TextInput from "@/Components/Common/TextInput";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link, useForm } from "@inertiajs/react";

const CreateStaff = ({ auth }) => {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        nama_lengkap: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("staff.staff.store"), {
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
            <h1 className="text-xl font-semibold">Add Staff Page</h1>
            <form onSubmit={submit} className="mt-5">
                <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4">
                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        label="Email"
                        errorMessage={errors.email}
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
                    />
                </div>
                <div className="flex justify-end items-center mt-3 gap-3">
                    <Button variant="ghost">
                        <Link href={route("staff.staff.index")}>Cancel</Link>
                    </Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default CreateStaff;
