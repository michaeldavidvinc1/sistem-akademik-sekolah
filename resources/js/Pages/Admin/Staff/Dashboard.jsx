import DashboardLayout from "@/Components/Admin/Layout";
import Informasi from "@/Components/Admin/Staff/Informasi";
import PembayaranPending from "@/Components/Admin/Staff/PembayaranPending";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { ScrollText, UserCog, UserPlus, Users } from "lucide-react";
import React from "react";

const Dashboard = ({
    auth,
    siswaCount,
    guruCount,
    kelasCount,
    pendaftaranCount,
    informasi,
    pembayaran
}) => {
    return (
        <div>
            <DashboardLayout auth={auth}>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Siswa
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {siswaCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Guru
                            </CardTitle>
                            <UserCog className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {guruCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Kelas
                            </CardTitle>
                            <ScrollText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {kelasCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Pendaftar
                            </CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {pendaftaranCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5">
                    <PembayaranPending pembayaran={pembayaran.data} />
                    <Informasi informasi={informasi.data} />
                </div>
            </DashboardLayout>
        </div>
    );
};

export default Dashboard;
