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
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-xl font-semibold">Daftar Siswa</h1>
            </div>
            <div className="mb-5">
                <div className="flex justify-end gap-2 items-center">
                    <Select
                        name="kelas_id"
                        value={queryParams?.kelas_id}
                        onValueChange={(value) =>
                            searchFieldChanged("kelas_id", value)
                        }
                    >
                        <SelectTrigger className="w-[200px]">
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
                    <Button variant="ghost" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
            <Datatable columns={columns} data={siswa.data} />
        </DashboardLayout>
    );
};

export default Index;
