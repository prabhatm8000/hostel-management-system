import { create } from "zustand";

// User interface (reference from server model)
type User = {
    id: number;
    username: string;
    role: string; // 'admin' | 'student'
};

// Student interface (reference from server model)
type Student = {
    id?: number;
    userId: number;
    name: string;
    email: string;
    rollNumber: string;
    roomNumber?: string;
    course?: string;
    year?: number;
};

// Room interface (reference from server model)
type Room = {
    id?: number;
    room_no: string;
    capacity: number;
    occupied: number;
};

// Notification interface (reference from server model)
type Notification = {
    id?: number;
    message: string;
    created_at?: string;
};

// User Store
interface UserStore {
    isAuth: boolean;
    user: User | null;
    token: string | null;
    student: Student | null;
    login: (data: { user: User; token: string; student: Student }) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    isAuth: false,
    user: null,
    token: null,
    student: null,
    login: ({ user, token, student }) =>
        set({ user, token, student, isAuth: true }),
    logout: () =>
        set({ user: null, token: null, student: null, isAuth: false }),
}));

// Student Store
interface StudentStore {
    students: Student[];
    setStudents: (students: Student[]) => void;
    addStudent: (student: Student) => void;
    updateStudent: (student: Student) => void;
    removeStudent: (id: number) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
    students: [],
    setStudents: (students) => set({ students }),
    addStudent: (student) =>
        set((state) => ({ students: [...state.students, student] })),
    updateStudent: (student) =>
        set((state) => ({
            students: state.students.map((s) =>
                s.id === student.id ? student : s
            ),
        })),
    removeStudent: (id) =>
        set((state) => ({
            students: state.students.filter((s) => s.id !== id),
        })),
}));

// Room Store
interface RoomStore {
    rooms: Room[];
    setRooms: (rooms: Room[]) => void;
    addRoom: (room: Room) => void;
    updateRoom: (room: Room) => void;
    removeRoom: (id: number) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
    updateRoom: (room) =>
        set((state) => ({
            rooms: state.rooms.map((r) => (r.id === room.id ? room : r)),
        })),
    removeRoom: (id) =>
        set((state) => ({ rooms: state.rooms.filter((r) => r.id !== id) })),
}));

// Notification Store
interface NotificationStore {
    notifications: Notification[];
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
    removeNotification: (id: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    setNotifications: (notifications) => set({ notifications }),
    addNotification: (notification) =>
        set((state) => ({
            notifications: [notification, ...state.notifications],
        })),
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
}));
