import gradesRepository from '../repositories/gradesRepository.js';

const averageGradeService = {
  async execute(subject, type) {
    const grades = await gradesRepository.findBySubject(subject);

    const gradesType = grades.filter((grade) => grade.type == type);

    const result = {
      grades: gradesType,
      grade_average:
        gradesType.reduce((acc, { value }) => acc + value, 0) /
        gradesType.length,
    };

    return result;
  }
}

export default averageGradeService;