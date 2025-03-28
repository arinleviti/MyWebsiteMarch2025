import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from "./nav-bar.component";
import { HeroComponent } from "./hero/hero.component";


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
