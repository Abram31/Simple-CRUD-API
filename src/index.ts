import { app } from './app/app';
import { createServer } from 'http';
import { checkURL } from './utils/check-url';

const PORT = process.env.PORT || 4000;
const server = createServer(app);
server.listen(PORT, () => {
  // console.log(`Worker ${process.pid} server running at http://localhost:${PORT}/`);
});
