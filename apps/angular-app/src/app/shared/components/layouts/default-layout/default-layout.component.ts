import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-default-layout',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

}
