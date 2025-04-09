import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar.component";
import { HeroComponent } from "../hero/hero.component";
import { JourneyComponent } from "../journey/journey.component";
import { MonsterMatchComponent } from "../monster-match/monster-match.component";
import { FinalBattleComponent } from "../final-battle/final-battle.component";
import { ExperienceComponent } from "../experience/experience.component";
import { BlogCarouselComponent } from "../blog-carousel/blog-carousel.component";
import { EducationComponent } from "../education/education.component";
import { ActivatedRoute } from '@angular/router';
import { AssetLoaderService } from '../_services/asset-loader.service';
import { ExpertiseComponent } from "../expertise/expertise.component";

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, HeroComponent, JourneyComponent, MonsterMatchComponent, FinalBattleComponent, ExperienceComponent, BlogCarouselComponent, EducationComponent, ExpertiseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videoReady: boolean = false;
  assetLoader = inject(AssetLoaderService);
  imagesLoaded = false;
  assetsLoaded = false;
  imagesUrls = [
    'https://res.cloudinary.com/dvr9t29vj/image/upload/v1742809780/aragonai-9a4d9777-c4a5-49a7-9ff9-b8f2ed4fc6a6_mvdem8.jpg']
  videosUrls = ['/bgvideo.webm']

  //preload images and videos

  ngOnInit() {

    // Wake up Cloudinary
/*   fetch('https://res.cloudinary.com/dvr9t29vj/video/upload/v1742823869/266049_tiny_bkjizq.webm', {
    method: 'HEAD',
    mode: 'no-cors'
  }) .then(() => {
    console.log('🟢 Cloudinary video wake-up request sent successfully.');
  })
  .catch((err) => {
    console.log('🔴 Cloudinary video wake-up request failed:', err);
  }); */

    const imagePromises = this.imagesUrls.map(url => this.assetLoader.preloadImage(url));
    const videoPromises = this.videosUrls.map(url => this.assetLoader.preloadVideo(url));
  
    Promise.all([...imagePromises, ...videoPromises])
      .then(() => {
        this.assetsLoaded = true;
        this.assetLoader.assetsReady.next(true);
      })
      .catch(() => {
        this.assetsLoaded = true; // Allow page even if one asset fails
        this.assetLoader.assetsReady.next(true);
      });
  }

  
}

