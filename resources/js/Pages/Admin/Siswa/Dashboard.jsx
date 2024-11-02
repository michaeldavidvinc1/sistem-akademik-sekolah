import DashboardLayout from "@/Components/Admin/Layout";
import SiswaInformasi from "@/Components/Admin/Siswa/SiswaInformasi";
import SiswaPembayaranPending from "@/Components/Admin/Siswa/SiswaPembayaranPending";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { ArrowDownWideNarrow, BookOpen, Trophy } from "lucide-react";
import React from "react";

const Dashboard = ({ auth, pembayaran, informasi, pembayaranPending, totalMapel, siswa }) => {
    return (
        <div>
            <DashboardLayout auth={auth}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 text-white shadow-lg lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">
                                    Selamat Datang, {auth.user.name}
                                </h1>
                                <p className="text-purple-100">
                                    {siswa.data.kelas.nama_kelas} / {siswa.data.jurusan.nama_jurusan}
                                </p>
                                <p className="text-sm text-purple-100">
                                    Tetap semangat dalam belajar! 🌟
                                </p>
                            </div>
                            <Trophy className="h-16 w-16 text-purple-100" />
                        </div>
                    </div>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Mata Pelajaran
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalMapel}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Pembayaran Pending
                            </CardTitle>
                            <ArrowDownWideNarrow className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pembayaranPending}</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5">
                    <SiswaPembayaranPending pembayaran={pembayaran.data} />
                    <SiswaInformasi informasi={informasi.data} />
                </div>
            </DashboardLayout>
        </div>
    );
};

export default Dashboard;
