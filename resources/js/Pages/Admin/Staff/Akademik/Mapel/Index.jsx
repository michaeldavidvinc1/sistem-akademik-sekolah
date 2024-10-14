import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";

import { Link, router } from "@inertiajs/react";
import React from "react";
import { columns } from "./Column";

const Index = ({ auth, mataPelajaran }) => {
    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Mata Pelajaran List</h1>
                <Link
                    className="bg-primary text-white text-sm px-3 py-2 font-semibold rounded-lg hover:bg-primary/90"
                    href={route("staff.mapel.create")}
                >
                    Add Data
                </Link>
            </div>
            <Datatable columns={columns} data={mataPelajaran.data} />
        </DashboardLayout>
    );
};

export default Index;
