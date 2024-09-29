import FooterLandingPage from "@/Components/LandingPage/Footer";
import HeaderLandingPage from "@/Components/LandingPage/Header";
import React from "react";
import { motion } from "framer-motion";
import {
    Monitor,
    BookOpen,
    Dumbbell,
    Briefcase,
    FlaskConical,
    Hammer,
} from "lucide-react";

const Fasilitas = () => {
    const facilities = [
        {
            Icon: <Monitor className="w-12 h-12 text-blue-500 mb-4" />,
            name: "Laboratorium Komputer",
            description:
                "Dilengkapi dengan komputer terbaru dan software industri",
            image: "assets/galeri1.jpg",
        },
        {
            Icon: <Hammer className="w-12 h-12 text-blue-500 mb-4" />,
            name: "Bengkel Praktik",
            description: "Peralatan lengkap untuk praktik kejuruan",
            image: "assets/galeri2.jpg",
        },
        {
            Icon: <BookOpen className="w-12 h-12 text-blue-500 mb-4" />,
            name: "Perpustakaan Digital",
            description: "Ribuan buku dan akses ke sumber belajar online",
            image: "assets/galeri3.jpg",
        },
        {
            Icon: <Dumbbell className="w-12 h-12 text-blue-500 mb-4" />,
            name: "Fasilitas Olahraga",
            description: "Lapangan multifungsi dan peralatan olahraga modern",
            image: "assets/galeri4.jpg",
        },
        {
            Icon: <FlaskConical className="w-12 h-12 text-blue-500 mb-4" />,
            name: "Laboratorium Sains",
            description: "Peralatan canggih untuk eksperimen ilmiah",
            image: "assets/galeri5.jpg",
        },
        {
            Icon: <Briefcase className="w-12 h-12 text-blue-500 mb-4" />,
            name: "Ruang Simulasi Kerja",
            description: "Lingkungan kerja tiruan untuk persiapan karir",
            image: "assets/galeri6.jpg",
        },
    ];
    return (
        <div>
            <HeaderLandingPage />
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        Fasilitas Unggulan
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((facility, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                            >
                                <img
                                    src={facility.image}
                                    alt={facility.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    {facility.Icon}
                                    <h3 className="text-xl font-semibold mb-2">
                                        {facility.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {facility.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <FooterLandingPage />
        </div>
    );
};

export default Fasilitas;
