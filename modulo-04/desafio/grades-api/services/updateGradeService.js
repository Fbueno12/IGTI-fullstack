import GradesModel from "../models/gradesModel.js";

const updateGradeService = {
  async execute(data) {
    const { id } = data.params;

    const grade = await GradesModel.findOneAndUpdate({ _id: id }, data.body, {
      new: true,
    });

    grade.save();

    return grade;
  },
};

export default updateGradeService;
