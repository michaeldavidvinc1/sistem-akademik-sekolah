import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { columns } from "./Column";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { BookOpen, ScrollText, Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";

const Index = ({ auth, kelas, jurusan, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("staff.kelas.index"), queryParams);
    };

    const handleReset = () => {
        router.get(route("staff.kelas.index"));
    };
    return (
        <DashboardLayout auth={auth}>
             <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg shadow-lg">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <ScrollText className="h-6 w-6" />
                            Kelas List
                        </h1>
                        <p className="text-blue-100">Manage and view all kelas data</p>
                    </div>
                    <Link href={route("staff.kelas.create")}>
                        <Button className="bg-white text-blue-600 hover:bg-blue-50">
                            Add Data
                        </Button>
                    </Link>
                </div>

                {/* Filter Section */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2 lg:col-start-3">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-gray-500" />
                                    Jurusan
                                </label>
                                <Select
                                    name="jurusan_id"
                                    value={queryParams?.jurusan_id}
                                    onValueChange={(value) => searchFieldChanged("jurusan_id", value)}
                                >
                                    <SelectTrigger className="w-full">
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
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Search className="h-4 w-4 text-gray-500" />
                                    Search
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        value={queryParams?.namaKelas}
                                        placeholder="Filter Nama Kelas"
                                        onBlur={(e) => searchFieldChanged("namaKelas", e.target.value)}
                                    />
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
                        <Datatable columns={columns} data={kelas.data} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
