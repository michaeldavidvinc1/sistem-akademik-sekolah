import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Award, TrendingUp } from "lucide-react";
import React, { useMemo } from "react";

const StatPenilaian = ({ data, kkm }) => {
    const stats = useMemo(() => {
        if (!data?.length) return { average: 0, highest: 0, needAttention: 0 };
        
        // Hitung rata-rata
        const average = data.reduce((acc, curr) => acc + curr.nilai, 0) / data.length;
        
        // Cari nilai tertinggi
        const highest = Math.max(...data.map(item => item.nilai));
        
        // Hitung jumlah siswa di bawah KKM (75)
        const needAttention = data.filter(item => item.nilai < kkm).length;
        
        return {
            average: average.toFixed(1),
            highest,
            needAttention
        };
    }, [data]);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100">Rata-rata Kelas</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.average}</h3>
                        </div>
                        <TrendingUp className="h-10 w-10 text-emerald-100" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-amber-100">Nilai Tertinggi</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.highest}</h3>
                        </div>
                        <Award className="h-10 w-10 text-amber-100" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white lg:col-span-2">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <p className="text-rose-100">Perlu Perhatian</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.needAttention} Siswa</h3>
                            <p className="text-sm text-rose-100 mt-1">
                                Nilai di bawah KKM {kkm}
                            </p>
                        </div>
                        <AlertTriangle className="h-12 w-12 text-rose-100" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StatPenilaian;