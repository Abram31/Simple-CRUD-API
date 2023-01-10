import { IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';
import { arg } from './arg';
import { ERR, METHODS } from './constants';
import { saveUser } from '../users/save-users';
import { Iuser } from '../utils/types';
import { saveUserEmit } from '../users/save-user-emitter';
import { getUsers } from '../users/get-users';
import { ERROR } from '../utils/error';
import { getUser } from '../users/get-user';

const usersCollect: Array<Iuser> = [];
const bodyValues = ['username', 'age', 'hobbies'];

export const app = async (request: IncomingMessage, response: ServerResponse) => {
  console.log(`Worker ${process.pid} requested`);
  response.setHeader('Content-Type', 'application/json');
  const req = request.url ? request.url.split('/').filter(Boolean) : [];
  // const [api, users, id, ...rest] = request.url ? request.url.split('/').filter(Boolean) : [];

  const method = request.method;
  const url = request.url || '/';

  switch (method) {
    case METHODS.GET:
      console.log(getUsers(url));

      if (getUsers(url)) {
        response.end(JSON.stringify(usersCollect));
        break;
      }

      if (getUser(req)) {
        const id = getUser(req);
        const user = usersCollect.find((user) => user.id === id);
        response.end(JSON.stringify(user));
      } else {
        ERROR(response, ERR.RESOURCE_NOT_FOUND);
      }
      break;

    case METHODS.POST:
      const id = saveUser(request, response).then((data) => {
        const bodyRequest: string[] = Object.keys(JSON.parse(data.body));
        const checkBody = bodyRequest.filter((item) => {
          return bodyValues.includes(item);
        });
        console.log(checkBody);
        if (checkBody.length < 3) {
        } else {
          const body = JSON.parse(data.body);
          body.id = data.id;
          console.log(body);
          usersCollect.push(body);
        }
      });

      // resp.read();
      // const data = resp.setEncoding('utf-8');
      // console.log(data);
      // console.log(resp);

      // resp.on('data', (data) => {
      //   console.log(data.toString());
      // });

      // resp.then((response) => {
      //   const data = response;
      //   console.log(data);
      // });
      // console.log(resp);

      // saveUser(request, response).then((data) => usersCollect.push(JSON.parse(data!)));
      // saveUserEmit(request, response);
      break;
    default:
      response
        .writeHead(404, {
          'Content-Type': 'text/plain',
        })
        .end(JSON.stringify(`Method: ${method}`));
      console.log(method);
  }
};
//   if (url === '/api/users') {
//     response.end(
// JSON.stringify({
//   data: 'Api',
// })
//     );
//   } else {
//   response
//     .writeHead(404, {
//       'Content-Type': 'text/plain',
//     })
//     .end(JSON.stringify(`http://localhost: ${url} NOT FOUND`));
// }
// };
