import { Component, inject } from '@angular/core';

import { ButtonComponent } from '#/app/components/button/button.component';
import { TextInputComponent } from '#/app/components/text-input/text-input.component';
import { GameService } from '#/app/services/game.service';

@Component({
  selector: 'page-register-user-form',
  imports: [TextInputComponent, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  user: string = '';

  private game = inject(GameService);

  handleOnChange = (value: string) => {
    this.user = value;
  };

  handleOnNext = () => {
    this.game.handleOnCreateUser(this.user);
  };
}
