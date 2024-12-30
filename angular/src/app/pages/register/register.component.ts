import { Component, inject, OnInit } from '@angular/core';

import { GameService } from '#/app/services/game.service';
import * as GameTypes from 'types/game';

import { UserFormComponent } from './components/user-form/user-form.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { WaitingGameComponent } from './components/waiting-game/waiting-game.component';

@Component({
  selector: 'page-register',
  imports: [UserFormComponent, RoomFormComponent, WaitingGameComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  private gameService = inject(GameService);
  user?: number;
  game?: GameTypes.Game;

  ngOnInit() {
    this.user = this.gameService.user;
    this.game = this.gameService.game as GameTypes.Game;

    this.gameService.observerUser().subscribe((user: any) => {
      this.user = user;
    });

    this.gameService.observerGame().subscribe({
      next: (game: any) => {
        this.game = game;
      },
    });
  }
}
