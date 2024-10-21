import DashboardLayout from "@/Components/Admin/Layout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
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
    GraduationCap,
    RotateCcw,
    Save,
    ScrollText,
    TrendingUp,
    User,
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
                {queryParams.kelas_id &&
                    queryParams.mata_pelajaran_id &&
                    queryParams.jenis_penilaian_id && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <Card className="bg-white">
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <User className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-500">
                                                Guru Pengajar
                                            </p>
                                            <p className="text-base font-semibold">
                                                {auth.user.name}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white">
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-purple-50 rounded-lg">
                                            <GraduationCap className="h-5 w-5 text-purple-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-500">
                                                Kelas
                                            </p>
                                            <p className="text-base font-semibold">
                                                {getNamaKelas(
                                                    queryParams.kelas_id
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white">
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-green-50 rounded-lg">
                                            <BookOpen className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-500">
                                                Mata Pelajaran
                                            </p>
                                            <div className="space-y-1">
                                                <p className="text-base font-semibold">
                                                    {
                                                        mapel.data.find(
                                                            (m) =>
                                                                m.id.toString() ===
                                                                queryParams.mata_pelajaran_id
                                                        )?.nama_mata_pelajaran
                                                    }
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    KKM:{" "}
                                                    {getMapelKKM(
                                                        queryParams.mata_pelajaran_id
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white">
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-amber-50 rounded-lg">
                                            <ChartColumnStacked className="h-5 w-5 text-amber-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-500">
                                                Jenis Penilaian
                                            </p>
                                            <p className="text-base font-semibold">
                                                {
                                                    jenisPenilaian.data.find(
                                                        (jp) =>
                                                            jp.id.toString() ===
                                                            queryParams.jenis_penilaian_id
                                                    )?.deskripsi
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                <Card>
                    <CardHeader>
                        <CardTitle>Input Nilai Siswa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

                        {queryParams.kelas_id &&
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
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
