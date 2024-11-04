import React, { useState } from "react";
import DashboardLayout from "@/Components/Admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    ChartColumnStacked,
    GraduationCap,
    Printer,
    RotateCcw,
    ScrollText,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import axios from "axios";

const Index = ({ auth, kelas, queryParams = null, siswaDenganNilai }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("guru.cetak.nilai"), queryParams);
    };
    const mataPelajaran = Object.keys(
        siswaDenganNilai?.[0]?.mata_pelajaran ?? {}
    );

    const handleResetFilters = () => {
        router.get(route("guru.cetak.nilai"), {});
    };

    const handleCetakRaport = (siswaId) => {
        axios.get(`/guru/cetak-nilai/${siswaId}`, { responseType: 'blob' })
        .then((res) => {
            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);

            // Check for a filename in the content-disposition header
            const contentDisposition = res.headers['content-disposition'];
            let filename = 'raport.pdf';
            if (contentDisposition && contentDisposition.includes('filename=')) {
                filename = contentDisposition
                    .split('filename=')[1]
                    .replace(/"/g, ''); // Remove quotes if they exist
            }
            link.download = filename;
            link.click();

            // Clean up
            window.URL.revokeObjectURL(link.href);
        })
        .catch((error) => {
            console.error("Failed to download PDF", error);
        });
        // router.get(route('guru.cetak.raport', siswaId));
    }

    return (
        <DashboardLayout auth={auth}>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Cetak Nilai Siswa
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="space-y-2 lg:col-start-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <ScrollText className="h-4 w-4 text-gray-500" />
                                    Kelas
                                </label>
                                <Select
                                    name="kelas_id"
                                    value={queryParams?.kelas_id}
                                    onValueChange={(value) =>
                                        searchFieldChanged("kelas_id", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Filter kelas" />
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
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <ChartColumnStacked className="h-4 w-4 text-gray-500" />
                                    Nama Siswa
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Nama Siswa"
                                        name="nama_lengkap"
                                        value={queryParams?.nama_lengkap}
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "nama_lengkap",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={handleResetFilters}
                                            variant="outline"
                                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-gray-200"
                                        >
                                            <RotateCcw className="h-4 w-4" />
                                            Reset Filter
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {queryParams.kelas_id ? (
                            <>
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
                                                    <TableHead className="font-semibold text-center">
                                                        Kelas
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
                                                    <TableHead className="font-semibold text-center">
                                                        Cetak
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {siswaDenganNilai.map(
                                                    (item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="text-center">
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                {
                                                                    item.nama_lengkap
                                                                }
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                {item.kelas}
                                                            </TableCell>
                                                            {Object.entries(
                                                                item.mata_pelajaran
                                                            ).map(
                                                                ([
                                                                    mapel,
                                                                    nilai,
                                                                ]) => (
                                                                    <TableCell
                                                                        key={
                                                                            mapel
                                                                        }
                                                                        className="text-center"
                                                                    >
                                                                        {nilai}
                                                                    </TableCell>
                                                                )
                                                            )}
                                                            <TableCell className="text-center">
                                                                {item.rata_rata.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                {item.ranking}
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Button size="sm" className="flex items-center gap-2" onClick={() => handleCetakRaport(item.siswa_id)}><Printer className="h-4 w-4" /><span>Cetak</span></Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <GraduationCap className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    Gunakan filter di atas untuk menampilkan
                                    data nilai siswa
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
