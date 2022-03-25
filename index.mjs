import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';
import Analytics from './analytic.mjs';
const bare =  new Server('/bare/', '');
const serve = new nodeStatic.Server('static/');
const server = http.createServer();

server.on('request', (request, response) => {
    if (!Analytics(request, response)) return false;
    if (bare.route_request(request, response)) return true;
    serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
	if(bare.route_upgrade(req, socket, head))return;
	socket.end();
});

server.on('/games', (req, res) => {
  res.sendFile(__dirname + '/static/games/games.html');
});

server.listen(process.env.PORT || 8080);