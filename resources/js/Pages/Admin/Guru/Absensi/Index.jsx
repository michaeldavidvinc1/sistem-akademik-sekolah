import DashboardLayout from "@/Components/Admin/Layout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import { router } from "@inertiajs/react";
import { Calendar, CheckCircle2, Clock, GraduationCap, Users } from "lucide-react";
import React, { useState, useEffect } from "react";

const Index = ({
    auth,
    sudahAbsen,
    absensi,
    queryParams = null,
    kelas,
    siswa,
}) => {
    queryParams = queryParams || {};
    const [attendanceData, setAttendanceData] = useState([]);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [searchParams, setSearchParams] = useState({
        kelas_id: queryParams.kelas_id || "",
        tanggal: queryParams.tanggal || getTodayDate(),
    });

    useEffect(() => {
        if (!searchParams.kelas_id && kelas.data.length > 0) {
            setSearchParams((prev) => ({
                ...prev,
                kelas_id: kelas.data[0].id.toString(),
            }));
        }
        if (siswa.data) {
            const initialData = siswa.data.map((item) => ({
                siswa_id: item.id,
                status_kehadiran: "", // default empty
                keterangan: "", // default empty
                kelas_id: searchParams.kelas_id,
                tanggal: searchParams.tanggal,
                mata_pelajaran_id: null,
                guru_id: auth.user.id,
            }));
            setAttendanceData(initialData);
        }
    }, [kelas.data, siswa.data]);

    // Function to update search params and trigger route change
    const searchFieldChanged = (name, value) => {
        setSearchParams((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Update queryParams and trigger router.get
        const newQueryParams = { ...queryParams, [name]: value };
        router.get(route("staff.guru.index"), newQueryParams);
    };

    const handleFieldChange = (index, field, value) => {
        setAttendanceData((prev) => {
            const updatedData = [...prev];
            updatedData[index][field] = value;
            return updatedData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the attendance data to the backend
        router.post(route("guru.absensi.store"), {
            attendance: attendanceData,
        });
    };

    const formatTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        return date.toLocaleDateString("id-ID", options);
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <Card className="mb-6 max-w-7xl mx-auto">
                    <CardContent className="pt-6">
                        {/* Teacher Info Section */}
                        <div className="mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <GraduationCap className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {auth.user.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Guru Pengajar
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Clock className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Waktu
                                    </p>
                                    <p className="font-medium">
                                        {formatTime()} WIB
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tanggal
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(searchParams.tanggal)}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <CheckCircle2 className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>
                                    <p className="font-medium">Belum Submit</p>
                                </div>
                            </div>
                        </div>

                        {/* Filter Controls */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <Input
                                        type="date"
                                        className="w-full md:w-[200px]"
                                        value={searchParams.tanggal}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "tanggal",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <Users className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <Select
                                        name="kelas_id"
                                        value={searchParams.kelas_id}
                                        onValueChange={(value) =>
                                            searchFieldChanged(
                                                "kelas_id",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-full md:w-[200px]">
                                            <SelectValue placeholder="Pilih Kelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {kelas.data.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}
                                                    >
                                                        {item.nama_kelas}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <form onSubmit={handleSubmit}>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                                        <TableHead className="w-16 text-center">
                                            No
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Nama Lengkap
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Kelas
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Status
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Keterangan
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {siswa.data.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            className="hover:bg-gray-50/50"
                                        >
                                            <TableCell className="text-center font-medium text-gray-600">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.nama_lengkap}
                                            </TableCell>
                                            <TableCell className="text-gray-600">
                                                {item.kelas.nama_kelas}
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={
                                                        attendanceData[index]
                                                            ?.status_kehadiran
                                                    }
                                                    onValueChange={(value) =>
                                                        handleFieldChange(
                                                            index,
                                                            "status_kehadiran",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Pilih Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem
                                                            value="hadir"
                                                            className="text-green-600"
                                                        >
                                                            ✓ Hadir
                                                        </SelectItem>
                                                        <SelectItem
                                                            value="sakit"
                                                            className="text-yellow-600"
                                                        >
                                                            🤒 Sakit
                                                        </SelectItem>
                                                        <SelectItem
                                                            value="izin"
                                                            className="text-blue-600"
                                                        >
                                                            ℹ️ Izin
                                                        </SelectItem>
                                                        <SelectItem
                                                            value="alpha"
                                                            className="text-red-600"
                                                        >
                                                            ✗ Alpha
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Textarea
                                                    placeholder="Tambahkan keterangan..."
                                                    value={
                                                        attendanceData[index]
                                                            ?.keterangan
                                                    }
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            index,
                                                            "keterangan",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="min-h-[80px] resize-none"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="p-4 border-t bg-gray-50/50">
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                                    >
                                        Submit Absensi
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
