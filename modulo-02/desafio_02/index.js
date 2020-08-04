'use strict'
import express from 'express';

import 'express-async-errors';

import routes from './src/routes/index.js';
import Error from './src/shared/Error.js';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err, request, response, next) => {
  if (err instanceof Error) {
      console.log(err.message);
      return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
      });
  }
});

app.listen(3333, () => console.log("API started at port 3333"));