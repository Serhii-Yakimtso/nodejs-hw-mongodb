import { model, Schema } from 'mongoose';
import { contactTypeList } from '../../constants/contacts-constants.js';
import { mongooseSaveError, setUpdatesSettings } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: contactTypeList,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
  {},
);

contactSchema.post('save', mongooseSaveError);
contactSchema.pre('findOneAndUpdate', setUpdatesSettings);
contactSchema.post('findOneAndUpdate', mongooseSaveError);

export const Contact = model('contacts', contactSchema);
