import DashboardLayout from "@/Components/Admin/Layout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { router } from "@inertiajs/react";
import {
    ChartColumnStacked,
    GraduationCap,
    RotateCcw,
    ScrollText,
    Search,
} from "lucide-react";
import React, { useState } from "react";

const Index = ({
    auth,
    jenisPenilaian,
    kelas,
    queryParams = null,
    dataPenilaian,
    nilaiSiswa,
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("guru.rekap.nilai"), queryParams);
    };

    const handleResetFilters = () => {
        router.get(route("guru.rekap.nilai"), {});
    };

    const mataPelajaran = Object.keys(nilaiSiswa?.[0]?.nilai ?? {});

    return (
        <DashboardLayout auth={auth}>
            <div className="">
                {/* Modern Header Section */}
                <div className="bg-white border-b">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Rekap Nilai Siswa
                            </h1>
                            <Button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                variant="ghost"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <Search className="h-5 w-5 mr-2" />
                                Filter Data
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Floating Filter Panel */}
                <div
                    className={`transition-all duration-300 ${
                        isFilterOpen
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        <div className="bg-white rounded-xl shadow-sm border p-6 backdrop-blur-sm bg-opacity-90">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Filter Pencarian
                                </h2>
                                <Button
                                    onClick={handleResetFilters}
                                    variant="ghost"
                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                >
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Reset Filter
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="inline-flex items-center text-sm font-medium text-gray-700">
                                        <ScrollText className="h-4 w-4 mr-2 text-blue-500" />
                                        Pilih Kelas
                                    </label>
                                    <Select
                                        name="kelas_id"
                                        value={queryParams?.kelas_id}
                                        onValueChange={(value) =>
                                            searchFieldChanged(
                                                "kelas_id",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-full bg-gray-50 border-0 hover:bg-gray-100 transition-colors">
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

                                <div className="space-y-2">
                                    <label className="inline-flex items-center text-sm font-medium text-gray-700">
                                        <ChartColumnStacked className="h-4 w-4 mr-2 text-purple-500" />
                                        Kategori Nilai
                                    </label>
                                    <Select
                                        name="jenis_penilaian_id"
                                        value={queryParams?.jenis_penilaian_id}
                                        onValueChange={(value) =>
                                            searchFieldChanged(
                                                "jenis_penilaian_id",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-full bg-gray-50 border-0 hover:bg-gray-100 transition-colors">
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {jenisPenilaian.data.map(
                                                    (item) => (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={item.id.toString()}
                                                        >
                                                            {item.deskripsi} (
                                                            {
                                                                item.kode_jenis_penilaian
                                                            }
                                                            )
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="max-w-7xl mx-auto px-4 py-6">
                    {queryParams.kelas_id && queryParams.jenis_penilaian_id ? (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="w-16 text-center font-semibold">
                                                No
                                            </TableHead>
                                            <TableHead className="font-semibold text-center">
                                                Nama Lengkap
                                            </TableHead>
                                            {mataPelajaran.map(
                                                (item, index) => (
                                                    <TableHead
                                                        className="font-semibold text-center"
                                                        key={index}
                                                    >
                                                        {item}
                                                    </TableHead>
                                                )
                                            )}
                                            <TableHead className="font-semibold text-center">
                                                Rata - Rata
                                            </TableHead>
                                            <TableHead className="font-semibold text-center">
                                                Ranking
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {nilaiSiswa.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {item.nama_siswa}
                                                </TableCell>
                                                {Object.entries(item.nilai).map(
                                                    (
                                                        [mataPelajaran, nilai],
                                                        idx
                                                    ) => (
                                                        <TableCell
                                                            key={idx}
                                                            className="text-center"
                                                        >
                                                            {nilai}
                                                        </TableCell>
                                                    )
                                                )}
                                                 <TableCell className="text-center">
                                                    {item.rata_rata}
                                                </TableCell>
                                                 <TableCell className="text-center">
                                                    {item.ranking}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <GraduationCap className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                Gunakan filter di atas untuk menampilkan data
                                nilai siswa
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Index;
