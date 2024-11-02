import React, { useState } from "react";
import {
    Mail,
    Clock,
    User,
    GraduationCap,
    Users,
} from "lucide-react";

const SiswaInformasi = ({informasi}) => {
    return (
        <div className="w-full">
            <div className="bg-white rounded-xl shadow-sm p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                        Informasi
                    </span>
                </div>

                {/* Notification List */}
                <div className="space-y-3">
                    {informasi.map((notification) => {

                        return (
                            <div
                                key={notification.id}
                                className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-start gap-3">
                                    <Mail
                                        className="text-green-500 mt-1 flex-shrink-0"
                                        size={20}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-gray-800">
                                                    {notification.user.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center text-gray-400 text-sm">
                                                    <Clock
                                                        size={14}
                                                        className="mr-1"
                                                    />
                                                    {notification.created_at}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            {notification.pesan}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SiswaInformasi;
