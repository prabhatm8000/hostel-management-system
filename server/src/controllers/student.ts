import { Request, Response } from "express";
import db from "../config/db";
import { studentOps } from "../models/student";
import { userOps } from "../models/user";
import { dashboardOps } from "../models/dashboard";

export const createStudent = (req: Request, res: Response) => {
    try {
        const { name, email, rollNumber, roomNumber, course, year } = req.body;

        // 1. Insert into users
        const userId = Number(
            userOps.createUser({
                username: email,
                password: rollNumber + course,
                role: "student",
            })
        );

        // 2. Insert into students
        const studentId = studentOps.createStudent({
            userId,
            name,
            email,
            rollNumber,
            roomNumber,
            course,
            year,
        });
        dashboardOps.incrementStudentCount();

        res.status(201).json({
            message: "Student created successfully",
            data: {
                id: studentId,
                userId,
                name,
                email,
                rollNumber,
                roomNumber,
                course,
                year,
            },
            success: true,
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message, success: false });
    }
};

export const getAllStudents = (req: Request, res: Response) => {
    try {
        const students = studentOps.getAllStudents();
        res.status(200).json({
            success: true,
            data: students,
            message: "",
        });
    } catch (err: any) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

export const getStudentById = (req: Request, res: Response) => {
    try {
        let id = req.params.id ? Number(req.params.id) : undefined;
        if (req.user?.role === "student") {
            id = req.user.id;
        }

        const student = studentOps.getStudentById(Number(id));
        if (!student) {
            res.status(404).json({
                success: false,
                message: "Student not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: student,
            message: "",
        });
    } catch (err: any) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

export const updateStudent = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, rollNumber, roomNumber, course, year } = req.body;

        const student = studentOps.getStudentById(Number(id));
        if (!student || typeof student !== "object") {
            res.status(404).json({
                success: false,
                message: "Student not found",
            });
            return;
        }

        // Update user info if needed
        if ((name || email) && "userId" in student && "email" in student) {
            db.prepare("UPDATE users SET username = ? WHERE id = ?").run(
                email || student.email,
                student.userId
            );
        }

        studentOps.updateStudent(Number(id), {
            name,
            email,
            rollNumber,
            roomNumber,
            course,
            year,
        });

        res.json({
            message: "Student updated successfully",
            success: true,
            data: {
                id: Number(id),
                userId: "userId" in student ? student.userId : undefined,
                name,
                email,
                rollNumber,
                roomNumber,
                course,
                year,
            },
        });
    } catch (err: any) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

export const deleteStudent = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const student = studentOps.getStudentById(Number(id));
        if (!student || typeof student !== "object" || !("userId" in student)) {
            res.status(404).json({
                message: "Student not found",
                success: false,
            });
            return;
        }

        // Delete student record
        studentOps.deleteStudent(Number(id));
        dashboardOps.decrementStudentCount();

        // Delete user associated with the student
        userOps.deleteUser(Number(student.userId));

        res.json({ message: "Student and associated user deleted successfully", success: true });
    } catch (err: any) {
        console.log(err);

        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

export const getStudentRoom = (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const student = studentOps.getStudentById(Number(studentId));
        if (
            !student ||
            typeof student !== "object" ||
            !("roomNumber" in student) ||
            !student.roomNumber
        ) {
            res.status(404).json({ error: "Room not found for student" });
            return;
        }
        const result = db
            .prepare("SELECT * FROM rooms WHERE room_no = ?")
            .get(student.roomNumber);
        if (!result) {
            res.status(404).json({ error: "Room not found for student" });
            return;
        }

        res.json(result);
    } catch (err: any) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};
