import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import React from "react";
import { columns } from "./Column";

const Index = ({ auth, pendaftaran }) => {
    console.log(pendaftaran)
    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">
                    Pendaftaran Siswa List
                </h1>
            </div>
            <Datatable columns={columns} data={pendaftaran.data} />
        </DashboardLayout>
    );
};

export default Index;
