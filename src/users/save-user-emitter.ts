import { EventEmitter } from 'events';
import { randomBytes } from 'crypto';
import { IncomingMessage, ServerResponse } from 'http';

const emitter = new EventEmitter();

export const saveUserEmit = async (request: IncomingMessage, response: ServerResponse) => {
  //   let dataNew;
  const bodyValues = ['username', 'age', 'hobbies'];
  let id = '';
  let body = '';

  await emitter.on(
    'text',
    await function () {
      request.on('data', (chunk) => {
        body += chunk;
      });

      request.on('end', () => {
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
            id = randomBytes(16).toString('hex');
            bodyWithId.id = id;
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

      // dataNew = Object.keys(data);
      // dataNew.push('123');
      // console.log(dataNew);
    }
  );
  const data = emitter.emit('text');
  //   console.log(data);

  //   if (data) {
  //     console.log(id);
  //   }
  response.end();
};
