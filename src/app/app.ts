import { IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';
import { arg } from './arg';
import { METHODS } from './constants';
import { saveUser } from '../users/save-user';
import { Iuser } from 'utils/types';

const usersCollect: Array<Iuser> = [];

export const app = async (request: IncomingMessage, response: ServerResponse) => {
  console.log(`Worker ${process.pid} requested`);
  response.setHeader('Content-Type', 'application/json');
  const [api, users, id, ...rest] = request.url ? request.url.split('/').filter(Boolean) : [];
  console.log('api:', api, 'users:', users, 'id:', id, 'rest:', rest);

  const method = request.method;
  console.log(method === METHODS.GET);
  console.log(METHODS);
  switch (method) {
    case METHODS.GET:
      response.end(JSON.stringify(usersCollect));
      console.log(method);
      break;

    case METHODS.POST:
      //   response.end(
      //     JSON.stringify({
      //       data: 'Api',
      //     })
      //   );

      // const newUser: Iuser =
      saveUser(request, response).then((data) => usersCollect.push(JSON.parse(data)));

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
