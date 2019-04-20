const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const PORT = process.env.PORT || 2000;

server.listen(PORT, () => console.log('the server is up and running :) %s', PORT));
