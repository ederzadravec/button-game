import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { GameService } from '#/app/services/game.service';
import * as GameTypes from 'types/game';
import { Observer, Subscriber } from 'rxjs';

@Component({
  selector: 'page-game-players',
  imports: [],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent implements OnInit {
  private gameService = inject(GameService);

  currentUser?: number;
  activeUsers: GameTypes.GameUser[] = [];
  inactiveUsers: GameTypes.GameUser[] = [];

  ngOnInit(): void {
    this.processGame(this.gameService.game as GameTypes.Game);

    this.gameService.observerGame().subscribe((result) => {
      const game = result as GameTypes.Game;

      this.processGame(game);
    });
  }

  processGame = (game: GameTypes.Game) => {
    this.currentUser = game.currentUser;

    this.activeUsers = game?.users?.filter((item) =>
      game?.activeUsers?.includes?.(item.id)
    );

    this.inactiveUsers = game?.users?.filter(
      (item) => !game?.activeUsers?.includes?.(item.id)
    );
  };
}
