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



const Index = ({ auth, guru, jurusan, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("staff.guru.index"), queryParams);
    };

    const handleReset = () => {
        router.get(route("staff.guru.index"));
    };

    return (
        <DashboardLayout auth={auth}>
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Guru List</h1>
                <Link
                    className="bg-primary text-white text-sm px-3 py-2 font-semibold rounded-lg hover:bg-primary/90"
                    href={route("staff.guru.create")}
                >
                    Add Data
                </Link>
            </div>
            <div className="mb-5">
                <div className="flex justify-end gap-2 items-center">
                    <Select
                        name="jurusan_id"
                        value={queryParams?.jurusan_id}
                        onValueChange={(value) =>
                            searchFieldChanged("jurusan_id", value)
                        }
                    >
                        <SelectTrigger className="w-[200px]">
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
                    <Select
                        name="status"
                        value={queryParams?.status}
                        onValueChange={(value) =>
                            searchFieldChanged("status", value)
                        }
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">Active</SelectItem>
                                <SelectItem value="0">Inactive</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input
                        type="date"
                        className="w-[200px]"
                        value={queryParams?.joinDate}
                        onChange={(e) =>
                            searchFieldChanged("joinDate", e.target.value)
                        }
                    />
                    <Input
                        type="text"
                        className="w-[200px]"
                        value={queryParams?.namaLengkap}
                        placeholder="Filter Nama Lengkap"
                        onChange={(e) =>
                            searchFieldChanged("namaLengkap", e.target.value)
                        }
                    />
                    <Button variant="ghost" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
            <Datatable columns={columns} data={guru.data} />
        </DashboardLayout>
    );
};

export default Index;
