import { Component, inject } from '@angular/core';

import { ButtonComponent } from '#/app/components/button/button.component';
import { TextInputComponent } from '#/app/components/text-input/text-input.component';
import { GameService } from '#/app/services/game.service';

@Component({
  selector: 'page-register-room-form',

  imports: [TextInputComponent, ButtonComponent],

  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css',
})
export class RoomFormComponent {
  room: string = '';

  private game = inject(GameService);

  handleOnChange = (value: string) => {
    this.room = value;
  };

  handleOnEnterRoom = () => {
    this.game.handleOnEnterRoom(this.room);
  };

  handleOnCreateRoom = () => {
    this.game.handleOnCreateRoom();
  };
}
