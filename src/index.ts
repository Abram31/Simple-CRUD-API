import { app } from './app/app';
import { createServer } from 'http';

const PORT = process.env.PORT || 5000;
const server = createServer(app);
server.listen(PORT, () => {
  // console.log(`Worker ${process.pid} server running at http://localhost:${PORT}/`);
});
