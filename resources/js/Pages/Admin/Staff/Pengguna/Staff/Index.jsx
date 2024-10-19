import DashboardLayout from "@/Components/Admin/Layout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import SelectInput from "@/Components/Common/SelectInput";
import Datatable from "@/Components/Common/Datatable";
import { columns } from "./Column";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { BadgeCheck, Calendar, Search, UserRoundCog } from "lucide-react";

const Index = ({ auth, staff, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("staff.staff.index"), queryParams);
    };
    const handleReset = () => {
        router.get(route("staff.staff.index"));
    };
    return (
        <DashboardLayout auth={auth}>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-lg shadow-lg">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <UserRoundCog className="h-6 w-6" />
                            Staff List
                        </h1>
                        <p className="text-blue-100">
                            Manage and view all staff data
                        </p>
                    </div>
                    <Link href={route("staff.staff.create")}>
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
                                    <BadgeCheck className="h-4 w-4 text-gray-500" />
                                    Status
                                </label>
                                <Select
                                    name="status"
                                    value={queryParams?.status}
                                    onValueChange={(value) =>
                                        searchFieldChanged("status", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Filter status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">
                                                Active
                                            </SelectItem>
                                            <SelectItem value="0">
                                                Inactive
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    Join date
                                </label>
                                <Input
                                    type="date"
                                    className="w-full"
                                    value={queryParams?.joinDate}
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "joinDate",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Search className="h-4 w-4 text-gray-500" />
                                    Search
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
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
                        <Datatable columns={columns} data={staff.data} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Index;
