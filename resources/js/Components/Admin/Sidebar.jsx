import {
    ChevronDown,
    GraduationCap,
    HandCoins,
    LayoutDashboard,
    Settings2,
    UserPlus,
    UsersRound,
} from "lucide-react";
import React, { useState } from "react";

const MenuSiswa = [
    {
        id: "dashboard.page",
        label: "Dashboard Siswa",
        path: route("dashboard.page"),
        icon: <LayoutDashboard className="w-5" />,
    },
];

const MenuStaff = [
    {
        id: "dashboard.page",
        label: "Dashboard Staff",
        path: route("dashboard.page"),
        icon: <LayoutDashboard className="w-5" />,
    },
    {
        id: "akademik",
        label: "Akademik",
        icon: <GraduationCap className="w-5" />,
        children: [
            {
                id: "staff.jurusan.index",
                label: "Jurusan",
                path: route("staff.jurusan.index"),
            },
            {
                id: "staff.kelas.index",
                label: "Kelas",
                path: route("staff.kelas.index"),
            },
            {
                id: "staff.mapel.index",
                label: "Mata Pelajaran",
                path: route("staff.mapel.index"),
            },
            {
                id: "staff.mapel.index",
                label: "Penugasan Guru",
                path: route("staff.mapel.index"),
            },
        ],
    },
    {
        id: "pengguna",
        label: "Pengguna",
        icon: <UsersRound className="w-5" />,
        children: [
            {
                id: "staff.siswa.index",
                label: "Siswa",
                path: route("staff.siswa.index"),
            },
            {
                id: "staff.guru.index",
                label: "Guru",
                path: route("staff.guru.index"),
            },
            {
                id: "staff.staff.index",
                label: "Staff",
                path: route("staff.staff.index"),
            },
        ],
    },
    {
        id: "manajemen-siswa",
        label: "Manajemen Siswa",
        icon: <UserPlus className="w-5" />,
        children: [
            {
                id: "staff.pendaftaran.list",
                label: "Pendaftaran Siswa",
                path: route("staff.pendaftaran.list"),
            },
            {
                id: "dashboard.page",
                label: "Pembayaran SPP",
                path: route("dashboard.page"),
            },
        ],
    },
    {
        id: "pengaturan",
        label: "Pengaturan",
        icon: <Settings2 className="w-5" />,
        children: [
            {
                id: "staff.tahun-ajaran.index",
                label: "Tahun Ajaran",
                path: route("staff.tahun-ajaran.index"),
            },
            {
                id: "staff.tahun-ajaran.index",
                label: "Informasi Sekolah",
                path: route("staff.tahun-ajaran.index"),
            },
        ],
    },
];

const MenuGuru = [
    {
        id: "dashboard.page",
        label: "Dashboard Guru",
        path: route("dashboard.page"),
        icon: <LayoutDashboard className="w-5" />,
    },
];

const isActiveMenuItem = (menuItem) => {
    if (menuItem.path && route().current() === menuItem.id) {
        return true;
    }

    return false;
};

export function MenuItems({ setOpen, role }) {
    const [openMenu, setOpenMenu] = useState(null);
    const toggleMenu = (id) => {
        setOpenMenu(openMenu === id ? null : id);
    };
    const getMenuByRole = () => {
        switch (role) {
            case "siswa":
                return MenuSiswa;
            case "staff":
                return MenuStaff;
            case "guru":
                return MenuGuru;
            default:
                return [];
        }
    };
    return (
        <nav className="mt-8 flex-col flex gap-1">
            {getMenuByRole().map((menuItem) => {
                const isActive =
                    isActiveMenuItem(menuItem) ||
                    (menuItem.children &&
                        menuItem.children.some(
                            (child) => route().current() === child.id
                        )); // Memeriksa apakah menu item induk aktif atau salah satu anaknya aktif
                return (
                    <div
                        key={menuItem.id}
                        className={`${
                            isActive
                                ? " rounded-lg bg-primary/20 border text-primary/90 border-primary/30"
                                : ""
                        }`}
                    >
                        <div
                            onClick={() => {
                                if (menuItem.children) {
                                    toggleMenu(menuItem.id);
                                } else {
                                    window.location.href = menuItem.path;
                                    setOpen && setOpen(false); // Menggunakan && untuk memeriksa setOpen
                                }
                            }}
                            className="flex cursor-pointer text-sm font-poppins items-center justify-between rounded-md font-semibold px-3 py-2"
                        >
                            <div className="flex items-center gap-4">
                                {menuItem.icon}
                                <span>{menuItem.label}</span>
                            </div>
                            {menuItem.children && (
                                <ChevronDown
                                    className={`w-5 transform transition-transform ${
                                        openMenu === menuItem.id
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            )}
                        </div>
                        {menuItem.children && openMenu === menuItem.id && (
                            <div className="ml-8 mt-1 flex flex-col gap-1">
                                {menuItem.children.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            window.location.href = item.path;
                                            setOpen && setOpen(false);
                                        }}
                                        className="cursor-pointer text-sm font-poppins px-3 py-1 rounded-md font-semibold"
                                    >
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

const DashboardSidebar = ({ user, setOpen }) => {
    return (
        <>
            <aside className="hidden w-64 flex-col border-r bg-background py-6 px-4 lg:flex">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-md font-extrabold font-poppins">
                            Shopease
                        </h1>
                    </div>
                </div>
                <MenuItems setOpen={setOpen} role={user.role} />
            </aside>
        </>
    );
};

export default DashboardSidebar;
