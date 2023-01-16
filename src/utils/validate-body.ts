import { Iuser } from './types';

export const validateBody = (body: string) => {
  const bodyParse: Iuser = JSON.parse(body);
  const bodyValues = ['username', 'age', 'hobbies'];
  const validateKeys =
    Object.keys(bodyParse).filter((item) => bodyValues.includes(item)).length === bodyValues.length;

  const validateHobbies = Array.isArray(bodyParse.hobbies);

  const validateItemsHobbies =
    bodyParse.hobbies.filter((item) => typeof item === 'string').length ===
    bodyParse.hobbies.length;

  if (!validateItemsHobbies || !validateItemsHobbies || !validateItemsHobbies) {
    throw 400;
  }

  return validateKeys && validateHobbies && validateItemsHobbies;
};
