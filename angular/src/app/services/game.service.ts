import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import io, { Socket } from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';

import * as GameTypes from 'types/game';

import { environment } from '../../environments/environment';

const WS_URI = environment.WS_URI;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private socket: Socket = io(WS_URI);

  connected: boolean = false;
  game?: Partial<GameTypes.Game> = {};
  user?: number;

  constructor(private router: Router, private _toastService: ToastService) {
    this.socket.on('connect', () => {
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
      this.game = undefined;
      this.user = undefined;
    });

    this.socket.on('message', this.onMessage);
  }

  onMessage = (data: GameTypes.Message) => {
    this._toastService?.[data.type](data.message);
  };

  handleOnCreateUser = (name: string) => {
    this.socket.emit('createUser', name);
  };

  handleOnCreateRoom = () => {
    this.socket.emit('createRoom');
  };

  handleOnEnterRoom = (room: string) => {
    this.socket.emit('enterRoom', room);
  };

  handleOnStartGame = () => {
    this.socket.emit('startGame');
  };

  handleOnUpdateGame = async (time: number) => {
    this.socket.emit('updateGame', time);
  };

  handleOnEndGame = async () => {};

  onCreatedUser = (observer: Subscriber<number>) => (data: { id: number }) => {
    this.user = data.id;
    observer.next(data.id);
  };

  onGameStatus =
    (observer: Subscriber<GameTypes.Game>) => (game: GameTypes.Game) => {
      if (!this.game?.running && game.running) {
        this.router.navigate(['/game']);
      }

      this.game = game;

      observer.next(game);
    };

  observerUser = () => {
    return new Observable((observer) => {
      this.socket.on('createdUser', this.onCreatedUser(observer));
    });
  };

  observerGame = () => {
    return new Observable((observer) => {
      this.socket.on('gameStatus', this.onGameStatus(observer));
    });
  };
}
