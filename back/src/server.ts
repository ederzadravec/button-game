import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';

config();

const { APP_PORT } = process.env;

import * as Actions from '#/ws';

const server = http.createServer(express);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('createUser', Actions.createUser(io, socket));

  socket.on('createRoom', Actions.createRoom(io, socket));

  socket.on('enterRoom', Actions.enterRoom(io, socket));

  socket.on('startGame', Actions.startGame(io, socket));

  socket.on('updateGame', Actions.updateGame(io, socket));

  socket.on('userLostConenction', Actions.userLostConenction(io, socket));

  socket.on('endGame', Actions.endGame(io, socket));

  socket.on('disconnect', Actions.userLostConenction(io, socket));
});

server.listen(APP_PORT, () => {
  console.log(`listening in port ${APP_PORT}`);
});
