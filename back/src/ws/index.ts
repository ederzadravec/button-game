import { Socket, Server } from 'socket.io';

import * as Types from 'types/ws';
import * as DBTypes from 'types/database';
import * as GameTypes from 'types/game';
import Model from '#/database';

export const createUser: Types.CreateUserFunc = (io, ws) => (name) => {
  ws.join(ws.id);

  const userModel = Model<DBTypes.User>('users');

  const data = {
    name,
    wsId: ws.id,
  };

  const user = userModel.insert(data);

  sendToUser(io, ws, user, { type: 'createdUser', data: { id: user } });
  sendGameStatus(io, ws, 'user');
};

export const createRoom: Types.CreateRoomFunc = (io, ws) => () => {
  const roomModel = Model<DBTypes.Room>('rooms');
  const userRoomModel = Model<DBTypes.UserRoom>('userRoom');
  const userModel = Model<DBTypes.User>('users');

  const user = userModel.getOne({ wsId: ws.id });

  const room = roomModel.insert({ owner: user.id, active: true });

  userRoomModel.insert({ user: user.id, room: room, active: true });

  ws.join('room_' + room);
  sendGameStatus(io, ws, 'user');
};

export const enterRoom: Types.EnterRoomFunc = (io, ws) => (roomId) => {
  const roomModel = Model<DBTypes.Room>('rooms');
  const userRoomModel = Model<DBTypes.UserRoom>('userRoom');
  const userModel = Model<DBTypes.User>('users');
  const sessionModel = Model<DBTypes.Session>('sessions');

  const user = userModel.getOne({ wsId: ws.id });
  const room = roomModel.getOne({ id: parseInt(roomId), active: true });

  if (!room) {
    return sendToUser(io, ws, user.id, { type: 'message', data: { type: 'error', message: 'Sala indisponivel' } });
  }

  const session = sessionModel.getOne({ room: room.id });

  if (session) {
    return sendToUser(io, ws, user.id, { type: 'message', data: { type: 'error', message: 'Jogo em andamento' } });
  }

  userRoomModel.insert({ room: room.id, user: user.id, active: true });

  sendToRoom(io, ws, user.id, {
    type: 'message',
    data: {
      type: 'success',
      message: 'Um jogador entrou da sala',
    },
  });

  ws.join('room_' + room.id);
  sendGameStatus(io, ws, 'room');
};

export const startGame: Types.StartGameFunc = (io, ws) => (id) => {
  const roomModel = Model<DBTypes.Room>('rooms');
  const userRoomModel = Model<DBTypes.UserRoom>('userRoom');
  const userModel = Model<DBTypes.User>('users');
  const sessionModel = Model<DBTypes.Session>('sessions');
  const sessionUserModel = Model<DBTypes.SessionUser>('sessionUser');
  const sessionMatchModel = Model<DBTypes.SessionMatch>('sessionMatch');

  const user = userModel.getOne({ wsId: ws.id });
  const room = roomModel.getOne({ owner: user.id });

  if (!room) {
    return sendToUser(io, ws, user.id, {
      type: 'message',
      data: { type: 'error', message: 'Somente o lider da sala pode iniciar a partida' },
    });
  }

  const users = userRoomModel.getAll({ room: room.id, active: true });

  if (users.length <= 1) {
    return sendToUser(io, ws, user.id, {
      type: 'message',
      data: { type: 'error', message: 'É necessário pelo menos 2 jogadores' },
    });
  }

  const session = sessionModel.insert({ room: room.id, active: true });

  users.map((item) => sessionUserModel.insert({ session, user: item.id, active: true }));

  const currentUser = _getRandomUser(session);

  sessionMatchModel.insert({ session, currentUser, active: true });

  sendToRoom(io, ws, user.id, { type: 'message', data: { type: 'success', message: 'Partida iniciando' } });

  sendGameStatus(io, ws, 'room');
};

export const updateGame: Types.UpdateGameFunc = (io, ws) => (time) => {
  const userRoomModel = Model<DBTypes.UserRoom>('userRoom');
  const userModel = Model<DBTypes.User>('users');
  const sessionModel = Model<DBTypes.Session>('sessions');
  const sessionUserModel = Model<DBTypes.SessionUser>('sessionUser');
  const sessionMatchModel = Model<DBTypes.SessionMatch>('sessionMatch');
  const sessionMatchTimeModel = Model<DBTypes.SessionMatchTimes>('sessionMatchTime');

  const user = userModel.getOne({ wsId: ws.id });
  const userRoom = userRoomModel.getOne({ user: user.id });
  const session = sessionModel.getOne({ room: userRoom.room, active: true });
  const sessionMatch = sessionMatchModel.getOne({ session: session.id, active: true });
  sessionMatchTimeModel.insert({ sessionMatch: sessionMatch.id, time, user: user.id });

  const userTotalTime = _calculateTimeUser(sessionMatch.id, user.id);

  if (userTotalTime >= 30) {
    const sessionUser = sessionUserModel.getOne({ session: session.id, user: user.id });
    sessionUserModel.update(sessionUser.id, { active: false });
    sessionMatchModel.update(sessionMatch.id, { active: false, loser: user.id });

    const activeUsers = sessionUserModel.getAll({ session: session.id, active: true });
    if (activeUsers.length === 1) {
      sessionModel.update(session.id, { winner: activeUsers?.[0]?.user, active: false });
      sendToUser(io, ws, activeUsers?.[0]?.user, {
        type: 'message',
        data: { type: 'success', message: 'Você ganhou' },
      });
      sendToUser(io, ws, user.id, { type: 'message', data: { type: 'error', message: 'Você perdeu' } });
    } else {
      const currentUser = _getRandomUser(session.id);
      sessionMatchModel.insert({ active: true, session: session.id, currentUser });

      sendToUser(io, ws, user.id, { type: 'message', data: { type: 'error', message: 'Você perdeu' } });
    }
  } else {
    const currentUser = _getRandomUser(session.id);
    sessionMatchModel.update(sessionMatch.id, { currentUser });
  }

  sendGameStatus(io, ws, 'room');
};

