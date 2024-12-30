import { Component, inject } from '@angular/core';

import { GameService } from '#/app/services/game.service';
import * as GameTypes from 'types/game';

import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'page-register-waiting-game',
  imports: [ButtonComponent],
  templateUrl: './waiting-game.component.html',
  styleUrl: './waiting-game.component.css',
})
export class WaitingGameComponent {
  private gameService = inject(GameService);
  game?: Partial<GameTypes.Game>;

  constructor() {
    this.game = this.gameService.game;

    this.gameService.observerGame().subscribe({
      next: (game: any) => {
        this.game = game;
      },
    });
  }

  handleOnStart = () => {
    this.gameService.handleOnStartGame();
  };
}
