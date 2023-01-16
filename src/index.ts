import 'dotenv/config';
import { app } from './app/app';
import { createServer } from 'http';
import { args } from './utils/args';
import cluster from 'node:cluster';
import { cpus } from 'os';
import process from 'process';

const PORT = process.env.PORT;
const server = createServer(app);
if (args() === 'cluster' && cluster.isPrimary) {
  const cpusAmount = cpus().length;

  console.log(`Primary ${process.pid} is running, wait for workers...`);

  for (let i = 0; i < cpusAmount; i++) {
    const worker = cluster.fork({ WORKER_PORT: Number(PORT) + i + 1 });
    worker.on('message', (msg) => {
      console.log(`A worker is now connected to ${worker.process.pid}:${msg}`);
    });
  }
} else {
  const PORT = process.env.PORT;

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} server running at http://localhost:${PORT}/`);
    process.send && process.send(JSON.stringify({ id: process.pid }));
  });
}
