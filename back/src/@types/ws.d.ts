import { Server, Socket } from 'socket.io';
import * as DBTypes from './database';

export type CreateUserFunc = (io: Server, ws: Socket) => (name: string) => void;

export type CreateRoomFunc = (io: Server, ws: Socket) => () => void;

export type EnterRoomFunc = (io: Server, ws: Socket) => (room: string) => void;

export type StartGameFunc = (io: Server, ws: Socket) => (room: string) => void;

export type UpdateGameFunc = (io: Server, ws: Socket) => (time: number) => void;

export type UserLostConnectionFunc = (io: Server, ws: Socket) => () => void;

export type EndGameFunc = (io: Server, ws: Socket) => () => void;

export interface Message {
  type: string;
  data: any;
}

export interface GameStatus {
  running: boolean;
  currentUser: string;
  users: string[];
  matchNumber: number;
}
