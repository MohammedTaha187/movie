import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());

server.use(middlewares);

server.use(router);

server.listen(5001, () => {
  console.log('JSON Server is running on http://localhost:5001');
});
