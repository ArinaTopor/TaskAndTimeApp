import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NAME } from '../submodule';
import { TextControlComponent } from './modules/components/text-control.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TextControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = NAME;
}
