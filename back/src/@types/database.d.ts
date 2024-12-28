export interface BaseTable {
  id: number;
}

export interface Room extends BaseTable {
  owner: number; // user.id
  active: boolean;
}

export interface UserRoom extends BaseTable {
  user: number;
  room: number;
  active: boolean;
}

export interface User extends BaseTable {
  name: string;
  wsId: string;
}

export interface Session extends BaseTable {
  room: number;
  winner?: number;
  active: boolean;
}

export interface SessionMatch extends BaseTable {
  session: number;
  active: boolean;
  loser?: number; // user.id
  currentUser?: number;
}

export interface SessionUser extends BaseTable {
  session: number;
  active: boolean;
  user: number;
}

export interface SessionMatchTimes extends BaseTable {
  sessionMatch: number;
  user: number;
  time: number;
}

export type Model = <T extends BaseTable>(name: string) => ModelFunc<T>;

export interface ModelFunc<T> {
  getOne: (filter?: Partial<T>) => T | undefined;
  getAll: (filter?: Partial<T>) => T[];
  insert: (data: Omit<T, 'id'>) => number | undefined;
  update: (id: number, data: Partial<T>) => number | undefined;
  remove: (id: number) => number | undefined;
}
