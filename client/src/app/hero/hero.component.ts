import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ProfileImageComponent } from '../profile-image/profile-image.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ProfileImageComponent, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('backgroundVideoElement', { static: true }) backgroundVideoElement!: ElementRef<HTMLDivElement>;

  private translate = inject(TranslateService);
  video!: HTMLVideoElement;

  constructor() {
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(lang);
  }

  ngAfterViewInit() {
    this.createBackgroundVideo();
  }

  private createBackgroundVideo() {
    this.video = document.createElement('video');
    this.video.src = 'https://res.cloudinary.com/doydy0awd/video/upload/f_auto,q_auto/v1756472201/bgvideo_nrt3ps.webm';
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.preload = 'auto';

    Object.assign(this.video.style, {
      position: 'absolute',
      zIndex: '-1',
      top: '0',
      left: '50%',
      translate: '-50%',
      width: '100%',
      minHeight: '100%',
      objectFit: 'cover'
    });

    this.backgroundVideoElement.nativeElement.appendChild(this.video);
    this.video.play().catch(e => console.log('Autoplay prevented:', e));
  }

  playVideo() {
    if (!this.video) return;

    if (this.video.paused) {
      this.video.play().catch(e => console.log('Play prevented:', e));
    } else {
      this.video.pause();
    }
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}


/* import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ProfileImageComponent } from '../profile-image/profile-image.component';
import { AssetLoaderService } from '../_services/asset-loader.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ProfileImageComponent, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('backgroundVideoElement') backgroundVideoElement!: ElementRef;
  private assetLoader = inject(AssetLoaderService);
  private translate = inject(TranslateService);

  video?: HTMLVideoElement;

  constructor() {
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(lang);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  ngAfterViewInit() {
    const url = 'https://res.cloudinary.com/doydy0awd/video/upload/f_auto,q_auto/v1756472201/bgvideo_nrt3ps.webm';
    const video = this.assetLoader.getVideoElement(url);
    if (!video) return;

    this.video = video.cloneNode(true) as HTMLVideoElement;
    Object.assign(this.video.style, {
      position: 'absolute',
      zIndex: '-1',
      top: '0',
      left: '50%',
      translate: '-50%',
      width: '100%',
      minHeight: '100%',
      objectFit: 'cover'
    });
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;

    this.backgroundVideoElement.nativeElement.appendChild(this.video);
    this.video.play().catch(e => console.log('Autoplay prevented:', e));
  }

  playVideo() {
    if (!this.video) return;
    if (this.video.paused) this.video.play().catch(() => {});
    else this.video.pause();
  }
}
 */
 






