import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getAllContactsController,
  getAllContactsByIdController,
  addContactController,
  updateContactController,
  patchContactController,
  deleteContactController,
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

contactsRouter.patch(
  '/:contactId',
  isValidId,
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
