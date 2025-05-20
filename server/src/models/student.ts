import db from "../config/db";

export interface Student {
    id?: number;
    userId: number;
    name: string;
    email: string;
    rollNumber: string;
    roomNumber?: string;
    course?: string;
    year?: number;
}

const createStudent = (student: Student) => {
    const stmt = db.prepare(
        "INSERT INTO students (userId, name, email, rollNumber, roomNumber, course, year) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const info = stmt.run(student.userId, student.name, student.email, student.rollNumber, student.roomNumber, student.course, student.year);
    return info.lastInsertRowid;
};

const getAllStudents = () => {
    return db
        .prepare(
            `
    SELECT * FROM students
  `
        )
        .all();
};

const getStudentById = (id: number) => {
    return db
        .prepare(
            `
    SELECT * FROM students WHERE userId = ?
  `
        )
        .get(id);
};

const updateStudent = (id: number, student: Partial<Student>) => {
    const stmt = db.prepare(`
    UPDATE students
    SET userId = COALESCE(?, userId),
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        rollNumber = COALESCE(?, rollNumber),
        roomNumber = COALESCE(?, roomNumber),
        course = COALESCE(?, course),
        year = COALESCE(?, year)
    WHERE id = ?
  `);
    return stmt.run(student.userId, student.name, student.email, student.rollNumber, student.roomNumber, student.course, student.year, id);
};

const deleteStudent = (id: number) => {
    return db.prepare("DELETE FROM students WHERE id = ?").run(id);
};

const getStudentByUserId = (userId: number) => {
    return db.prepare("SELECT * FROM students WHERE userId = ?").get(userId);
};

export const studentOps = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentByUserId,
};
