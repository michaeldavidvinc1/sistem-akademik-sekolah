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

const Index = ({ auth, siswa, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("siswa.kelas.list"), queryParams);
    };

    const handleReset = () => {
        router.get(route("siswa.kelas.list"));
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg shadow-lg">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Users2 className="h-6 w-6" />
                            Classmates
                        </h1>
                        <p className="text-blue-100">
                        A list of students in the same class
                        </p>
                    </div>
                </div>

                {/* Filter Section */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            <div className="space-y-2 lg:col-start-4">
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
