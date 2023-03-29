import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';

import dbConnection from './database/config';
import docsRoutes from './routes/swagger';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const baseApiUrl = '/api';

dbConnection().catch();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${baseApiUrl}/docs`, docsRoutes);

app.listen(port, () => {
  console.info(`API running in port ${port}`);
});
