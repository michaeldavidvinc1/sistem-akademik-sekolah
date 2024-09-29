import TextInput from "@/Components/Common/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

const Login = () => {
    const toast = useRef(null);
    const [seePassword, setSeePassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login.store"), {
            onFinish: () => reset("password"),
            onError: (errors) => {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: errors.message,
                    life: 3000,
                });
            },
        });
    };
    return (
        <>
            <Toast ref={toast} />
            <Head title="Login" />
            <div className="flex h-screen">
                <div
                    className="hidden lg:block w-1/2 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('assets/login.jpg')",
                    }}
                ></div>
                <div className="flex items-center justify-center w-full lg:w-1/2 bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <div className="text-center">
                            <h1>Logo/Icon</h1>
                        </div>
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            Login
                        </h1>
                        <form className="space-y-4" onSubmit={submit}>
                            <div>
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
                            </div>
                            <div className="mt-4">
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={
                                            !seePassword ? "password" : "text"
                                        }
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        label="Password"
                                        errorMessage={errors.password}
                                    />
                                    <Button
                                        className="absolute right-1 top-[47%] transform w-8 h-8 p-0 flex justify-center items-center focus:border-[#BADDFF] text-[#BADDFF]"
                                        type="button"
                                        onClick={() =>
                                            setSeePassword(!seePassword)
                                        }
                                        text
                                    >
                                        {seePassword ? (
                                            <Eye className="w-5 h-5" />
                                        ) : (
                                            <EyeOff className="w-5 h-5" />
                                        )}
                                    </Button>
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="font-semibold text-sm"
                                        size="small"
                                    >
                                        Log in
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
