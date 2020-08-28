import express from "express";

import mongoose from "mongoose";
import { accountRouter } from "./routes/accountsRouter.js";

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user:Abacates2@cluster0.ugj0x.mongodb.net/igti-database?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log("Erro na conexão com o MongoDB");
  }
})();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(3333, () => console.log("API running on port 3333"));
