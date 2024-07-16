import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  userSignupSchema,
  userSigninSchema,
} from '../validation/users-schemas.js';
import { sighupController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSignupSchema),
  ctrlWrapper(sighupController),
);

export default authRouter;
