import { AfterViewInit, Component, ElementRef, inject, OnInit, output, signal, ViewChild } from '@angular/core';
import { ProfileImageComponent } from '../profile-image/profile-image.component';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { AssetLoaderService } from '../_services/asset-loader.service';


@Component({
  selector: 'app-hero',
  imports: [ProfileImageComponent, NgIf],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('backgroundVideoElement') backgroundVideoElement!: ElementRef; // Reference to the video container
  assetLoader = inject(AssetLoaderService); // Inject the AssetLoaderService to preload assets

  video: HTMLVideoElement | undefined;

  ngAfterViewInit() {
    this.loadAndAppendVideo();  // Load and append the video
  }

  loadAndAppendVideo() {
    const videoUrl = 'https://res.cloudinary.com/dvr9t29vj/video/upload/v1742823869/266049_tiny_bkjizq.webm';
    this.video = this.assetLoader.getVideoUrl(videoUrl);
    console.log('Retrieved video:', this.video); // Debug line
    if (this.video) {
      // Configure video properties
      this.video.autoplay = true;
      this.video.loop = true;
      this.video.muted = true;
      this.video.style.position = 'absolute';
      this.video.style.zIndex = '-1'; // Ensure the video is behind other elements
      this.video.style.top = '0';
    this.video.style.left = '50%';
    this.video.style.translate = '-50%'; // Center the video horizontally
    this.video.style.width = '100%'; // Full width
    this.video.style.minHeight = '100%'; // Full height
    this.video.style.objectFit = 'cover'; // Cover the entire area
      
      // Append to container
      this.backgroundVideoElement.nativeElement.appendChild(this.video);
      
      // Try to play programmatically (may be required on some mobile devices)
      this.video.play().catch(e => console.log('Auto-play prevented:', e));
    } else {
      console.error('Failed to retrieve video element');
    }
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





