import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const FooterLandingPage = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-1 sm:col-span-2 lg:col-span-1"
                    >
                        <h3 className="text-xl font-bold mb-4">
                            SMK Negeri XYZ
                        </h3>
                        <p className="mb-4 text-sm">
                            Mendidik generasi masa depan untuk menjadi
                            profesional yang kompeten dan beretika.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="hover:text-blue-400 transition-colors"
                            >
                                <Facebook />
                            </a>
                            <a
                                href="#"
                                className="hover:text-blue-400 transition-colors"
                            >
                                <Twitter />
                            </a>
                            <a
                                href="#"
                                className="hover:text-pink-400 transition-colors"
                            >
                                <Instagram />
                            </a>
                            <a
                                href="#"
                                className="hover:text-red-500 transition-colors"
                            >
                                <Youtube />
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-lg font-semibold mb-4">
                            Program Keahlian
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-gray-300 transition-colors"
                                >
                                    Teknik Komputer dan Jaringan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-gray-300 transition-colors"
                                >
                                    Akuntansi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-gray-300 transition-colors"
                                >
                                    Administrasi Perkantoran
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-gray-300 transition-colors"
                                >
                                    Teknik Kendaraan Ringan
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-lg font-semibold mb-4">
                            Tautan Penting
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-gray-300 transition-colors"
                                >
                                    Tentang Kami
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-gray-300 transition-colors"
                                >
                                    Fasilitas
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-gray-300 transition-colors"
                                >
                                    Prestasi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-gray-300 transition-colors"
                                >
                                    Berita & Acara
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                        <address className="text-sm not-italic">
                            <p className="mb-2">Jl. Pendidikan No. 123</p>
                            <p className="mb-2">Kota XYZ, 12345</p>
                            <p className="mb-2">Telp: (021) 123-4567</p>
                            <p className="mb-2">Email: info@smkxyz.sch.id</p>
                        </address>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 pt-8 border-t border-gray-700 text-center text-sm"
                >
                    <p>
                        &copy; {currentYear} SMK Negeri XYZ. Hak Cipta
                        Dilindungi.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default FooterLandingPage;
