import { IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';
import { arg } from './arg';
import { bodyValues, ERR, METHODS } from './constants';
import { saveUser } from '../users/save-users';
import { Iuser } from '../utils/types';
import { getUsers } from '../users/get-users';
import { ERROR } from '../utils/error';
import { getUser } from '../users/get-user';
import { statusOK } from '../utils/statusOK';
import { checkURL } from '../utils/check-url';
import { validateBody } from '../utils/validate-body';
import { putUser } from '../users/put-user';
import { State } from '../state/change-state';
import { truncate, writeFile } from 'fs/promises';
import { join } from 'path';
import { readJSON } from '../state/read-file';
import json from '../state/state.json';
const usersCollect: Array<Iuser> = [];

export const app = async (request: IncomingMessage, response: ServerResponse) => {
  console.log(`Worker ${cluster.worker?.process.pid} requested`);
  response.setHeader('Content-Type', 'application/json');
  const req = request.url ? request.url.split('/').filter(Boolean) : [];

  const method = request.method;
  const url = request.url || '/';
  const path = join(__dirname, '../state', 'state.json');
  const checkWithoutID = checkURL({ URL: url, correctPattern: ['api', 'users'], id: false });
  const checkWithID = checkURL({ URL: url, correctPattern: ['api', 'users'], id: true });

  switch (method) {
    case METHODS.GET:
      if (checkWithoutID) {
        const data: string | null = await readJSON(path);

        response.end(data || []);
        break;
      }

      try {
        if (checkWithID) {
          const data: string | null = await readJSON(path);
          const parseData: null | Iuser[] = data && JSON.parse(data);
          const id = getUser(req);

          const user = parseData && parseData.find((user) => user.id === id);

          if (user) {
            response.end(JSON.stringify(user));
          } else {
            throw 404;
          }
        } else {
          throw 400;
        }
      } catch (err) {
        ERROR(response, err === Number(400) ? ERR.USERID_INVALID : ERR.USER_NOT_FOUND, Number(err));
      }
      break;

    case METHODS.POST:
      try {
        if (url === '/api/users') {
          saveUser(request, response).then((data) => {
            const bodyRequest: string[] = Object.keys(JSON.parse(data.body));
            const checkBody = bodyRequest.filter((item) => {
              return bodyValues.includes(item);
            });
            try {
              const validBody = validateBody(data.body);

              if (!validBody) {
                throw 400;
              }
              const body = JSON.parse(data.body);
              body.id = data.id;
              new State().appendData(body);

              // usersCollect.push(body);
              statusOK(response, body, 201);
            } catch (err) {
              ERROR(response, ERR.BODY_INVALID_FORMAT, Number(err));
            }
          });
        } else {
          throw 404;
        }
      } catch (err) {
        ERROR(response, ERR.RESOURCE_NOT_FOUND, Number(err));
      }

      break;

    case METHODS.PUT:
      try {
        const checkURLWithID = checkURL({ URL: url, correctPattern: ['api', 'users'], id: true });
        if (!checkURLWithID) throw 400;
        let body = '';
        request.on('data', (chunk) => {
          body += chunk;
        });
        request.on('end', () => {
          try {
            const checkBody = validateBody(body);
            if (checkBody) {
              readJSON(path).then(async (data) => {
                const dataParse = data && JSON.parse(data);
                const indexID = putUser(url, dataParse);
                dataParse[Number(indexID)] = {
                  ...dataParse[Number(indexID)],
                  ...JSON.parse(body),
                };
                await truncate(path);
                writeFile(path, JSON.stringify(dataParse));
                response.end(body);
              });
            } else {
              throw 400;
            }
          } catch (err) {
            ERROR(response, ERR.BODY_INVALID_FORMAT, Number(err));
          }
        });
      } catch (err) {
        ERROR(response, Number(err) === 400 ? ERR.USERID_INVALID : ERR.USER_NOT_FOUND, Number(err));
      }
      break;
    case METHODS.DELETE:
      try {
        const checkURLWithID = checkURL({ URL: url, correctPattern: ['api', 'users'], id: true });
        if (!checkURLWithID) throw 400;
        readJSON(path).then(async (data) => {
          const dataParse = data && JSON.parse(data);
          if (!dataParse) throw 404;
          const indexID = putUser(url, dataParse);
          const deleteUser = dataParse.splice(Number(indexID), 1)[0];

          await truncate(path);
          writeFile(path, JSON.stringify(dataParse));
          response.writeHead(204).end(JSON.stringify(deleteUser));
        });
      } catch (err) {
        ERROR(response, Number(err) === 400 ? ERR.USERID_INVALID : ERR.USER_NOT_FOUND, Number(err));
      }
      break;
    default:
      response
        .writeHead(404, {
          'Content-Type': 'text/plain',
        })
        .end(JSON.stringify(`Method: ${method}`));
  }
};
