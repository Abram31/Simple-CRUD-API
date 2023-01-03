import { createServer } from 'http';

const PORT = process.env.PORT || 4000;
const server = createServer((req, res) => {
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});
server.listen(PORT, () => {
  console.log(`Worker ${process.pid} server running at http://localhost:${PORT}/`);
});

console.log('Hello Node!');
console.log('Hello Node!!!!!!');
