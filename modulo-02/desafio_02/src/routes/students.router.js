import express from 'express';
import studentsController from '../controllers/studentsController.js';

const routes = express.Router();

routes.get('/', studentsController.subjectGrade);

export default routes;