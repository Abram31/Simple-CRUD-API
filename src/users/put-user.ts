import { IncomingMessage, ServerResponse } from 'http';
import { Iuser } from '../utils/types';
import { ERR } from '../app/constants';
import { ERROR } from '../utils/error';

export const putUser = (URL: string, usersCollect: Array<Iuser>) => {
  const id = URL.split('/')
    .filter((item) => item !== '')
    .slice(-1)[0];
  let indexUser = '';
  const checkUser = usersCollect.find((item, index) => {
    if (item.id === id) {
      indexUser = String(index);
      return true;
    }
  });
  // try {
  if (checkUser) {
    return indexUser;
  } else {
    throw 404;
  }
  // }
};
