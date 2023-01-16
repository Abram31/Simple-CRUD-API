import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export const readJSON = async (path: string) => {
  let read: string | null = null;
  let data: string | null = null;
  const status = await stat(path);
  if (status.size > 0) {
    read = await readFile(join(path), { encoding: 'utf8' });
    data = read ? await JSON.parse(read) : null;
  }

  return data ? JSON.stringify(data) : null;
};
