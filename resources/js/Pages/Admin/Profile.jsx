import TextInput from "@/Components/Common/TextInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import DashboardLayout from "@/Components/Admin/Layout";

const Profile = ({ auth }) => {
    const [seePassword, setSeePassword] = useState(false);
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        password: "",
        confirm_password: "",
    });
    const handleUpdateProfile = (e) => {
        e.preventDefault();

        post(
            route("profile.update", {
                name: data.name,
                email: data.email,
            }),
            {
                onSuccess: () => {
                    toast({
                        variant: "success",
                        title: "Success!",
                        description: "Profile updated successfully.",
                    });
                },
                onError: (errors) => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: errors.message,
                    });
                },
            }
        );
    };
    const handleChangePassword = (e) => {
        e.preventDefault();

        post(
            route("profile.change.password", {
                password: data.password,
                confirm_password: data.confirm_password,
            }),
            {
                onSuccess: () => {
                    reset("password", 'confirm_password'),
                    toast({
                        variant: "success",
                        title: "Success!",
                        description: "Change password successfully.",
                    });
                },
                onError: (errors) => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: errors.message,
                    });
                },
            }
        );
    };
    return (
        <DashboardLayout auth={auth}>
            <div>
                <h1 className="text-xl font-semibold">Profile</h1>
            </div>
            <div className="flex gap-6 mt-8">
                <Card className="w-1/2 ">
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleUpdateProfile}
                            className="flex flex-col gap-5"
                        >
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                label="Nama"
                                errorMessage={errors.name}
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                label="Email"
                                errorMessage={errors.email}
                            />
                            <div className="flex justify-end items-center">
                                <Button type="submit" size="sm">
                                    Update
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card className="w-1/2 ">
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleChangePassword} className="flex flex-col gap-5">
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={!seePassword ? "password" : "text"}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    label="Password"
                                    errorMessage={errors.password}
                                />
                                <span
                                    className="absolute right-1 top-[47%] transform w-8 h-8 p-0 flex justify-center items-center cursor-pointer"
                                    onClick={() => setSeePassword(!seePassword)}
                                    text
                                >
                                    {seePassword ? (
                                        <Eye className="w-5 h-5" />
                                    ) : (
                                        <EyeOff className="w-5 h-5" />
                                    )}
                                </span>
                            </div>
                            <div className="relative">
                                <TextInput
                                    id="confirm_password"
                                    type={!seePassword ? "password" : "text"}
                                    name="confirm_password"
                                    value={data.confirm_password}
                                    onChange={(e) =>
                                        setData(
                                            "confirm_password",
                                            e.target.value
                                        )
                                    }
                                    label="Confirm Password"
                                    errorMessage={errors.confirm_password}
                                />
                                <span
                                    className="absolute right-1 top-[47%] transform w-8 h-8 p-0 flex justify-center items-center cursor-pointer"
                                    onClick={() => setSeePassword(!seePassword)}
                                    text
                                >
                                    {seePassword ? (
                                        <Eye className="w-5 h-5" />
                                    ) : (
                                        <EyeOff className="w-5 h-5" />
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-end items-center">
                                <Button type="submit" size="sm">
                                    Change Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
