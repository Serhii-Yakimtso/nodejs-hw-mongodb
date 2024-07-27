import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SMTP } from '../constants/index.js';
import {
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
} from '../constants/index.js';

import User from '../db/models/user.js';
import Session from '../db/models/session.js';

import { env } from '../utils/env.js';
import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';
import { hashValue } from '../utils/hash.js';
import { sendEmail } from '../utils/sendMail.js';

export const findSession = (filter) => Session.findOne(filter);

export const findUser = (filter) => User.findOne(filter);

export const register = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);

  return User.create({ ...data, password: hashPassword });
};

export const createSession = async (userId) => {
  await Session.deleteOne({ userId });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFE_TIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFE_TIME);

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const deleteSession = (filter) => Session.deleteOne(filter);

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a target="_blank" href="${env(
      'APP_DOMAIN',
    )}/auth/reset-password?token=${resetToken}">here</a> to reset your password!</p>`,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (error) {
    if (error instanceof Error) throw createHttpError(401, error.message);
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.updateOne({ _id: user._id }, { password: encryptedPassword });
};

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  let user = await User.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    user = await User.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
      role: 'parent',
    });
  }

  const newSession = await createSession(user._id);

  return newSession;
  // return await Session.create({
  //   userId: user._id,
  //   ...newSession,
  // });
};
