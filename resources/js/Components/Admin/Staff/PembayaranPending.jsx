import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { AlertCircle, Calendar, ChevronRight, Clock, CreditCard, User } from "lucide-react";
import React from "react";

const samplePayments = [
    {
        id: 1,
        student_name: "Ahmad Rizky",
        class_name: "Kelas XI IPA 1",
        amount: 1500000,
        date: "2 November 2024",
        pending_since: "2 jam yang lalu",
        payment_type: "SPP Bulan November",
    },
    {
        id: 2,
        student_name: "Siti Nur Aini",
        class_name: "Kelas X IPS 2",
        amount: 750000,
        date: "1 November 2024",
        pending_since: "1 hari yang lalu",
        payment_type: "Uang Kegiatan",
    },
    {
        id: 3,
        student_name: "Muhammad Farhan",
        class_name: "Kelas XII IPA 3",
        amount: 2000000,
        date: "31 Oktober 2024",
        pending_since: "3 hari yang lalu",
        payment_type: "Pembayaran Praktikum",
    },
];

const PembayaranPending = ({ pembayaran }) => {
    const getStatusBadge = (amount) => {
        return (
            <Badge
                variant="warning"
                className="bg-yellow-50 text-yellow-700 border-yellow-200"
            >
                <AlertCircle size={14} className="mr-1" />
                Pending
            </Badge>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    };
    return (
        <div className="w-full">
            <div className="bg-white rounded-xl shadow-sm p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                        Pembayaran Pending
                    </span>
                </div>

                {/* Notification List */}
                <div className="space-y-3">
                    <div className="space-y-4">
                        {pembayaran.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                Tidak ada pembayaran pending
                            </div>
                        ) : (
                            pembayaran.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <User
                                                    className="text-gray-600"
                                                    size={20}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {payment.siswa.nama_lengkap}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {payment.siswa.kelas.nama_kelas}
                                                </p>
                                            </div>
                                        </div>
                                        {getStatusBadge(payment.jumlah)}
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-3">
                                        <div>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <CreditCard size={14} />
                                                Jumlah Pembayaran
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {formatCurrency(payment.jumlah)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <Calendar size={14} />
                                                Tanggal
                                            </p>
                                            <p className="text-gray-900">
                                                {payment.tanggal_pembayaran}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Deskripsi Pembayaran
                                            </p>
                                            <p className="text-gray-900">
                                                {payment.deskripsi}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Clock size={14} className="mr-1" />
                                            Pending sejak{" "}
                                            {payment.created_at}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PembayaranPending;
