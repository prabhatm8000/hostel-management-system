import { toast } from "sonner";
import api from "./lib/axios";
import {
    useNotificationStore,
    useRoomStore,
    useStudentStore,
} from "./store/store";

// --- User/Auth ---
export const login = async (username: string, password: string) => {
    try {
        return await api.post("/users/login", { username, password });
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message || err.message || "Login failed"
        );
        return null;
    }
};

export const verifyUser = async () => {
    try {
        return await api.get("/users/verify");
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message || err.message || "Verification failed"
        );
        return null;
    }
};

// --- Students ---
export const createStudent = async (student: {
    name: string;
    email: string;
    rollNumber: string;
    roomNumber?: string;
    course?: string;
    year?: string;
}) => {
    try {
        return await api.post("/students", student);
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Create student failed"
        );
        return null;
    }
};

export const getAllStudents = async () => {
    try {
        const res = await api.get("/students");
        if (res.data.success) {
            useStudentStore.getState().setStudents(res.data.data);
        }
        return res.data;
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Fetch students failed"
        );
        return null;
    }
};

export const getStudentById = async (id: number) => {
    try {
        return await api.get(`/students/${id}`);
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Fetch student failed"
        );
        return null;
    }
};

export const updateStudent = async (
    id: number,
    student: {
        name?: string;
        email?: string;
        rollNumber?: string;
        roomNumber?: string;
        course?: string;
        year?: string;
    }
) => {
    try {
        return await api.put(`/students/${id}`, student);
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Update student failed"
        );
        return null;
    }
};

export const deleteStudent = async (id: number) => {
    try {
        return await api.delete(`/students/${id}`);
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Delete student failed"
        );
        return null;
    }
};

export const getStudentRoom = async (studentId: number) => {
    try {
        return await api.get(`/students/${studentId}/room`);
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Fetch student room failed"
        );
        return null;
    }
};

// --- Rooms ---
export const createRoom = async (room: {
    room_no: string;
    capacity: number;
    occupied: number;
}) => {
    try {
        const res = await api.post("/rooms", room);
        if (res.data.success) {
            useRoomStore.getState().addRoom(res.data.data);
        }
        return res.data;
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message || err.message || "Create room failed"
        );
        return null;
    }
};

export const getAllRooms = async () => {
    try {
        const res = await api.get("/rooms");
        if (res.data.success) {
            useRoomStore.getState().setRooms(res.data.data);
        }
        return res.data;
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message || err.message || "Fetch rooms failed"
        );
        return null;
    }
};

export const updateRoom = async (
    id: number,
    room: {
        room_no?: string;
        capacity?: number;
        occupied?: number;
    }
) => {
    try {
        const res = await api.put(`/rooms/${id}`, room);
        return res.data;
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message || err.message || "Update room failed"
        );
        return null;
    }
};

export const deleteRoom = async (id: number) => {
    try {
        return await api.delete(`/rooms/${id}`);
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message || err.message || "Delete room failed"
        );
        return null;
    }
};

// --- Notifications ---
export const createNotification = async (message: string) => {
    try {
        const res = await api.post("/notifications", { message });
        if (res.data.success) {
            useNotificationStore.getState().addNotification(res.data.data);
        }
        return res.data;
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Create notification failed"
        );
        return null;
    }
};

export const deleteNotification = async (id: number) => {
    try {
        return await api.delete(`/notifications/${id}`);
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Delete notification failed"
        );
        return null;
    }
};

export const getNotifications = async (skip = 0, limit = 10) => {
    try {
        const res = await api.get("/notifications", {
            params: { skip, limit },
        });
        if (res.data.success) {
            useNotificationStore.getState().setNotifications(res.data.data);
        }
        return res.data;
    } catch (err: any) {
        toast.error(
            err?.response?.data?.message ||
                err.message ||
                "Fetch notifications failed"
        );
        return null;
    }
};

export const getDashboard = async () => {
    try {
        const res = await api.get("/dashboard");
        return res.data;
    } catch (err: any) {
        toast.error(err?.response?.data?.message || err.message || "Fetch dashboard failed");
        return null;
    }
};
