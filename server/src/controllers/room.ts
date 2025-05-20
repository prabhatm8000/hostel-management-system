import { Request, Response } from "express";
import { roomOps } from "../models/room";
import { dashboardOps } from "../models/dashboard";

export const createRoom = (req: Request, res: Response) => {
    try {
        const { room_no, capacity, occupied } = req.body;
        const result = roomOps.createRoom({ room_no, capacity, occupied });
        dashboardOps.incrementRoomCount();
        res.status(201).json({
            success: true,
            data: {
                id: result.lastInsertRowid,
                room_no,
                capacity,
                occupied,
            },
            message: "Room created successfully",
        });
        return;
    } catch (err: any) {
        res.status(500).json({
            success: false,
            data: null,
            message: err.message,
        });
        return;
    }
};

export const getAllRooms = (req: Request, res: Response) => {
    try {
        const rooms = roomOps.getAllRooms();
        res.status(200).json({
            success: true,
            data: rooms,
            message: "",
        });
        return;
    } catch (err: any) {
        res.status(500).json({
            success: false,
            data: null,
            message: err.message,
        });
        return;
    }
};

export const updateRoom = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { room_no, capacity, occupied } = req.body;
        const result = roomOps.updateRoom(Number(id), {
            room_no,
            capacity,
            occupied,
        });
        res.status(200).json({
            success: true,
            data: {
                id: result.lastInsertRowid,
                room_no,
                capacity,
                occupied,
            },
            message: "Room updated successfully",
        });
        return;
    } catch (err: any) {
        res.status(500).json({
            success: false,
            data: null,
            message: err.message,
        });
        return;
    }
};

export const deleteRoom = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = roomOps.deleteRoom(Number(id));
        dashboardOps.decrementRoomCount();
        res.status(200).json({
            success: true,
            data: result,
            message: "Room deleted successfully",
        });
        return;
    } catch (err: any) {
        res.status(500).json({
            success: false,
            data: null,
            message: err.message,
        });
        return;
    }
};
