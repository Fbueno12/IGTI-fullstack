import gradesRepository from "../repositories/gradesRepository.js";
import createGradesService from "../services/createGradesService.js";
import updateGradeService from "../services/updateGradeService.js";
import deleteGradeService from "../services/deleteGradeService.js";
import averageGradeService from "../services/averageGradeService.js";
import topThreeGradeService from "../services/topThreeGradeService.js";

const gradesController = {
  async index(_, response) {
    return response.json(await gradesRepository.findAll());
  },

  async store(request, response) {
    const grade = await createGradesService.execute(request.body);

    response.json(grade);
  },
  async update(request, response) {
    const { id } = request.params;

    const updated = await updateGradeService.execute(request.body, id);
    response.json(updated);
  },
  async delete(request, response) {
    const { id } = request.params;

    await deleteGradeService.execute(id);
    response.send();
  },

  async find(request, response) {
    const { id } = request.params;
    return response.json(await gradesRepository.findById(id));
  },

  async average(request, response) {
    const { subject, type } = request.query;

    const result = await averageGradeService.execute(subject, type);
    return response.json(result);
  },

  async topThree(request, response) {
    const { subject, type } = request.query;

    const result = await topThreeGradeService.execute(subject, type);
    return response.json(result);
  },
};

export default gradesController;
