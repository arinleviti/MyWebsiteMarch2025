import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar.component";
import { HeroComponent } from "../hero/hero.component";
import { JourneyComponent } from "../journey/journey.component";
import { MonsterMatchComponent } from "../monster-match/monster-match.component";
import { FinalBattleComponent } from "../final-battle/final-battle.component";
import { ExperienceComponent } from "../experience/experience.component";
import { BlogCarouselComponent } from "../blog-carousel/blog-carousel.component";
import { EducationComponent } from "../education/education.component";

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, HeroComponent, JourneyComponent, MonsterMatchComponent, FinalBattleComponent, ExperienceComponent, BlogCarouselComponent, EducationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
