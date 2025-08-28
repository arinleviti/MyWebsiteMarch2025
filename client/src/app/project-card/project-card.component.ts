import { Component, Input, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AssetLoaderService } from '../_services/asset-loader.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf]
})
export class ProjectCardComponent implements AfterViewInit {
  @Input() project: any;
  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;

  private assetLoader = inject(AssetLoaderService);
  private video!: HTMLVideoElement;

  ngAfterViewInit() {
    // create a fresh video element for each card
    this.video = document.createElement('video');
    this.video.src = this.project.videoUrl;
    this.video.poster = this.project.posterUrl;
    this.video.muted = true;
    this.video.loop = true;
    this.video.playsInline = true;
    this.video.setAttribute('playsinline', '');
    this.video.style.width = '100%';
    this.video.style.height = '100%';
    this.video.style.objectFit = 'cover';
    this.video.style.display = 'block';
    this.video.style.transition = 'transform 0.3s ease';

    this.videoContainer.nativeElement.appendChild(this.video);
  }

  playVideo() {
    if (!this.video) return;
    this.video.play().catch(() => {}); // only plays after user interaction
  }
/*  playVideo() {
    if (!this.video.src) {
      // only load the video file when needed
      this.video.src = this.project.videoUrl;
      this.video.load();
    }
    this.video.play().catch(() => {});
  } */
  pauseVideo() {
    if (!this.video) return;
    this.video.pause();
    this.video.currentTime = 0;
  }
}
