import gradesRepository from '../repositories/gradesRepository.js';

const getStudentGradeService = {
  async execute(student, subject) {
    const studentGrades = await gradesRepository.findByStudent(student);
    const subjectGrades = studentGrades.filter(grade => grade.subject == subject);

    const totalSum = subjectGrades.reduce((acc, {value}) => acc + value, 0);
    
    const result = {grades: subjectGrades, totalSum}

    return result;
  }
}

export default getStudentGradeService;