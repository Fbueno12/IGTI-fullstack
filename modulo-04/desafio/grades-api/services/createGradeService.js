import GradesModel from "../models/gradesModel.js";

const createGradeService = {
  async execute(data) {
    const { name, subject, type, value } = data.body;

    const grade = await GradesModel.create({ name, subject, type, value });
    grade.save();

    return grade;
  },
};

export default createGradeService;
