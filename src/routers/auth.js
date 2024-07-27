import { Router } from 'express';

import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';

import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth-schemas.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;
