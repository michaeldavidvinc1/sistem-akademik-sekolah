import { LogOut, PanelRightOpen, UserPen, Users } from "lucide-react";
import React, { useRef } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuItems } from "./Sidebar";
import { Link, router } from "@inertiajs/react";

const DashboardHeader = ({ setOpen, auth }) => {
    const handleLogout = () => {
        router.post(route("logout"));
    };
    return (
        <div>
            <div className="flex items-center lg:justify-end justify-between px-14 py-4 border-b">
                <Sheet onOpenChange={() => setOpen(true)}>
                    <SheetTrigger>
                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden sm:block hover:bg-[#E1F2FF] px-3 py-1 rounded-md"
                        >
                            <PanelRightOpen className="w-3" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <h1 className="text-md font-extrabold font-poppins">
                                        Sistem Akademik
                                    </h1>
                                </div>
                            </div>
                            <MenuItems
                                setOpen={setOpen}
                                role={auth.user.role}
                            />
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    href={route("profile.index")}
                                    className="flex items-center gap-2"
                                >
                                    <UserPen className="w-4" /> Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div
                                    className="text-red-500 cursor-pointer flex items-center gap-2"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4" /> Logout
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
