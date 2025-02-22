import createHttpError from 'http-errors';
import { getContacts, getContactById } from '../services/contact-services.js';

export const getAllContactsController = async (req, res) => {
  const data = await getContacts();

  res.json({
    status: 200,
    data,
    message: 'Successfully found contacts!',
  });
};

export const getAllContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: 200,
    data,
    message: `Successfully found contact with id ${contactId}!`,
  });
};
