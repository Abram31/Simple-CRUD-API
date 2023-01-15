import { writeFile } from 'fs';
import { dirname, join } from 'path';
import { Iuser } from '../utils/types';
import { readJSON } from './read-file';

interface Istate {
  data: string;
}
export class State {
  static appendData() {
    throw new Error('Method not implemented.');
  }

  async appendData(newData: Iuser) {
    const path = join(__dirname, '../state', 'state.json');
    const currentData: string | null = await readJSON(path);
    const data = currentData ? JSON.parse(currentData) : null;
    console.log(currentData);
    if (currentData) {
      data.push(newData);
      // console.log(data);
      writeFile(join(__dirname, 'state.json'), JSON.stringify(data), (err) => {
        if (err) throw err;
      });
    } else {
      writeFile(join(__dirname, 'state.json'), JSON.stringify([newData]), (err) => {
        if (err) throw err;
      });
    }
  }
}
