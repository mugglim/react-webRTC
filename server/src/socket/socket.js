const socketController = socket => {
	console.log('User Connected 🚀');

	socket.on('join_room', () => {
		console.log('user join!');
		socket.broadcast.emit('peer_join');
	});

	// // PeerA -> PeerB
	socket.on('offer', offer => {
		socket.broadcast.emit('offer', offer);
	});

	// // PeerA <- PeerB
	socket.on('answer', answer => {
		socket.broadcast.emit('answer', answer);
	});

	// // PeerA <-> PeerB
	socket.on('ice', ice => {
		socket.broadcast.emit('ice', ice);
	});
};

export default socketController;
