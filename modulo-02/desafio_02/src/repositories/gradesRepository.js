import { promises as fs } from "fs";
import database from "../database/index.js";
const {readFile, writeFile} = fs;

const gradesRepository = {
  async findAll() {
    const data = await database.read();
    return data;
  },
  
  async findById(id) {
    const data = await database.read();

    const grade = data.grades.find(grade => grade.id == id);
    return grade;
  },

  async findByStudent(student) {
    const data = await database.read();
    const studentGrade = data.grades.filter(grade => grade.student == student);

    return studentGrade;
  },

  async findBySubject(subject) {
    const data = JSON.parse(await readFile("./public/grades.json"));
    const subjectGrade = data.grades.filter(grade => grade.subject == subject);

    return subjectGrade;
  },

  async create({student, subject, type, value}) {
    let grades = await database.read();

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
    const data = await database.read();

    data.nextId++;
    data.grades.push(grade);

    await database.save(data);
    return grade;
  },

  async update(grade, id) {
    const data = await database.read();

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

    await database.save(data);
    return await this.findById(id);
  },

  async delete(id) {
    const data = await database.read();
    data.grades = data.grades.filter(grade => grade.id != id);

    await database.save(data);
  }
}

export default gradesRepository;