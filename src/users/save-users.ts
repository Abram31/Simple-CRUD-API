import { IncomingMessage, ServerResponse } from 'http';
import { randomBytes } from 'crypto';
import { Iuser } from 'utils/types';
import { v4, validate } from 'uuid';
import { validateBody } from '../utils/validate-body';
import { ERROR } from '../utils/error';
import { ERR } from '../app/constants';

export const saveUser = async (request: IncomingMessage, response: ServerResponse) => {
  let body = '';
  const id = v4();
  await request.on('data', (chunk) => {
    body += chunk;
  });
  // await request.on('end', () => {
  //   // const validBody = validateBody(body);
  //   // console.log(validBody);
  //   // if (!validBody) {
  //   //   throw 400;
  //   // }
  // });
  return { id: id, body: body };
};
