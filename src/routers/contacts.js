import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  getAllContactsController,
  getAllContactsByIdController,
  addContactController,
  updateContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import authenticate from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts-schemas.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getAllContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(updateContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
