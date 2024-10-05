import React, { useState } from "react";
import DashboardHeader from "./Header";
import DashboardSidebar from "./Sidebar";

const DashboardLayout = ({ auth, children }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <div className="flex min-h-screen w-full bg-gradient-to-bottom">
            <DashboardSidebar
                setOpen={setOpenSidebar}
                open={openSidebar}
                user={auth.user}
            />
            <div className="flex flex-1 flex-col">
                <DashboardHeader setOpen={setOpenSidebar} auth={auth} />
                <main className="flex-1 flex-col flex p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
