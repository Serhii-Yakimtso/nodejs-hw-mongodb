import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getAllContactsController,
  getAllContactsByIdController,
  addContactController,
  updateContactController,
} from '../controllers/contacts.js';
import isValidId from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getAllContactsByIdController),
);

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.put(
  '/:contactId',
  isValidId,
  ctrlWrapper(updateContactController),
);

export default contactsRouter;
