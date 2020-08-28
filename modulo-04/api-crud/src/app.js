import express from "express";
import 'express-async-errors';

import mongoose from "mongoose";
import { accountRouter } from "./routes/accountsRouter.js";
import Error from "./shared/Error.js";

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
app.use((err, request, response) => {
  if (err instanceof Error) {
      return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
      });
  }
  console.log(err);
  if(process.env.NODE_URL != 'dev') {
      return response.status(500).json({
          status: 'error',
          message: 'internal server error',
      });
  }
});

app.listen(3333, () => console.log("API running on port 3333"));
