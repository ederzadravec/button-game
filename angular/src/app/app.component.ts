import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularToastifyModule } from 'angular-toastify';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularToastifyModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
}
