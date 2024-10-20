import DashboardLayout from "@/Components/Admin/Layout";
import Datatable from "@/Components/Common/Datatable";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { columns } from "./Column";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { ChartColumnStacked, Search } from "lucide-react";
import { Input } from "@/Components/ui/input";

const Index = ({ auth, jenisPenilaian, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("staff.jenis-penilaian.index"), queryParams);
    };

    const handleReset = () => {
        router.get(route("staff.jenis-penilaian.index"));
    };
    return (
        <DashboardLayout auth={auth}>
             <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg shadow-lg">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <ChartColumnStacked className="h-6 w-6" />
                            Kategori Nilai List
                        </h1>
                        <p className="text-blue-100">Manage and view all category score data</p>
                    </div>
                    <Link href={route("staff.jenis-penilaian.create")}>
                        <Button className="bg-white text-blue-600 hover:bg-blue-50">
                            Add Data
                        </Button>
                    </Link>
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
                                        value={queryParams?.namaJenisPenilaian}
                                        placeholder="Filter Kategori Nilai"
                                        onBlur={(e) => searchFieldChanged("namaJenisPenilaian", e.target.value)}
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
                        <Datatable columns={columns} data={jenisPenilaian.data} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
