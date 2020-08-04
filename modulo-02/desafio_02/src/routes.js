import express from 'express';
import gradesController from './controllers/gradesController.js';
import studentsController from './controllers/studentsController.js';

const routes = express.Router();

routes.post('/grades/', gradesController.store); // inserir nova grade

routes.put('/grades/:id', gradesController.update); // update de uma grade

routes.delete('/grades/:id', gradesController.delete); // excluir uma grade

routes.get('/grades/averages', gradesController.average); // consultar a média das grades de determinado subject e type

routes.get('/grades/top3', gradesController.topThree) // retornar as três melhores grades de acordo com determinado subject e type

routes.get('/grades', gradesController.index);

routes.get('/grades/:id', gradesController.find); // buscar uma grade por id

routes.get('/students', studentsController.subjectGrade); // consultar a nota total de um aluno em uma disciplina

export default routes;