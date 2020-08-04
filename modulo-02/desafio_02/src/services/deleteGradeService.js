import gradesRepository from "../repositories/gradesRepository.js";
import Error from "../shared/Error.js";

const deleteGradeService = {
  async execute(id) {

    const gradeExists = await gradesRepository.findById(id);
    if (!gradeExists) {
      throw new Error('this grade does not exist! id -> ' + id);
    }

    const deleted = await gradesRepository.delete(id);
    return deleted;
  },
};

export default deleteGradeService;
