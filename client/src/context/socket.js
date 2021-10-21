import React from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');
const SocketContext = React.createContext();

export { SocketContext, socket };
