import { LayoutDashboard } from "lucide-react";
import { Sidebar } from "primereact/sidebar";
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
];

const MenuGuru = [
    {
        id: "dashboard.page",
        label: "Dashboard Guru",
        path: route("dashboard.page"),
        icon: <LayoutDashboard className="w-5" />,
    },
];

// Fungsi untuk memeriksa apakah item aktif
const isActiveMenuItem = (menuItem) => {
    if (menuItem.path && route().current() === menuItem.id) {
        return true;
    }

    // Cek apakah anak-anak item memiliki route yang sama
    if (menuItem.children) {
        return menuItem.children.some(
            (child) => route().current() === child.id
        );
    }

    return false;
};

function MenuItems({ setOpen, role }) {
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
                return []; // Kembalikan array kosong jika role tidak dikenali
        }
    };
    return (
        <nav className="mt-8 flex-col flex gap-1">
            {getMenuByRole().map((menuItem) => {
                return (
                    <div
                        key={menuItem.id}
                        className={`${
                            isActiveMenuItem(menuItem)
                                ? " rounded-lg bg-primary/30 border border-[#2500c3]/30 text-[#2500c3]/70"
                                : ""
                        }`}
                    >
                        <div
                            onClick={() => {
                                if (menuItem.children) {
                                    toggleMenu(menuItem.id);
                                } else {
                                    window.location.href = menuItem.path;
                                    setOpen ? setOpen(false) : null;
                                }
                            }}
                            className={`${
                                route().current() === menuItem.id
                                    ? "bg-primary/30 border text-[#2500c3]/70"
                                    : ""
                            } flex cursor-pointer text-sm font-poppins items-center justify-between rounded-md font-semibold px-3 py-2 text-[#2500c3]/70 hover:bg-primary/30`}
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
                                            setOpen ? setOpen(false) : null;
                                        }}
                                        className={`cursor-pointer text-sm font-poppins px-3 py-1 rounded-md text-[#2500c3] hover:text-[#2500c3]/70 ${
                                            window.location.href.includes(
                                                item.path
                                            )
                                                ? ""
                                                : ""
                                        }`}
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

const DashboardSidebar = ({ user, open, setOpen }) => {
    return (
        <>
            <Sidebar visible={open} onHide={() => setOpen(false)}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-md font-extrabold font-poppins">
                            Shopease
                        </h1>
                    </div>
                </div>
                <MenuItems setOpen={setOpen} role={user.role} />
            </Sidebar>
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
