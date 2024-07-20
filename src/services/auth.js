import { randomBytes } from 'crypto';
import User from '../db/models/user.js';
import Session from '../db/models/session.js';
import { hashValue } from '../utils/hash.js';
import {
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
} from '../constants/index.js';

export const findSession = (filter) => Session.findOne(filter);

export const findUser = (filter) => User.findOne(filter);

export const signup = async (data) => {
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
