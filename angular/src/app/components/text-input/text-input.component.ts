import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'component-text-input',
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  @Output() change = new EventEmitter<string>();

  handleOnChange = (e: Event) => {
    e.stopPropagation();
    const input = e.target as HTMLInputElement;

    this.change.emit(input.value);
  };
}
