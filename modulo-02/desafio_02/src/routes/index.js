import express from 'express';
import gradesRouter from './grades.router.js';
import studentsRouter from './students.router.js';

const router = express.Router();

router.use('/grades', gradesRouter);
router.use('/students', studentsRouter);

export default router;