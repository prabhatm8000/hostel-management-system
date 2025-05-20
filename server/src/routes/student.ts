import { Router } from 'express';
import * as studentController from '../controllers/student';
import auth from '../middlewares/auth';

const router = Router();

// Create a student
router.post('/', auth.authAdminOnly, studentController.createStudent);

// Get all students
router.get('/', auth.authAdminOnly, studentController.getAllStudents);

// Get a student by id
router.get('/:id', auth.auth, studentController.getStudentById);

// Update a student
router.put('/:id', auth.authAdminOnly, studentController.updateStudent);

// Delete a student
router.delete('/:id', auth.authAdminOnly, studentController.deleteStudent);

// Get a student's room
router.get('/:studentId/room', auth.authAdminOnly, studentController.getStudentRoom);

export default router;
