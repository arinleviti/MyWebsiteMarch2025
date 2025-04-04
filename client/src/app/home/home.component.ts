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

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, HeroComponent, JourneyComponent, MonsterMatchComponent, FinalBattleComponent, ExperienceComponent, BlogCarouselComponent, EducationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videoReady: boolean = false;
  assetLoader = inject(AssetLoaderService);
  imagesLoaded = false;
  imagesUrls = [
    'https://res.cloudinary.com/dvr9t29vj/image/upload/v1742809780/aragonai-9a4d9777-c4a5-49a7-9ff9-b8f2ed4fc6a6_mvdem8.jpg']
  videosUrls = ['https://res.cloudinary.com/dvr9t29vj/video/upload/v1742823869/266049_tiny_bkjizq.webm']

  //preload images and videos
  ngOnInit() {
    const imagePromises = this.imagesUrls.map(url => {
      console.log(`Preloading image: ${url}`);
      return this.assetLoader.preloadImage(url);
    });

    const videoPromises = this.videosUrls.map(url => {
      console.log(`Preloading video: ${url}`);
      return this.assetLoader.preloadVideo(url);
    });

   // Wait for all assets to be loaded
   Promise.all([...imagePromises, ...videoPromises])
   .then(() => {
    console.log('All assets loaded successfully');
     this.assetLoader.assetsReady.next(true);  // Notify that all assets are ready
     this.imagesLoaded = true;
   })
   .catch((err) => {
   
     console.error('Error loading assets', err);
     this.assetLoader.assetsReady.next(false);  // Notify of failure
   });
  }

}

