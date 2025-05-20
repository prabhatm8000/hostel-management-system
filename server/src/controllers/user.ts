import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envvars } from "../config/constants";
import db from "../config/db";
import { userOps, type User } from "../models/user";

const JWT_SECRET = envvars.JWT_SECRET;

// Create user manually (e.g. admin)
export const createUser = (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }

    try {
        const id = userOps.createUser({ username, password, role });
        res.status(201).json({
            success: true,
            message: "User created",
            data: { userId: id },
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Login (admin or student)
export const loginUser = (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = userOps.getUserByUsername(username) as User;

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        const validPass = userOps.comparePassword(password, user.password);
        if (!validPass) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        const token = jwt.sign({ user }, JWT_SECRET, {
            expiresIn: "2h",
        });

        let student = null;
        if (user.role === "student") {
            const studentStmt = db.prepare(
                "SELECT * FROM students WHERE userId = ?"
            );
            student = studentStmt.get(user.id);
        }

        const userWithoutPassword = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        res.json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: userWithoutPassword,
                student,
            },
        });
    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
};

export const verify = (req: Request, res: Response) => {
    try {
        const { user } = req;
        if (!user) {
            res.json({ success: false, message: "Not authorized" });
            return;
        }

        const userData = userOps.getUserByUsername(user.username) as User;

        const token = jwt.sign({ user: userData }, JWT_SECRET, {
            expiresIn: "2h",
        });

        const userWithoutPassword = {
            id: userData.id,
            username: userData.username,
            role: userData.role,
        };

        let student = null;
        if (user.role === "student") {
            const studentStmt = db.prepare(
                "SELECT * FROM students WHERE userId = ?"
            );
            student = studentStmt.get(user.id);
        }

        res.json({
            success: true,
            data: {
                token,
                user: userWithoutPassword,
                student,
            },
            message: "Logged In",
        });
    } catch (error: any) {
        res.json({ success: false, message: error.message });
    }
};
