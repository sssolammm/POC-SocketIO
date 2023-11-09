import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3001',
	},
});

io.on('connection', (socket) => {
	console.log('User connected');

	socket.on('message', (payload) => {
		console.log('msg received - ' + payload);

		socket.emit('message', 'Server says: ' + payload);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
