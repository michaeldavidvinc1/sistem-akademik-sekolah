import React, { useState } from "react";
import DashboardLayout from "@/Components/Admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/Components/ui/input";
import { ChartColumnStacked, RotateCcw, ScrollText } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { router } from "@inertiajs/react";

const Index = ({ auth, kelas, queryParams = null }) => {
  queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("guru.cetak.nilai"), queryParams);
    };
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
                                    <Input placeholder="Nama Siswa" />
                                    <div className="flex justify-end">
                                        <Button
                                            // onClick={handleResetFilters}
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

                        {/* {queryParams.kelas_id &&
                        queryParams.mata_pelajaran_id &&
                        queryParams.jenis_penilaian_id ? (
                            <>
                                <div className="border rounded-lg overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50">
                                                <TableHead className="w-16">
                                                    No
                                                </TableHead>
                                                <TableHead>
                                                    Nama Siswa
                                                </TableHead>
                                                <TableHead className="w-32 text-center">
                                                    Nilai (0-100)
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {dataPenilaian?.map(
                                                (item, index) => (
                                                    <TableRow
                                                        key={item.siswa.id}
                                                    >
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.siswa.nama}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                value={
                                                                    nilaiInputs[
                                                                        item
                                                                            .siswa
                                                                            .id
                                                                    ] ||
                                                                    item.nilai ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleNilaiChange(
                                                                        item
                                                                            .siswa
                                                                            .id,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="text-center"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end gap-3 mt-4">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2"
                                    >
                                        <Save className="h-4 w-4" />
                                        {isSubmitting
                                            ? "Menyimpan..."
                                            : "Simpan Nilai"}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Pilih kelas, mata pelajaran, dan jenis penilaian
                                untuk menampilkan form input nilai
                            </div>
                        )} */}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
