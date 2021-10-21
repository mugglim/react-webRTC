const socketController = socket => {
	// Get Stream -> new RTCPeerConnection -> Create Offer
	// socket.on('join_room', roomName => {
	// 	socket.join(roomName);
	// 	socket.to(roomName).emit('welcome');
	// });
	// // PeerA -> PeerB
	// socket.on('offer', (offer, roomName) => {
	// 	socket.to(roomName).emit('offer', offer);
	// });
	// // PeerA <- PeerB
	// socket.on('answer', (answer, roomName) => {
	// 	socket.to(roomName).emit('answer', answer);
	// });
	// // PeerA <-> PeerB
	// socket.on('ice', (ice, roomName) => {
	// 	socket.to(roomName).emit('ice', ice);
	// });
};

export default socketController;
