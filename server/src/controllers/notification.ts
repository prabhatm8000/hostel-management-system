import { Request, Response } from 'express';
import { notificationOps } from '../models/notification';

export const createNotification = (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        if (!message) {
            res.status(400).json({ success: false, data: null, message: 'Message is required' });
            return;
        }
        const result = notificationOps.createNotification(message);
        res.status(201).json({
            success: true,
            data: { id: result.lastInsertRowid, created_at: new Date().toISOString().replace('T', ' ').split('.')[0], message, },
            message: 'Notification created successfully',
        });
        return;
    } catch (err: any) {
        res.status(500).json({ success: false, data: null, message: err.message });
        return;
    }
};

export const deleteNotification = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = notificationOps.deleteNotification(Number(id));
        if (result.changes === 0) {
            res.status(404).json({ success: false, data: null, message: 'Notification not found' });
            return;
        }
        res.status(200).json({
            success: true,
            data: null,
            message: 'Notification deleted successfully',
        });
        return;
    } catch (err: any) {
        res.status(500).json({ success: false, data: null, message: err.message });
        return;
    }
};

export const getNotifications = (req: Request, res: Response) => {
    try {
        const skip = Number(req.query.skip) || 0;
        const limit = Number(req.query.limit) || 10;
        const notifications = notificationOps.getNotifications(skip, limit);
        res.status(200).json({
            success: true,
            data: notifications,
            message: 'Notifications fetched successfully',
        });
        return;
    } catch (err: any) {
        res.status(500).json({ success: false, data: null, message: err.message });
        return;
    }
};
