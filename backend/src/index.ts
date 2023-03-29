import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';

import dbConnection from './database/config';
import docsRoutes from './routes/swagger';
import userRoutes from './routes/user';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const baseApiUrl = '/api';

dbConnection().catch();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${baseApiUrl}/docs`, docsRoutes);
app.use(`${baseApiUrl}/user`, userRoutes);

app.listen(port, () => {
  console.info(`API running in port ${port}`);
});
