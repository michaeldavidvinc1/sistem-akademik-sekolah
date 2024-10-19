import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { columns } from "./Column";
import { GraduationCap, Search, Users } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";

const Index = ({ auth, jurusan, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("staff.jurusan.index"), queryParams);
    };

    const handleReset = () => {
        router.get(route("staff.jurusan.index"));
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="space-y-6">
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg shadow-lg">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <GraduationCap className="h-6 w-6" />
                            Jurusan List
                        </h1>
                        <p className="text-blue-100">
                            Manage and view all jurusan data
                        </p>
                    </div>
                    <Link href={route("staff.jurusan.create")}>
                        <Button className="bg-white text-blue-600 hover:bg-blue-50">
                            Add Data
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Filter Section */}
            <Card className="mt-6">
                <CardContent className="pt-6">
                    <div className="flex justify-end">
                        <div className="w-full max-w-sm space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Search className="h-4 w-4 text-gray-500" />
                                Search
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={queryParams?.namaJurusan}
                                    placeholder="Filter Nama Jurusan"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "namaJurusan",
                                            e.target.value
                                        )
                                    }
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
            <Card className="mt-6">
                <CardContent className="pt-6">
                    <Datatable columns={columns} data={jurusan.data} />
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default Index;
