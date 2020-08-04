import getStudentGradeService from '../services/getStudentGradeService.js';

const studentsController = {
  async subjectGrade(request, response) {
    const {student, subject} = request.query;

    const result = await getStudentGradeService.execute(student, subject);
    return response.json(result);
  }
}

export default studentsController;