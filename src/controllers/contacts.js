import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  addContact,
  upsertContact,
} from '../services/contact-services.js';

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

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await upsertContact({ _id: contactId }, req.body, {
    upsert: true,
  });

  const status = data.isNew ? 201 : 200;
  const message = data.isNew ? 'Contact success add' : 'Contact update success';

  res.json({
    status,
    message,
    data: data.value,
  });
};
