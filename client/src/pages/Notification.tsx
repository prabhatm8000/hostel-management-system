import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
    createNotification,
    deleteNotification,
    getNotifications,
} from "../apiClient";
import { useNotificationStore, useUserStore } from "../store/store";

const Notification = () => {
    const notifications = useNotificationStore((s) => s.notifications);
    const removeNotification = useNotificationStore(
        (s) => s.removeNotification
    );
    const setNotifications = useNotificationStore((s) => s.setNotifications);
    const user = useUserStore((s) => s.user);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [form, setForm] = useState({
        message: "",
    });

    useEffect(() => {
        getNotifications().then((res) => {
            if (res?.success) setNotifications(res.data);
        });
    }, [setNotifications]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await createNotification(form.message);
        if (res?.success) {
            setForm({ message: "" });
        }
        setDialogOpen(false);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        const res = await deleteNotification(id);
        if (res?.data?.success) removeNotification(id);
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl py-10">Notifications</h2>
            {user?.role === "admin" && (
                <div className="flex justify-end">
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => setDialogOpen(true)}
                                variant="outline"
                            >
                                Add Notification
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Notification</DialogTitle>
                                <DialogDescription>
                                    Enter the message to create a new notification.
                                </DialogDescription>
                            </DialogHeader>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <Input
                                    name="message"
                                    placeholder="Message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                                <Button type="submit">Save</Button>
                            </form>
                            <DialogFooter></DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            <Card className="px-4">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                </TableHeader>
                    <TableBody>
                        {notifications.map((n, i) => (
                            <TableRow key={i}>
                                <TableCell>{n.message}</TableCell>
                                <TableCell>
                                    {n.created_at
                                        ? new Date(n.created_at).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
                                        : "-"}
                                </TableCell>
                                <TableCell className="flex gap-2 items-center">
                                    {user?.role === "admin" && (
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(n.id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default Notification;
