import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from "~shared/components/ui/button/button.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, ButtonComponent],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Logging in with', this.email, this.password);
  }
}
