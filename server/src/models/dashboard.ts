import db from "../config/db";

export interface Dashboard {
    id: number;
    roomCount: number;
    studentCount: number;
}

const getDashboard = (): Dashboard => {
    return db.prepare("SELECT * FROM dashboard WHERE id = 1").get() as Dashboard;
};

const incrementRoomCount = () => {
    db.prepare("UPDATE dashboard SET roomCount = roomCount + 1 WHERE id = 1").run();
};

const decrementRoomCount = () => {
    db.prepare("UPDATE dashboard SET roomCount = roomCount - 1 WHERE id = 1 AND roomCount > 0").run();
};

const incrementStudentCount = () => {
    db.prepare("UPDATE dashboard SET studentCount = studentCount + 1 WHERE id = 1").run();
};

const decrementStudentCount = () => {
    db.prepare("UPDATE dashboard SET studentCount = studentCount - 1 WHERE id = 1 AND studentCount > 0").run();
};

export const dashboardOps = {
    getDashboard,
    incrementRoomCount,
    decrementRoomCount,
    incrementStudentCount,
    decrementStudentCount,
}; 