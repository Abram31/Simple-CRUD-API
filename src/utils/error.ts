import { IncomingMessage, ServerResponse } from 'http';

export const ERROR = (response: ServerResponse, err: string) => {
  response
    .writeHead(404, {
      'Content-Type': 'text/plain',
    })
    .end(JSON.stringify(err));
};
