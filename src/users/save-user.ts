import { IncomingMessage, ServerResponse } from 'http';
import { randomBytes } from 'crypto';
import { Iuser } from 'utils/types';

export const saveUser = async (request: IncomingMessage, response: ServerResponse) => {
  const bodyValues = ['username', 'age', 'hobbies'];
  let body = '';
  const id = randomBytes(16).toString('hex');
  request.on('data', (chunk) => {
    body += chunk;
  });
  const data = await request.on('end', () => {
    try {
      const bodyRequest: string[] = Object.keys(JSON.parse(body));
      const checkBody = bodyRequest.filter((item) => {
        return bodyValues.includes(item);
      });

      if (checkBody.length < 3) {
        body = '';
        console.log('Aib,rf');

        throw new Error();
      } else {
        const bodyWithId = JSON.parse(body);
        bodyWithId.id = id;
        response.end(JSON.stringify(bodyWithId));
        return JSON.stringify(bodyWithId);
      }
    } catch {
      response
        .writeHead(404, {
          'Content-Type': 'text/plain',
        })
        .end(JSON.stringify(`Method: ${request.method}`));
    }
  });
  return { id: id, body: body };
};
