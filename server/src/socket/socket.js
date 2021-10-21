const socketController = socket => {
	console.log('User Connected 🚀');

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
