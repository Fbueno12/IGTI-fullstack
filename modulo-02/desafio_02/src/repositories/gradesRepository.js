import { promises as fs } from "fs";
const {readFile, writeFile} = fs;

const gradesRepository = {
  async findAll() {
    return JSON.parse(await readFile("./public/grades.json"));
  },
  
  async findById(id) {
    const data = JSON.parse(await readFile("./public/grades.json"));
    const grade = data.grades.find(grade => grade.id == id);
    return grade;
  },

  async findByStudent(student) {
    const data = JSON.parse(await readFile("./public/grades.json"));
    const studentGrade = data.grades.filter(grade => grade.student == student);

    return studentGrade;
  },

  async findBySubject(subject) {
    const data = JSON.parse(await readFile("./public/grades.json"));
    const subjectGrade = data.grades.filter(grade => grade.subject == subject);

    return subjectGrade;
  },

  async create({student, subject, type, value}) {
    let grades = await readFile("./public/grades.json");
    grades = JSON.parse(grades);

    const obj = {
      id: grades.nextId,
      student: student,
      subject: subject,
      type: type,
      value: value,
      timestamp: new Date()
    }
    
    return obj;
  },

  async save(grade) {
    const data = JSON.parse(await readFile("./public/grades.json"));

    data.nextId++;
    data.grades.push(grade);

    await writeFile('./public/grades.json', JSON.stringify(data));
    return grade;
  },

  async update(grade, id) {
    const data = JSON.parse(await readFile("./public/grades.json"));

    const updated = data.grades.map(oldGrade => {
      if(oldGrade.id == id) {
        oldGrade.student = grade.student;
        oldGrade.subject = grade.subject;
        oldGrade.type = grade.type;
        oldGrade.value = grade.value;
      }
      return oldGrade;
    });
    data.grades = updated;

    await writeFile("./public/grades.json", JSON.stringify(data));
    return await this.findById(id);
  },

  async delete(id) {
    const data = JSON.parse(await readFile("./public/grades.json"));
    data.grades = data.grades.filter(grade => grade.id != id);

    await writeFile("./public/grades.json", JSON.stringify(data));
  }
}

export default gradesRepository;