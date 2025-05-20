import { Request, Response } from "express";
import { dashboardOps } from "../models/dashboard";

export const getDashboard = (req: Request, res: Response) => {
    try {
        const dashboard = dashboardOps.getDashboard();
        res.status(200).json({
            success: true,
            data: dashboard,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}; 