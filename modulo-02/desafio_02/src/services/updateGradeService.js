import gradesRepository from "../repositories/gradesRepository.js";
import Error from "../shared/Error.js";

const updateGradeService = {
  async execute(grade, id) {

    const gradeExists = await gradesRepository.findById(id);
    if (!gradeExists) {
      throw new Error('this grade does not exist! id -> ' + id);
    }

    const updated = await gradesRepository.update(grade, id);
    return updated;
  },
};

export default updateGradeService;
