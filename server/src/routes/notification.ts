import { Router } from 'express';
import * as notificationController from '../controllers/notification';
import auth from '../middlewares/auth';

const router = Router();

// Create a notification (admin only)
router.post('/', auth.authAdminOnly, notificationController.createNotification);

// Delete a notification (admin only)
router.delete('/:id', auth.authAdminOnly, notificationController.deleteNotification);

// Get notifications (any authenticated user)
router.get('/', auth.auth, notificationController.getNotifications);

export default router;
