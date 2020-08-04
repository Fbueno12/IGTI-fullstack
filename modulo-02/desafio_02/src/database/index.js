import { promises as fs } from "fs";
const {readFile, writeFile} = fs;

const database = {
  async read() {
    const data = JSON.parse(await readFile("./public/grades.json"));
    return data;
  },

  async save(data) {
    await writeFile('./public/grades.json', JSON.stringify(data));
  }
}

export default database;