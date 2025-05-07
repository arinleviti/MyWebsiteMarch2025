import { AfterViewInit, Component, ElementRef, inject, OnInit, output, signal, ViewChild } from '@angular/core';
import { ProfileImageComponent } from '../profile-image/profile-image.component';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { AssetLoaderService } from '../_services/asset-loader.service';


@Component({
  selector: 'app-hero',
  imports: [ProfileImageComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('backgroundVideoElement') backgroundVideoElement!: ElementRef; // Reference to the video container
  assetLoader = inject(AssetLoaderService); // Inject the AssetLoaderService to preload assets


  video: HTMLVideoElement | undefined;

  ngAfterViewInit() {
    const url = '/bgvideo.webm';
    const video = this.assetLoader.getVideoElement(url);
  
    if (!video) {
      console.error('Video not available yet.');
      return;
    }
  
    // Clone and configure
    this.video = video.cloneNode(true) as HTMLVideoElement;
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;
    this.video.style.position = 'absolute';
    this.video.style.zIndex = '-1';
    this.video.style.top = '0';
    this.video.style.left = '50%';
    this.video.style.translate = '-50%';
    this.video.style.width = '100%';
    this.video.style.minHeight = '100%';
    this.video.style.objectFit = 'cover';
  
    this.backgroundVideoElement.nativeElement.appendChild(this.video);
  
    this.video.play().catch(e => console.log('Autoplay issue:', e));

    // Fallback: listen for first swipe/touch to play
   /*  window.addEventListener('touchstart', this.tryPlayOnce, { once: true }); */
  }

  playVideo() {
    if (!this.video) return;
    if (this.video.paused) {
      this.video.play().catch(e => console.log('Auto-play prevented:', e));   
    } else {
      this.video.pause(); // Pause the video if it's playing
    }
  }

}

 
 






