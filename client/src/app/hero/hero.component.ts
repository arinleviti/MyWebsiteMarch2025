import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ProfileImageComponent } from '../profile-image/profile-image.component';

@Component({
  selector: 'app-hero',
  imports: [ProfileImageComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.backgroundVideo.nativeElement;
    if (video) {
      video.play().catch(error => {
        console.error("Autoplay blocked", error);
        this.enablePlayOnUserInteraction();
      });
    }
  }
  
  enablePlayOnUserInteraction() {
    window.addEventListener('scroll', this.playVideoOnInteraction.bind(this), { once: true });
    window.addEventListener('click', this.playVideoOnInteraction.bind(this), { once: true });
  }

  playVideoOnInteraction() {
    const video = this.backgroundVideo?.nativeElement;
    if (video) {
      video.play().catch(error => console.error("Autoplay blocked", error));
    }
  }


}
