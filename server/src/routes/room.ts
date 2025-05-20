import { Router } from 'express';
import * as roomController from '../controllers/room';
import auth from '../middlewares/auth';

const router = Router();

// Create a room
router.post('/', auth.authAdminOnly, roomController.createRoom);

// Get all rooms
router.get('/', auth.authAdminOnly, roomController.getAllRooms);

// Update a room
router.put('/:id', auth.authAdminOnly, roomController.updateRoom);

// Delete a room
router.delete('/:id', auth.authAdminOnly, roomController.deleteRoom);

export default router;
