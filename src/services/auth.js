import User from '../db/models/user.js';

export const signup = async (data) => User.create(data);
