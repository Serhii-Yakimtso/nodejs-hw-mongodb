import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getContacts, getContactById } from './services/contact-services.js';

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
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await getContacts();

    res.json({
      status: 200,
      data,
      message: 'Successfully found contacts!',
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const data = await getContactById(contactId);

      if (!data) {
        return res.status(404).json({
          message: `Contact with id ${contactId} not found`,
        });
      }

      res.json({
        status: 200,
        data,
        message: `Successfully found contact with id ${contactId}!`,
      });
    } catch (error) {
      if (error.message.includes('Cast to ObjectId failed')) {
        error.status = 404;
      }
      const { status = 500 } = error;
      res.status(status).json({
        message: error.message,
      });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
