export interface GameUser {
  id: number;
  name: string;
  time?: number
}

export interface Game {
  owner: number;
  room: number;
  winner?: number;

  running: boolean;
  currentUser: number;
  users: GameUser[];
  activeUsers: number[];
}
