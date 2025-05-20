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
    createRoom,
    deleteRoom,
    getAllRooms,
    updateRoom,
} from "../apiClient";
import { useRoomStore } from "../store/store";

const Room = () => {
    const rooms = useRoomStore((s) => s.rooms);
    const updatedRoomStore = useRoomStore((s) => s.updateRoom);
    const addRoom = useRoomStore((s) => s.addRoom);
    const removeRoom = useRoomStore((s) => s.removeRoom);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [form, setForm] = useState({
        id: undefined,
        room_no: "",
        capacity: "",
        occupied: "",
    });

    useEffect(() => {
        getAllRooms();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            room_no: form.room_no,
            capacity: Number(form.capacity),
            occupied: Number(form.occupied),
        };
        if (form.id) {
            const res = await updateRoom(form.id, payload);
            if (res?.success) {
                console.log(res.data);
                updatedRoomStore(res?.data);
            }
        } else {
            await createRoom(payload);
        }
        setForm({
            id: undefined,
            room_no: "",
            capacity: "",
            occupied: "",
        });
        setDialogOpen(false);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        const res = await deleteRoom(id);
        if (res?.data?.success) removeRoom(id);
    };

    const handleUpdate = (data: any) => {
        setForm({
            id: data.id,
            room_no: data.room_no,
            capacity: String(data.capacity),
            occupied: String(data.occupied),
        });
        setDialogOpen(true);
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl py-10">Rooms</h2>
            <div className="flex justify-end">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setDialogOpen(true)}
                            variant="outline"
                        >
                            Add Room
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{form.id ? "Update Room" : "Add Room"}</DialogTitle>
                            <DialogDescription>
                                Fill in the details to {form.id ? "update" : "add"} a room.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <Input
                                name="room_no"
                                placeholder="Room Number"
                                value={form.room_no}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="capacity"
                                placeholder="Capacity"
                                type="number"
                                value={form.capacity}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="occupied"
                                placeholder="Occupied"
                                type="number"
                                value={form.occupied}
                                onChange={handleChange}
                                required
                            />
                            <Button type="submit">Save</Button>
                        </form>
                        <DialogFooter></DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Card className="px-4">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Room No</TableHead>
                            <TableHead>Capacity</TableHead>
                            <TableHead>Occupied</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rooms.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell>{r.room_no}</TableCell>
                                <TableCell>{r.capacity}</TableCell>
                                <TableCell>{r.occupied}</TableCell>
                                <TableCell className="flex gap-2 items-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleUpdate(r)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(r.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default Room;
