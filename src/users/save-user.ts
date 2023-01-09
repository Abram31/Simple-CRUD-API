import { IncomingMessage, ServerResponse } from 'http';
import { randomBytes } from 'crypto';
import { Iuser } from 'utils/types';

export const saveUser = async (request: IncomingMessage, response: ServerResponse) => {
  const bodyValues = ['username', 'age', 'hobbies'];
  let body = '';
  // let newBody = '';
  request.on('data', (chunk) => {
    body += chunk;
  });
  await request.on('end', async () => {
    try {
      const bodyRequest: string[] = Object.keys(JSON.parse(body));
      const checkBody = bodyRequest.filter((item) => {
        console.log(item);
        return bodyValues.includes(item);
      });
      console.log(checkBody);
      if (checkBody.length < 3) {
        throw new Error();
      } else {
        const bodyWithId = JSON.parse(body);
        bodyWithId.id = randomBytes(16).toString('hex');
        console.log(bodyWithId);
        response.end(JSON.stringify(bodyWithId));
      }
    } catch {
      response
        .writeHead(404, {
          'Content-Type': 'text/plain',
        })
        .end(JSON.stringify(`Method: ${request.method}`));
      console.log(request.method);
    }
  });
  const bodyWithId = JSON.parse(body);
  bodyWithId.id = randomBytes(16).toString('hex');
  const resultBody = JSON.stringify(bodyWithId);
  return resultBody;
};
