import db from "../config/db";

export interface Notification {
    id?: number;
    message: string;
    created_at?: string;
}

const createNotification = (message: string) => {
    const stmt = db.prepare("INSERT INTO notifications (message) VALUES (?)");
    return stmt.run(message);
};

const deleteNotification = (id: number) => {
    const stmt = db.prepare("DELETE FROM notifications WHERE id = ?");
    return stmt.run(id);
};

const getNotifications = (skip: number, limit: number) => {
    const stmt = db.prepare(
        "SELECT * FROM notifications ORDER BY created_at DESC LIMIT ? OFFSET ?"
    );
    return stmt.all(limit, skip);
};

export const notificationOps = {
    createNotification,
    deleteNotification,
    getNotifications,
};
