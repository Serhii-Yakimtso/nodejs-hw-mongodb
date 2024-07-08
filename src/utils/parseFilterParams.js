import { contactTypeList } from '../constants/contacts-constants.js';

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') {
    return;
  }

  const isContactType = (contactType) => contactTypeList.includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (boolean) => {
  const parseBoolean = Boolean(boolean);
  if (!parseBoolean) return;
  return parseBoolean;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
