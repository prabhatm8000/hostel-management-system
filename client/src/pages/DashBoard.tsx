import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getDashboard } from "../apiClient";
import { useUserStore } from "../store/store";

const DashBoard = () => {
    const isAuth = useUserStore((s) => s.isAuth);
    const user = useUserStore((s) => s.user);
    const student = useUserStore((s) => s.student);
    const logout = useUserStore((s) => s.logout);
    const [dashboard, setDashboard] = useState<{ roomCount: number; studentCount: number } | null>(null);
    useEffect(() => {
        if (user?.role !== "admin") return;
        getDashboard().then((res) => {
            if (res?.success) setDashboard(res.data);
        });
    }, []);
    const handleLogout = () => {
        logout();
        localStorage.clear();
        window.location.reload();
    };
    return (
        <div className="flex flex-col gap-4">
            <div className="text-3xl py-10">Dashboard</div>
            {dashboard && user?.role === "admin" && (
                <Card className="p-4 mb-4">
                    <div className="text-xl font-semibold mb-2">Overview</div>
                    <table className="w-full text-lg">
                        <tbody>
                            <tr>
                                <td className="py-2 pr-4 font-medium">Rooms</td>
                                <td className="py-2">{dashboard.roomCount}</td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 font-medium">Students</td>
                                <td className="py-2">{dashboard.studentCount}</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            )}
            {isAuth && user?.role === "student" && student && (
                <Card className="p-4 mb-4">
                    <div className="text-xl font-semibold mb-2">Student Details</div>
                    <table className="w-full text-lg">
                        <tbody>
                            <tr>
                                <td className="py-2 pr-4 font-medium">Name</td>
                                <td className="py-2">{student.name}</td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 font-medium">Email</td>
                                <td className="py-2">{student.email}</td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 font-medium">Roll Number</td>
                                <td className="py-2">{student.rollNumber}</td>
                            </tr>
                            {student.roomNumber && (
                                <tr>
                                    <td className="py-2 pr-4 font-medium">Room Number</td>
                                    <td className="py-2">{student.roomNumber}</td>
                                </tr>
                            )}
                            {student.course && (
                                <tr>
                                    <td className="py-2 pr-4 font-medium">Course</td>
                                    <td className="py-2">{student.course}</td>
                                </tr>
                            )}
                            {student.year && (
                                <tr>
                                    <td className="py-2 pr-4 font-medium">Year</td>
                                    <td className="py-2">{student.year}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
            )}
            {isAuth && user && (
                <Card className="flex flex-row items-center gap-4 p-4">
                    <Avatar>
                        <AvatarFallback>
                            {user.username?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="font-semibold">{user.username}</div>
                        <div className="text-xs text-muted-foreground">
                            {user.role}
                        </div>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>
                        Logout
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default DashBoard;
