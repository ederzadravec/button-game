export interface GameUser {
  id: number;
  name: string;
}

export interface Game {
  owner: number;
  room: number;

  running: boolean;
  currentUser: number;
  users: GameUser[];
  activeUsers: number[];
}

export interface Message {
  type: "error" | "success";
  message: string;
}
