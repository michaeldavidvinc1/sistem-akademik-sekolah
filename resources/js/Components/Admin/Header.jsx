import { LogOut, PanelRightOpen, Users } from "lucide-react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import React, { useRef } from "react";

const DashboardHeader = ({ setOpen }) => {
    const menuRight = useRef(null);
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
                <button
                    onClick={() => setOpen(true)}
                    className="lg:hidden sm:block hover:bg-[#E1F2FF] px-3 py-1 rounded-md"
                >
                    <PanelRightOpen className="w-3" />
                </button>
                <div>
                    <Avatar
                        image="/no_image.jpg"
                        shape="circle"
                        onClick={(event) => menuRight.current.toggle(event)}
                        aria-controls="popup_menu_right"
                        aria-haspopup
                    />
                    <Menu
                        model={items}
                        popup
                        ref={menuRight}
                        id="popup_menu_right"
                        popupAlignment="right"
                        className="text-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
