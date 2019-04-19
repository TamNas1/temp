const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const PORT = process.env.PORT || 1919;

server.listen(PORT, () => console.log('the server is up and running :) %s', PORT));
