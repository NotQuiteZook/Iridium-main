import createBareServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';
const bare = createBareServer('/bare/', {
    logErrors: true
});
const serve = new nodeStatic.Server('static/');
const server = http.createServer();

server.on('request', (request, response) => {
    if (bare.shouldRoute(request)) {
        bare.routeRequest(request, response);
    } else {
        serve.serve(request, response);
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen({
    port: process.env.PORT || 8080,
});