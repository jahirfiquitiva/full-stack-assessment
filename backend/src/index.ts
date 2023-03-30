import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';

import dbConnection from './database/config';
import docsRoutes from './routes/swagger';
import userRoutes from './routes/user';
import websiteRoutes from './routes/website';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const baseApiUrl = '/api';
const docsRoute = `${baseApiUrl}/docs`;

dbConnection().catch();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect(docsRoute);
  return;
});

app.get('/api/', (req, res) => {
  res.redirect(docsRoute);
  return;
});

app.use(docsRoute, docsRoutes);
app.use(`${baseApiUrl}/user`, userRoutes);
app.use(`${baseApiUrl}/website`, websiteRoutes);

app.listen(port, () => {
  console.info(`API running in port ${port}`);
});
