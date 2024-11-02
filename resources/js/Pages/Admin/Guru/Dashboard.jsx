import DashboardLayout from "@/Components/Admin/Layout";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileCheck, Award, UserCog } from "lucide-react";
import GuruInformasi from "@/Components/Admin/Guru/GuruInformasi";

const Dashboard = ({ auth, informasi, totalKelas, totalSiswa }) => {
    return (
        <div>
            <DashboardLayout auth={auth}>
                {/* Welcome Banner */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 text-white shadow-lg lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">
                                    Selamat Datang, {auth.user.name}
                                </h1>
                                <p className="text-sm text-blue-100">
                                    Semoga hari Anda menyenangkan dan penuh
                                    inspirasi
                                </p>
                            </div>
                            <Award className="h-16 w-16 text-blue-100" />
                        </div>
                    </div>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Kelas
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalKelas}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Siswa
                            </CardTitle>
                            <UserCog className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSiswa}</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5">
                    <GuruInformasi informasi={informasi.data} />
                </div>
            </DashboardLayout>
        </div>
    );
};

export default Dashboard;
