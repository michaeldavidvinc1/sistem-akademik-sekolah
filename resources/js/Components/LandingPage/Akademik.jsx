import React from "react";
import { motion } from "framer-motion";

const AkademikLandingPage = () => {
    const programs = [
        {
            title: "Teknik Komputer dan Jaringan (TKJ)",
            description:
                "Mencetak ahli IT yang handal dalam instalasi, pemeliharaan jaringan komputer, dan pengembangan aplikasi.",
            subjects: [
                "Pemrograman dasar dan lanjutan",
                "Administrasi jaringan",
                "Keamanan sistem informasi",
            ],
            image: "assets/tkj.jpg",
        },
        {
            title: "Akuntansi",
            description:
                "Mengembangkan kemampuan dalam pencatatan, pelaporan, dan analisis keuangan untuk berbagai jenis usaha.",
            subjects: [
                "Akuntansi dasar dan lanjutan",
                "Perpajakan",
                "Komputer akuntansi",
            ],
            image: "assets/akuntansi.jpg",
        },
        {
            title: "Administrasi Perkantoran",
            description:
                "Mempersiapkan profesional administrasi yang terampil dalam mengelola kantor modern dan efisien.",
            subjects: [
                "Manajemen perkantoran",
                "Korespondensi bisnis",
                "Teknologi perkantoran",
            ],
            image: "assets/adm.jpg",
        },
        {
            title: "Teknik Kendaraan Ringan",
            description:
                "Membentuk teknisi otomotif yang ahli dalam perawatan, perbaikan, dan modifikasi kendaraan ringan.",
            subjects: [
                "Mesin kendaraan ringan",
                "Sistem kelistrikan otomotif",
                "Perawatan dan perbaikan chassis",
            ],
            image: "assets/tkr.jpg",
        },
    ];
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto">
                <motion.h2
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-center mb-8"
                >
                    Program Keahlian
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-8 py-8"
                >
                    <div className="w-full md:w-1/2 ">
                        <h3 className="text-2xl font-semibold mb-4">
                            Kurikulum Unggulan
                        </h3>
                        <p className="font-semibold">
                            Kurikulum kami dirancang untuk mempersiapkan siswa
                            menghadapi tantangan dunia kerja modern:
                        </p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Perpaduan 60% praktik dan 40% teori</li>
                            <li>Program magang industri selama 3-6 bulan</li>
                            <li>
                                Sertifikasi kompetensi sesuai standar industri
                            </li>
                            <li>Kelas kewirausahaan dan soft skills</li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-semibold mb-4">
                            Fasilitas Pendukung
                        </h3>
                        <p>
                            Kami menyediakan fasilitas modern untuk mendukung
                            pembelajaran optimal:
                        </p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Laboratorium komputer dan jaringan terkini</li>
                            <li>Bengkel praktik otomotif lengkap</li>
                            <li>Ruang simulasi perkantoran modern</li>
                            <li>Perpustakaan digital dan ruang multimedia</li>
                        </ul>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="relative h-48">
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white text-center px-4">
                                        {program.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="mb-4">{program.description}</p>
                                <h4 className="font-semibold mb-2">
                                    Mata Pelajaran Utama:
                                </h4>
                                <ul className="list-disc list-inside">
                                    {program.subjects.map((subject, idx) => (
                                        <li key={idx}>{subject}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AkademikLandingPage;