export const userLostConenction: Types.UserLostConnectionFunc = (io, ws) => () => {
  const userRoomModel = Model<DBTypes.UserRoom>('userRoom');
  const roomModel = Model<DBTypes.Room>('rooms');
  const userModel = Model<DBTypes.User>('users');

  const user = userModel.getOne({ wsId: ws.id });

  if (!user) return;

  const userRoom = userRoomModel.getOne({ user: user.id });

  if (!userRoom) return;

  userRoomModel.update(userRoom.id, { active: false });

  const newOwner = userRoomModel.getOne({ room: userRoom.room, active: true });

  if (!newOwner) return;

  roomModel.update(userRoom.room, { owner: newOwner.user });

  sendToRoom(io, ws, newOwner.user, {
    type: 'message',
    data: {
      type: 'error',
      message: 'Um jogador saiu da sala',
    },
  });

  sendToUser(io, ws, newOwner.user, {
    type: 'message',
    data: { type: 'success', message: 'Você é o novo lider da sala' },
  });

  sendGameStatus(io, ws, 'room');
};

export const endGame: Types.EndGameFunc = (io, ws) => () => {};

const sendGameStatus = (io: Server, ws: Socket, sendTo: 'user' | 'room') => {
  const roomModel = Model<DBTypes.Room>('rooms');
  const userRoomModel = Model<DBTypes.UserRoom>('userRoom');
  const userModel = Model<DBTypes.User>('users');
  const sessionModel = Model<DBTypes.Session>('sessions');
  const sessionUserModel = Model<DBTypes.SessionUser>('sessionUser');
  const sessionMatchModel = Model<DBTypes.SessionMatch>('sessionMatch');

  let game: Partial<GameTypes.Game> = {};

  const userSession = userModel.getOne({ wsId: ws.id });

  const userRoom = userRoomModel.getOne({ user: userSession.id });

  if (userRoom) {
    const room = roomModel.getOne({ id: userRoom.room });
    const usersRoom = userRoomModel.getAll({ room: userRoom.room, active: true });

    const users = usersRoom.map((item) => userModel.getOne({ id: item.user }));

    game.room = room.id;
    game.owner = room.owner;
    game.users = users;

    const session = sessionModel.getOne({ room: userRoom.room, active: true });

    if (session) {
      const match = sessionMatchModel.getOne({ session: session.id, active: true });

      if (match) {
        game.running = true;
        game.currentUser = match.currentUser;
      }

      const activeUsers = sessionUserModel.getAll({ session: session.id, active: true });

      game.activeUsers = activeUsers.map((item) => item.user);

      if (session.winner) {
        game.winner = session.winner;
        game.running = false;
      }
    }
  }

  sendTo === 'user'
    ? sendToUser(io, ws, userSession.id, { type: 'gameStatus', data: game })
    : sendToRoom(io, ws, userSession.id, { type: 'gameStatus', data: game });
};

const sendToUser = (io: Server, ws: Socket, userId: number, message: Types.Message) => {
  const userModel = Model<DBTypes.User>('users');

  const user = userModel.getOne({ id: userId });

  io.to(user.wsId).emit(message.type, message.data);
};

const sendToRoom = (io: Server, ws: Socket, userId: number, message: Types.Message) => {
  const userRoomModel = Model<DBTypes.UserRoom>('userRoom');

  const userRoom = userRoomModel.getOne({ user: userId });

  io.to('room_' + userRoom.room).emit(message.type, message.data);
};

const _getRandomUser = (sessionId: number): number | null => {
  const sessionUserModel = Model<DBTypes.SessionUser>('sessionUser');
  const sessionMatchModel = Model<DBTypes.SessionMatch>('sessionMatch');
  const sessionMatchTimeModel = Model<DBTypes.SessionMatchTimes>('sessionMatchTime');

  const users = sessionUserModel.getAll({ session: sessionId, active: true });
  const sessionMatch = sessionMatchModel.getOne({ session: sessionId, active: true });

  if (!sessionMatch) {
    return users?.[0]?.user;
  }

  const playedUsers = sessionMatchTimeModel.getAll({ sessionMatch: sessionMatch.id }).map((item) => item.user);

  const lastUser = playedUsers?.[playedUsers.length - 1];

  const lastUserIndex = users.findIndex((item) => item.user === lastUser);

  const nextIndex = users.length - 1 === lastUserIndex ? 0 : lastUserIndex + 1;

  return users?.[nextIndex]?.user;
};

const _calculateTimeUser = (sessionMatchId: number, userId: number) => {
  const sessionMatchTimeModel = Model<DBTypes.SessionMatchTimes>('sessionMatchTime');

  const sessionMatchTimes = sessionMatchTimeModel.getAll({ user: userId, sessionMatch: sessionMatchId });

  const totalTime = sessionMatchTimes.reduce((acc, item) => acc + item.time, 0);

  return totalTime / 1000;
};
