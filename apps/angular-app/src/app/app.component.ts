import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  host: {
    class: 'text-foreground block antialiased',
  },
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-app';
}
