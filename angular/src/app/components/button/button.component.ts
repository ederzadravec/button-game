import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() disabled!: boolean;
}
