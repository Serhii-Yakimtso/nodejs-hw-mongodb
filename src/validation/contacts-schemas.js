import Joi from 'joi';
import { contactTypeList } from '../constants/contacts-constants.js';

export const contactAddSchema = Joi.object({
  //   name: Joi.string().min(3).max(20).required().message({
  //     'string.base': "Contact's name should be a string",
  //     'string.min': "Contact's name should have at least 3 symbols",
  //     'string.max': "Contact's name should have at most 20 symbols",
  //     'any.required': "Contact's name is required",
  //   }),
  name: Joi.string().min(3).max(20).required(),
  //   name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .min(3)
    .max(20)
    .required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .min(3)
    .max(20),
});

// export const contactAddSchema = Joi.object({
//   name: Joi.string().min(3).max(20).required().message({
//     'string.base': "Contact's name should be a string",
//     'string.min': "Contact's name should have at least 3 symbols",
//     'string.max': "Contact's name should have at most 20 symbols",
//     'string.required': "Contact's name is required",
//   }),
//   phoneNumber: Joi.string().min(3).max(20).required().message({
//     'string.base': "Contact's phone number should be a string",
//     'string.min': "Contact's phone number should have at least 3 symbols",
//     'string.max': "Contact's phone number should have at most 20 symbols",
//     'string.required': "Contact's phone number is required",
//   }),
//   email: Joi.string().min(3).max(20).message({
//     'string.base': "Contact's email should be a string",
//     'string.min': "Contact's email should have at least 3 symbols",
//     'string.max': "Contact's email should have at most 20 symbols",
//   }),
//   isFavourite: Joi.boolean().message({
//     'string.base': "Contact's email should be a boolean",
//   }),
//   contactType: Joi.string()
//     .valid(...contactTypeList)
//     .min(3)
//     .max(20)
//     .required()
//     .message({
//       'string.base': "Contact's contact type should be a string",
//       'string.min': "Contact's contact type should have at least 3 symbols",
//       'string.max': "Contact's contact type should have at most 20 symbols",
//       'string.required': "Contact's contact type is required",
//     }),
// });

// export const contactUpdateSchema = Joi.object({
//   name: Joi.string().min(3).max(20).message({
//     'string.base': "Contact's name should be a string",
//     'string.min': "Contact's name should have at least 3 symbols",
//     'string.max': "Contact's name should have at most 20 symbols",
//   }),
//   phoneNumber: Joi.string().min(3).max(20).message({
//     'string.base': "Contact's phone number should be a string",
//     'string.min': "Contact's phone number should have at least 3 symbols",
//     'string.max': "Contact's phone number should have at most 20 symbols",
//   }),
//   email: Joi.string().min(3).max(20).message({
//     'string.base': "Contact's email should be a string",
//     'string.min': "Contact's email should have at least 3 symbols",
//     'string.max': "Contact's email should have at most 20 symbols",
//   }),
//   isFavourite: Joi.boolean().message({
//     'string.base': "Contact's email should be a boolean",
//   }),
//   contactType: Joi.string()
//     .valid(...contactTypeList)
//     .min(3)
//     .max(20)
//     .message({
//       'string.base': "Contact's contact type should be a string",
//       'string.min': "Contact's contact type should have at least 3 symbols",
//       'string.max': "Contact's contact type should have at most 20 symbols",
//     }),
// });
