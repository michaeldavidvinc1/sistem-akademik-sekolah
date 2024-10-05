import { LogOut, PanelRightOpen, Users } from "lucide-react";
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

const DashboardHeader = ({ setOpen, auth }) => {
    const items = [
        {
            label: "Options",
            items: [
                {
                    label: "Profile",
                    icon: <Users className="w-4 mr-3" />,
                    // command: () => console.log("first"),
                },
                {
                    label: "Logout",
                    icon: <LogOut className="w-4 mr-3" />,
                },
            ],
        },
    ];
    return (
        <div>
            <div className="flex items-center lg:justify-end justify-between px-10 py-4 border-b">
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
                                        Shopease
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
                                <AvatarImage src="/no_image.jpg" />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
