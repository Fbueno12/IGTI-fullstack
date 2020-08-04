import gradesRepository from '../repositories/gradesRepository.js';

const topThreeGradeService = {
  async execute(subject, type) {
    const grades = await gradesRepository.findBySubject(subject);
    const gradesType = grades
                          .filter((grade) => grade.type == type)
                          .sort((a, b) => b.value - a.value)
                          .slice(0,3);

    return gradesType;
  }
}

export default topThreeGradeService;