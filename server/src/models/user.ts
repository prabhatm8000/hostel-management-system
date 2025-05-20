import bcrypt from "bcrypt";
import db from "../config/db";

export interface User {
    id?: number;
    username: string;
    password: string;
    role: "admin" | "student";
}

const createUser = (user: User) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const stmt = db.prepare(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)"
    );
    const info = stmt.run(user.username, hashedPassword, user.role);
    return info.lastInsertRowid;
};

const getUserByUsername = (username: string) => {
    return db.prepare("SELECT * FROM users WHERE username = ?").get(username);
};

const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
};

export const deleteUser = (id: number) => {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    return stmt.run(id);
};

export const userOps = {
    deleteUser,
    createUser,
    getUserByUsername,
    comparePassword,
};
