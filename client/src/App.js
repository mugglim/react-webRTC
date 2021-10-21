import React from 'react';
import UserStream from './components/Stream/UserStream';
import { SocketContext, socket } from './context/socket.js';

function App() {
	return (
		<SocketContext.Provider value={socket}>
			<UserStream></UserStream>
		</SocketContext.Provider>
	);
}

export default App;
