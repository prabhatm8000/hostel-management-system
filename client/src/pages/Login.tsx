import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getStudentById, login as loginApi } from "../apiClient";
import { useUserStore } from "../store/store";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const setUser = useUserStore((s) => s.login);
    const isAuth = useUserStore((s) => s.isAuth);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await loginApi(username, password);
        if (res?.data?.success) {
            const { user, token } = res.data.data;
            localStorage.setItem("token", token);
            // Optionally fetch student profile if needed
            let student = null;
            if (user.role === "student") {
                const studentRes = await getStudentById(user.id);
                student = studentRes?.data?.data || null;
            }
            setUser({ user, token, student });
            // Optionally redirect here
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/")
        }
    }, [isAuth])

    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
