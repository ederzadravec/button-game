import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '#/app/services/game.service';
import * as GameTypes from 'types/game';

import { ButtonGameComponent } from './components/button-game/button-game.component';
import { PlayersComponent } from './components/players/players.component';

@Component({
  selector: 'app-game',
  imports: [ButtonGameComponent, PlayersComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  private gameService = inject(GameService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.validGame(this.gameService.game as GameTypes.Game);

    this.gameService.observerGame().subscribe((result) => {
      const game = result as GameTypes.Game;

      this.validGame(game);
    });
  }

  validGame = (game: GameTypes.Game) => {
    if (!game?.running) {
      this.router.navigate(['/']);
    }
  };
}
