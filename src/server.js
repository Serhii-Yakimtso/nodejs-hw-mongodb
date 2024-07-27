import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { UPLOAD_DIR } from './constants/index.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';

import { env } from './utils/env.js';

const port = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
