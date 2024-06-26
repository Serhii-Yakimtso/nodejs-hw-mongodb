import { Contact } from '../db/contact';

export const getContacts = () => Contact.find();
export const getContactById = (id) => Contact.findById(id);
