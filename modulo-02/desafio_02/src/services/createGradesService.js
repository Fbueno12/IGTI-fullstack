import gradesRepository from '../repositories/gradesRepository.js';

const createGradesService = {
  async execute(grade) {
    const obj = await gradesRepository.create(grade);
    const newGrade = await gradesRepository.save(obj);
    return newGrade;
  }
}

export default createGradesService;