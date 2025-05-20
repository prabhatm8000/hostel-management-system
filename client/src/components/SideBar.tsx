import { useUserStore } from "@/store/store";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineBedroomChild } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const navItems = [
    {
        label: "Dashboard",
        link: "/",
        icon: <RxDashboard className="size-6" />,
    },
    {
        role: "admin",
        label: "Students",
        link: "/students",
        icon: <PiStudentLight className="size-6" />,
    },
    {
        role: "admin",
        label: "Rooms",
        link: "/rooms",
        icon: <MdOutlineBedroomChild className="size-6" />,
    },
    {
        label: "Notifications",
        link: "/notifications",
        icon: <IoMdNotificationsOutline className="size-6" />,
    },
];

const SideBar = () => {
    const user = useUserStore((s) => s.user);
    const navigate = useNavigate();
    return (
        <div className="h-full flex flex-col gap-4">
            <h2 className="text-4xl font-semibold py-6">Hostel Management System</h2>
            <div className="flex flex-col gap-2">
                {navItems
                    .filter((item) => {
                        if (!item.role) return true;
                        if (!user) return false;
                        return user.role === item.role;
                    })
                    .map((item, i) => (
                        <Button
                            key={i}
                            className="text-xl w-full p-2 hover:bg-border gap-3 justify-start"
                            variant={"ghost"}
                            onClick={() => navigate(item.link)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Button>
                    ))}
                {/* <Button onClick={handleLoginLogout}>
                    {isAuth ? "Logout" : "Login"}
                </Button> */}
            </div>
        </div>
    );
};

export default SideBar;
