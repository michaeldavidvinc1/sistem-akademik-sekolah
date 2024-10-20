import StatPenilaian from "@/Components/Admin/Guru/StatPenilaian";
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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";
import {
    AlertTriangle,
    Award,
    Blinds,
    BookOpen,
    ChartColumnStacked,
    RotateCcw,
    Save,
    ScrollText,
    TrendingUp,
} from "lucide-react";
import React, { useState } from "react";

const Index = ({
    auth,
    jenisPenilaian,
    kelas,
    mapel,
    queryParams = null,
    dataPenilaian,
}) => {
    const { toast } = useToast();
    const [nilaiInputs, setNilaiInputs] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("guru.penilaian.index"), queryParams);
    };

    const handleNilaiChange = (siswaId, value) => {
        setNilaiInputs((prev) => ({
            ...prev,
            [siswaId]: value,
        }));
    };

    const handleSubmit = async () => {
        if (
            !queryParams.kelas_id ||
            !queryParams.mata_pelajaran_id ||
            !queryParams.jenis_penilaian_id
        ) {
            alert(
                "Pilih kelas, mata pelajaran, dan jenis penilaian terlebih dahulu"
            );
            return;
        }

        setIsSubmitting(true);

        try {
            await router.post(
                route("guru.penilaian.store"),
                {
                    kelas_id: queryParams.kelas_id,
                    mata_pelajaran_id: queryParams.mata_pelajaran_id,
                    jenis_penilaian_id: queryParams.jenis_penilaian_id,
                    nilai_siswa: Object.entries(nilaiInputs).map(
                        ([siswaId, nilai]) => ({
                            siswa_id: siswaId,
                            nilai: nilai,
                        })
                    ),
                    tanggal_penilaian: new Date().toISOString().split("T")[0],
                },
                {
                    onError: () => {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: "Nilai siswa required",
                        });
                    },
                    onSuccess: () => {
                        toast({
                            variant: "success",
                            title: "Success!",
                            description: "Nilai siswa berhasil di input",
                        });
                    },
                }
            );
        } catch (error) {
            console.error("Error submitting nilai:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getNamaKelas = (kelasId) => {
        const kelasData = kelas.data.find(
            (k) => k.id.toString() === kelasId?.toString()
        );
        return kelasData ? kelasData.nama_kelas : "-";
    };

    const getMapelKKM = (mapelId) => {
        const mapelData = mapel.data.find(
            (m) => m.id.toString() === mapelId?.toString()
        );
        return mapelData ? mapelData.kkm : "0";
    };

    const handleResetFilters = () => {
        // Reset state lokal jika ada
        setNilaiInputs({});
        // Reset query params dan reload halaman
        router.get(route("guru.penilaian.index"), {});
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="space-y-6">
                <StatPenilaian data={dataPenilaian} kkm={getMapelKKM(queryParams.mata_pelajaran_id)} />
                {/* Filter Section */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2 lg:col-start-1">
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
                                    <BookOpen className="h-4 w-4 text-gray-500" />
                                    Mata Pelajaran
                                </label>
                                <Select
                                    name="mata_pelajaran_id"
                                    value={queryParams?.mata_pelajaran_id}
                                    onValueChange={(value) =>
                                        searchFieldChanged(
                                            "mata_pelajaran_id",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Filter mata pelajaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {mapel.data.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={item.id.toString()}
                                                >
                                                    {item.nama_mata_pelajaran}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <ChartColumnStacked className="h-4 w-4 text-gray-500" />
                                    Kategori Nilai
                                </label>
                                <div className="flex gap-2">
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
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Filter kategori nilai" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {jenisPenilaian.data.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}
                                                    >
                                                        {item.deskripsi} (
                                                        {item.kode_jenis_penilaian})
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                    </CardContent>
                </Card>
                {/* Table Section */}
                <Card>
                    <CardContent className="pt-6">
                        {queryParams.kelas_id &&
                        queryParams.mata_pelajaran_id &&
                        queryParams.jenis_penilaian_id ? (
                            <>
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
                                                Nilai
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dataPenilaian?.map((item, index) => (
                                            <TableRow key={item.siswa.id}>
                                                <TableCell className="text-center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {item.siswa.nama}
                                                </TableCell>
                                                <TableCell>
                                                    {getNamaKelas(
                                                        queryParams.kelas_id
                                                    )}
                                                </TableCell>
                                                <TableCell className="w-32">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={
                                                            nilaiInputs[
                                                                item.siswa.id
                                                            ] ||
                                                            item.nilai ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleNilaiChange(
                                                                item.siswa.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="0-100"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div className="mt-4 flex justify-end">
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
                            <div className="py-8 text-center text-gray-500">
                                Pilih kelas, mata pelajaran, dan jenis penilaian
                                untuk menampilkan form input nilai
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
