import { ServerResponse } from 'http';

export const statusOK = (response: ServerResponse, title: string, titleStatus: number) => {
  response
    .writeHead(titleStatus, {
      'Content-Type': 'text/plain',
    })
    .end(JSON.stringify(title));
};
