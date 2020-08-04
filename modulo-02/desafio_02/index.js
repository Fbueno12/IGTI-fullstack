import express from 'express';

import routes from './src/routes.js';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("API started at port 3333"));