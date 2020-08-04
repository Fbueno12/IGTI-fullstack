import gradesRepository from "../repositories/gradesRepository.js";

const gradesController = {
  async index(request, response) {
    return response.json(await gradesRepository.findAll());
  },

  async store(request, response) {
    const grade = await gradesRepository.create(request.body);

    const newGrade = await gradesRepository.save(grade);
    response.json(newGrade);
  },
  async update(request, response) {
    const { id } = request.params;

    const gradeExists = await gradesRepository.findById(id);
    if (!gradeExists) {
      return response
        .status(400)
        .json({ error: `Grade with id ${id} not found` });
    }

    const updated = await gradesRepository.update(request.body, id);
    response.json(updated);
  },
  async delete(request, response) {
    const { id } = request.params;
    const gradeExists = await gradesRepository.findById(id);
    if (!gradeExists) {
      return response
        .status(400)
        .json({ error: `Grade with id ${id} not found` });
    }

    await gradesRepository.delete(id);
    response.send();
  },

  async find(request, response) {
    const { id } = request.params;
    return response.json(await gradesRepository.findById(id));
  },

  async average(request, response) {
    const { subject, type } = request.query;

    const grades = await gradesRepository.findBySubject(subject);

    const gradesType = grades.filter((grade) => grade.type == type);

    const result = {
      grades: gradesType,
      grade_average:
        gradesType.reduce((acc, { value }) => acc + value, 0) /
        gradesType.length,
    };

    return response.json(result);
  },

  async topThree(request, response) {
    const { subject, type } = request.query;
    const grades = await gradesRepository.findBySubject(subject);
    const gradesType = grades
                          .filter((grade) => grade.type == type)
                          .sort((a, b) => b.value - a.value)
                          .slice(0,3);

    return response.json(gradesType);
  },
};

export default gradesController;
