import db from "../config/db";

export interface Room {
    id?: number;
    room_no: string;
    capacity: number;
    occupied: number;
}

const createRoom = (room: Room) => {
    const stmt = db.prepare(
        "INSERT INTO rooms (room_no, capacity, occupied) VALUES (?, ?, ?)"
    );
    return stmt.run(room.room_no, room.capacity, room.occupied);
};

const getAllRooms = () => {
    return db.prepare("SELECT * FROM rooms").all();
};

const updateRoom = (id: number, room: Partial<Room>) => {
    const stmt = db.prepare(`
    UPDATE rooms
    SET room_no = COALESCE(?, room_no),
        capacity = COALESCE(?, capacity),
        occupied = COALESCE(?, occupied)
    WHERE id = ?
  `);
    return stmt.run(room.room_no, room.capacity, room.occupied, id);
};

const deleteRoom = (id: number) => {
    return db.prepare("DELETE FROM rooms WHERE id = ?").run(id);
};

export const roomOps = {
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
};
