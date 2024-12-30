import { Component, inject, OnInit } from '@angular/core';
import { differenceInMilliseconds, isThisMinute } from 'date-fns';

import { GameService } from '#/app/services/game.service';
import * as GameTypes from 'types/game';

@Component({
  selector: 'page-game-button-game',
  imports: [],
  templateUrl: './button-game.component.html',
  styleUrl: './button-game.component.css',
})
export class ButtonGameComponent implements OnInit {
  private gameService = inject(GameService);

  game?: Partial<GameTypes.Game>;
  showButton: boolean = false;
  activeButton: boolean = false;
  date?: Date;

  ngOnInit(): void {
    this.processGame(this.gameService.game as GameTypes.Game);

    this.gameService.observerGame().subscribe((result) => {
      const game = result as GameTypes.Game;
      this.processGame(game);
    });
  }

  processGame = (game: GameTypes.Game) => {
    this.game = game;

    this.showButton = game.currentUser === this.gameService.user;

    if (!this.showButton) return;

    const ramdomTimeout = Math.floor(Math.random() * 2000);

    setTimeout(() => {
      console.log('executou o timeout');

      this.activeButton = true;
      this.date = new Date();
    }, ramdomTimeout);
  };

  handleOnClick = () => {
    if (!this.activeButton) return;

    const time = differenceInMilliseconds(new Date(), this!.date!);

    this.gameService.handleOnUpdateGame(time);

    this.activeButton = false;
    this.date = undefined;
  };
}
