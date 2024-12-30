import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
];
