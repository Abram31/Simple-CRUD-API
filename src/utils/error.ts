import { ServerResponse } from 'http';

export const ERROR = (response: ServerResponse, err: string, errStatus: number) => {
  response
    .writeHead(errStatus, {
      'Content-Type': 'text/plain',
    })
    .end(JSON.stringify(err));
};
