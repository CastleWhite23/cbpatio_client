import { io } from 'socket.io-client'


const socket = io("http://localhost:3005/", {
  transports: ['websocket'],
});

export {socket}