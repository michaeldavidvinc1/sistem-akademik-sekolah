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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { GraduationCap, School, Users } from "lucide-react";



const Index = ({ auth, siswa, queryParams = null, jurusan, kelas }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("guru.daftar.siswa"), queryParams);
    };

    const handleReset = () => {
        router.get(route("guru.daftar.siswa"));
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Daftar Siswa</h1>
                        <p className="text-gray-500">Kelola dan pantau data siswa dengan mudah</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-gradient-to-br from-blue-50 to-white">
                        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{siswa.data.length || 0}</div>
                            <p className="text-gray-500">Total Siswa</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-white">
                        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                            <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{jurusan.data.length}</div>
                            <p className="text-gray-500">Jurusan</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-white">
                        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                                <School className="h-8 w-8 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kelas.data.length}</div>
                            <p className="text-gray-500">Kelas</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter Data</CardTitle>
                        <CardDescription>
                            Gunakan filter di bawah untuk menyaring data siswa
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Select
                                name="kelas_id"
                                value={queryParams?.kelas_id}
                                onValueChange={(value) => searchFieldChanged("kelas_id", value)}
                            >
                                <SelectTrigger className="w-[200px]">
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

                            <Select
                                name="jurusan_id"
                                value={queryParams?.jurusan_id}
                                onValueChange={(value) => searchFieldChanged("jurusan_id", value)}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Filter jurusan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {jurusan.data.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                {item.nama_jurusan}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Button 
                                variant="outline"
                                onClick={handleReset}
                                className="hover:bg-gray-100"
                            >
                                Reset Filter
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardContent className="pt-6">
                        <Datatable 
                            columns={columns} 
                            data={siswa.data}
                            className="border rounded-lg"
                        />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
