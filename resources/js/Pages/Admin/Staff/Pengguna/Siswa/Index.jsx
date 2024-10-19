import DashboardLayout from "@/Components/Admin/Layout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import Datatable from "@/Components/Common/Datatable";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { columns } from "./Column";
import { Card, CardContent } from "@/Components/ui/card";
import { GraduationCap, ScrollText, Search, Users2 } from "lucide-react";

const Index = ({ auth, siswa, kelas, jurusan, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("staff.siswa.index"), queryParams);
    };

    const handleReset = () => {
        router.get(route("staff.siswa.index"));
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg shadow-lg">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Users2 className="h-6 w-6" />
                            Siswa List
                        </h1>
                        <p className="text-blue-100">
                            Manage and view all student data
                        </p>
                    </div>
                </div>

                {/* Filter Section */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2 lg:col-start-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-gray-500" />
                                    Jurusan
                                </label>
                                <Select
                                    name="jurusan_id"
                                    value={queryParams?.jurusan_id}
                                    onValueChange={(value) =>
                                        searchFieldChanged("jurusan_id", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Filter jurusan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {jurusan.data.map((item) => {
                                                return (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}
                                                    >
                                                        {item.nama_jurusan}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
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
                                            {kelas.data.map((item) => {
                                                return (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}
                                                    >
                                                        {item.nama_kelas}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Search className="h-4 w-4 text-gray-500" />
                                    Search
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        className="w-full"
                                        value={queryParams?.namaLengkap}
                                        placeholder="Filter Nama Lengkap"
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "namaLengkap",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={handleReset}
                                    >
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
                        <Datatable columns={columns} data={siswa.data} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
