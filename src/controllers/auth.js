import createHttpError from 'http-errors';
import { signup } from '../services/auth.js';

export const sighupController = async (req, res) => {
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
