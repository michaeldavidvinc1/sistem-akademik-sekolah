import DashboardLayout from "@/Components/Admin/Layout";
import React from "react";

const Dashboard = ({ auth }) => {
    return (
        <div>
            <DashboardLayout auth={auth}>
                <h1>Dashboard Guru</h1>
            </DashboardLayout>
        </div>
    );
};

export default Dashboard;
