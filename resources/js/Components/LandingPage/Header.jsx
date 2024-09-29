import { Link } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";

const HeaderLandingPage = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="container py-4 flex justify-between items-center shadow-sm">
            <h1>Nama/Logo</h1>
            {/* Dekstop */}
            <div className="hidden md:block">
                <ul className="flex items-center gap-6">
                    <li>
                        <Link
                            href={route("home")}
                            className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-primary transition-all duration-300 font-semibold"
                        >
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("fasilitas")}
                            className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-primary transition-all duration-300 font-semibold"
                        >
                            Fasilitas
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile */}
            <div className="lg:hidden md:hidden">
                <Menu
                    className="w-5 cursor-pointer"
                    onClick={() => setVisible(true)}
                />
                <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <h1 className="text-center">Nama/Logo</h1>
                    <ul className="flex flex-col gap-2 justify-center items-center mt-5">
                        <li>
                            <Link
                                href={route("home")}
                                className="inline-block text-gray-600 text-xl py-1 px-2 xl:px-3 hover:text-primary transition-all duration-300 font-semibold"
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("fasilitas")}
                                className="inline-block text-gray-600 text-xl py-1 px-2 xl:px-3 hover:text-primary transition-all duration-300 font-semibold"
                            >
                                Fasilitas
                            </Link>
                        </li>
                    </ul>
                </Sidebar>
            </div>
        </div>
    );
};

export default HeaderLandingPage;
