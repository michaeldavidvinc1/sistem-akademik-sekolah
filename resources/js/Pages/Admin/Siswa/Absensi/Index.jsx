import DashboardLayout from "@/Components/Admin/Layout";
import { Badge } from "@/Components/ui/badge";
import { Calendar } from "@/Components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import React, { useState } from "react";

const Index = ({ auth, absensi }) => {


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedAttendance, setSelectedAttendance] = useState(null);

    // Format tanggal untuk key lookup
    const formatDate = (date) => {
        return date.toISOString().split("T")[0];
    };

    // Handler ketika tanggal dipilih
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        const attendance = absensi[formatDate(date)];
        setSelectedAttendance(attendance);
    };

    // Fungsi untuk mendapatkan warna badge berdasarkan status
    const getStatusColor = (status) => {
        switch (status) {
            case "hadir":
                return "bg-green-500";
            case "sakit":
                return "bg-yellow-500";
            case "izin":
                return "bg-blue-500";
            case "alpha":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    // Fungsi untuk mendapatkan icon berdasarkan status
    const getStatusIcon = (status) => {
        switch (status) {
            case "hadir":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "sakit":
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case "izin":
                return <AlertCircle className="w-4 h-4 text-blue-500" />;
            case "alpha":
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return null;
        }
    };
    console.log(absensi)
    return (
        <DashboardLayout auth={auth}>
            <Card>
                <CardHeader>
                    <CardTitle>Riwayat Absensi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                className="rounded-md border"
                                modifiers={{
                                    booked: (date) =>
                                        absensi[formatDate(date)] !==
                                        undefined,
                                }}
                                modifiersStyles={{
                                    booked: {
                                        fontWeight: "bold",
                                    },
                                }}
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge
                                    variant="secondary"
                                    className="flex gap-1 items-center"
                                >
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Hadir
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="flex gap-1 items-center"
                                >
                                    <Clock className="w-4 h-4 text-yellow-500" />
                                    Sakit
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="flex gap-1 items-center"
                                >
                                    <AlertCircle className="w-4 h-4 text-blue-500" />
                                    Izin
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="flex gap-1 items-center"
                                >
                                    <XCircle className="w-4 h-4 text-red-500" />
                                    Alpha
                                </Badge>
                            </div>

                            {selectedAttendance ? (
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(
                                                    selectedAttendance.status_kehadiran
                                                )}
                                                <Badge
                                                    className={getStatusColor(
                                                        selectedAttendance.status_kehadiran
                                                    )}
                                                >
                                                    {selectedAttendance.status_kehadiran.toUpperCase()}
                                                </Badge>
                                            </div>
                                            {selectedAttendance.keterangan && (
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Catatan
                                                    </p>
                                                    <p className="font-medium">
                                                        {
                                                            selectedAttendance.keterangan
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="text-center p-4 text-gray-500">
                                    Pilih tanggal untuk melihat detail absensi
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default Index;
