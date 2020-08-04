import gradesRepository from '../repositories/gradesRepository.js';

const studentsController = {
  async subjectGrade(request, response) {
    const {student, subject} = request.query;
    const studentGrades = await gradesRepository.findByStudent(student);
    const subjectGrades = studentGrades.filter(grade => grade.subject == subject);

    const totalSum = subjectGrades.reduce((acc, {value}) => acc + value, 0);
    
    const result = {grades: subjectGrades, totalSum}
    return response.json(result);
  }
}

export default studentsController;