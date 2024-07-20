import createHttpError from 'http-errors';
import { signup, findUser, createSession } from '../services/auth.js';
import { compareHash } from '../utils/hash.js';

export const signupController = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const newUser = await signup(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const signinController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser({ email });

  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await compareHash(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  // const session = await createSession(user._id);
  const { accessToken, refreshToken, _id, refreshTokenValidUntil } =
    await createSession(user._id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: accessToken },
  });
};
