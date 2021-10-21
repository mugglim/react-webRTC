import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import socketController from './socket/socket.js';

const app = express();
app.set('port', 4000);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

wsServer.on('connection', socketController);

httpServer.listen(4000, () => console.log('Listening on http://localhost:4000'));
