import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from "./nav-bar.component";
import { HeroComponent } from "./hero/hero.component";
import { JourneyComponent } from "./journey/journey.component";
import { FinalBattleComponent } from "./final-battle/final-battle.component";
import { MonsterMatchComponent } from "./monster-match/monster-match.component";
import { ExperienceComponent } from "./experience/experience.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, NavBarComponent, HeroComponent, JourneyComponent, FinalBattleComponent, MonsterMatchComponent, ExperienceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
