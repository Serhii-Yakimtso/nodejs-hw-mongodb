import createHttpError from 'http-errors';
import { signup, findUser } from '../services/auth.js';

export const sighupController = async (req, res) => {
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

  console.log('sighupController');
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};
