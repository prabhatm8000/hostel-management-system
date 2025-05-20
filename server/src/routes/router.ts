import { Router, type Request, type Response } from "express";
import notificationRoutes from "./notification";
import roomRoutes from "./room";
import studentRoutes from "./student";
import userRoutes from "./user";
import { getDashboard } from "../controllers/dashboard";
import auth from "../middlewares/auth";

const router = Router();

router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/rooms", roomRoutes);
router.use("/notifications", notificationRoutes);
router.get("/dashboard", auth.authAdminOnly, getDashboard);
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "API is working!",
        data: null,
    });
});

export default router;
