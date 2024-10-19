import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { columns } from "./Column";
import { Card, CardContent } from "@/Components/ui/card";
import { BookOpen, ClipboardCheck, ScrollText, Users } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";



const Index = ({ auth, penugasan, guru, kelas, queryParams = null, mataPelajaran }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("staff.penugasan.index"), queryParams);
    };

    const handleReset = () => {
        router.get(route("staff.penugasan.index"));
    };
    return (
        <DashboardLayout auth={auth}>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg shadow-lg">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <ClipboardCheck className="h-6 w-6" />
                            Penugasan Guru List
                        </h1>
                        <p className="text-blue-100">Manage teacher assignments data</p>
                    </div>
                    <Link href={route("staff.penugasan.create")}>
                        <Button className="bg-white text-blue-600 hover:bg-blue-50">
                            Add Data
                        </Button>
                    </Link>
                </div>

                {/* Filter Section */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2 lg:col-start-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <ScrollText className="h-4 w-4 text-gray-500" />
                                    Kelas
                                </label>
                                <Select
                                    name="kelas_id"
                                    value={queryParams?.kelas_id}
                                    onValueChange={(value) => searchFieldChanged("kelas_id", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Filter kelas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {kelas.data.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
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
                                    onValueChange={(value) => searchFieldChanged("mata_pelajaran_id", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Filter mata pelajaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {mataPelajaran.data.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.nama_mata_pelajaran}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    Guru
                                </label>
                                <div className="flex gap-2">
                                    <Select
                                        name="guru_id"
                                        value={queryParams?.guru_id}
                                        onValueChange={(value) => searchFieldChanged("guru_id", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Filter guru" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {guru.data.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>
                                                        {item.nama_lengkap}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline" onClick={handleReset}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardContent className="pt-6">
                        <Datatable columns={columns} data={penugasan.data} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
