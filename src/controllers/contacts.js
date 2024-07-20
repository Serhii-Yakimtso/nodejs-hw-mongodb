import createHttpError from 'http-errors';
import {
  getContacts,
  getContact,
  addContact,
  upsertContact,
  deleteContact,
} from '../services/contact-services.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { _id: userId } = req.user;

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = { ...parseFilterParams(req.query), userId };

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getAllContactsByIdController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { contactId } = req.params;
  const data = await getContact({ _id: contactId, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const { contactId } = req.params;
  const data = await upsertContact({ _id: contactId, userId }, req.body, {
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

export const patchContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const { contactId } = req.params;
  const result = await upsertContact({ _id: contactId, userId }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const { contactId } = req.params;

  const result = await deleteContact({ _id: contactId, userId });

  if (!result) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(204).send();
};
