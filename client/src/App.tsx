import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { getStudentById, verifyUser } from "./apiClient";
import Layout from "./layouts/Layout";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Notification from "./pages/Notification";
import Room from "./pages/Room";
import Student from "./pages/Student";
import { useUserStore } from "./store/store";
import { Toaster } from "./components/ui/sonner";

const App = () => {
    const setUser = useUserStore((s) => s.login);
    const isAuth = useUserStore((s) => s.isAuth);
    const user = useUserStore((s) => s.user);
    const [loadingUser, setLoadingUser] = useState<boolean>(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        (async () => {
            const res = await verifyUser();
            if (res?.data?.success) {
                const { user, token: verifiedToken } = res.data.data;
                let student = null;
                if (user.role === "student") {
                    const studentRes = await getStudentById(user.id);
                    student = studentRes?.data?.data || null;
                }
                setUser({ user, token: verifiedToken, student });
                setLoadingUser(false);
            }
        })();
    }, [setUser]);

    return (
        <div>
            <div className="max-w-7xl w-full mx-auto px-6">
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <Layout>
                                    {isAuth ? (
                                        <DashBoard />
                                    ) : (
                                        <Navigate to={"/login"} />
                                    )}
                                </Layout>
                            }
                            path="/"
                        />
                        {isAuth && user?.role === "admin" && (
                            <Route
                                element={
                                    <Layout>
                                        <Student />
                                    </Layout>
                                }
                                path="/students"
                            />
                        )}
                        {isAuth && user?.role === "admin" && (
                            <Route
                                element={
                                    <Layout>
                                        <Room />
                                    </Layout>
                                }
                                path="/rooms"
                            />
                        )}
                        <Route
                            element={
                                <Layout>
                                    {isAuth ? (
                                        <Notification />
                                    ) : (
                                        <Navigate to={"/login"} />
                                    )}
                                </Layout>
                            }
                            path="/notifications"
                        />
                        <Route element={<Login />} path="/login" />
                        <Route
                            element={
                                <Layout>
                                    <h2 className="text-2xl">
                                        Page Not Found!
                                    </h2>
                                </Layout>
                            }
                            path="*"
                        />
                    </Routes>
                </BrowserRouter>
                <Toaster  />
            </div>
        </div>
    );
};

export default App;
