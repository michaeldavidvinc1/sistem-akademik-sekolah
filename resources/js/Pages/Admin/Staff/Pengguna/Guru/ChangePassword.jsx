import DashboardLayout from "@/Components/Admin/Layout";
import React from "react";

const ChangePasswordGuru = ({ guru, auth }) => {
    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Change Password</h1>
            </div>
            <form>
                <div className="">

                </div>
            </form>
        </DashboardLayout>
    );
};

export default ChangePasswordGuru;
