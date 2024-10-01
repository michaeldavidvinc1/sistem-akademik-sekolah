import DashboardLayout from "@/Components/Admin/Layout";
import { Link } from "@inertiajs/react";
import React from "react";

const Index = ({ auth }) => {
    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Siswa List</h1>
                <Link
                    className="bg-primary text-white text-sm px-3 py-2 font-semibold rounded-lg hover:bg-primary/90"
                    href={route("staff.siswa.create")}
                >
                    Add Data
                </Link>
            </div>
        </DashboardLayout>
    );
};

export default Index;
