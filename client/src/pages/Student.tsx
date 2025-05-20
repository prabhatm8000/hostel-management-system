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
    createStudent,
    deleteStudent,
    getAllStudents,
    updateStudent,
} from "../apiClient";
import { useStudentStore } from "../store/store";

export default function Student() {
    const students = useStudentStore((s) => s.students);
    const updatedStudentStore = useStudentStore((s) => s.updateStudent);
    const addStudent = useStudentStore((s) => s.addStudent);
    const removeStudent = useStudentStore((s) => s.removeStudent);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [form, setForm] = useState({
        id: undefined,
        name: "",
        email: "",
        rollNumber: "",
        roomNumber: "",
        course: "",
        year: "",
    });

    useEffect(() => {
        getAllStudents();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if ("id" in form && form.id) {
            const res = await updateStudent(form.id, form);
            if (res?.data?.success) {
                updatedStudentStore(res.data?.data);
            }
        } else {
            const res = await createStudent(form);
            if (res?.data?.success) {
                addStudent(res.data?.data);
                setForm({
                    id: undefined,
                    name: "",
                    email: "",
                    rollNumber: "",
                    roomNumber: "",
                    course: "",
                    year: "",
                });
            }
        }
        setDialogOpen(false);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        const res = await deleteStudent(id);
        if (res?.data?.success) removeStudent(id);
    };

    const handleUpdate = async (data: any) => {
        setForm(data);
        setDialogOpen(true);
    };
    
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl py-10">Students</h2>
            <div className="flex justify-end">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setDialogOpen(true)}
                            variant="outline"
                        >
                            Add Student
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Student</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new student.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <Input
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="rollNumber"
                                placeholder="Roll Number"
                                value={form.rollNumber}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="roomNumber"
                                placeholder="Room Number"
                                value={form.roomNumber}
                                onChange={handleChange}
                            />
                            <Input
                                name="course"
                                placeholder="Course"
                                value={form.course}
                                onChange={handleChange}
                            />
                            <Input
                                name="year"
                                placeholder="Year"
                                value={form.year}
                                onChange={handleChange}
                            />
                            <Button type="submit">Save</Button>
                        </form>
                        <DialogFooter>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="px-4">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Roll</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((s, i) => (
                            <TableRow key={i}>
                                <TableCell>{s.name}</TableCell>
                                <TableCell>{s.email}</TableCell>
                                <TableCell>{s.rollNumber}</TableCell>
                                <TableCell>{s.roomNumber || "-"}</TableCell>
                                <TableCell>{s.course || "-"}</TableCell>
                                <TableCell>{s.year || "-"}</TableCell>
                                <TableCell className="flex gap-2 items-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleUpdate(s)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(s.id)}
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
}
