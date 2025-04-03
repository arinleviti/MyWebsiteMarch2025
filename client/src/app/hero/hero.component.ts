import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ProfileImageComponent } from '../profile-image/profile-image.component';

@Component({
  selector: 'app-hero',
  imports: [ProfileImageComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
  /* ViewChild('backgroundVideo') Gets a reference to the <video #backgroundVideo> element in the template. 
  ElementRef<HTMLVideoElement> ensures TypeScript knows this is a <video> element.*/
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;

  isVideoOn: Boolean = false;
  ngAfterViewInit() {
    const video = this.backgroundVideo.nativeElement;
    if (video) {
      video.play().catch(error => {
        console.error("Autoplay blocked", error);
        this.enablePlayOnUserInteraction();
        this.isVideoOn = true;
      });
    }
  }
  
  enablePlayOnUserInteraction() {
    window.addEventListener('scroll', this.playVideoOnInteraction.bind(this), { once: true });
    window.addEventListener('click', this.playVideoOnInteraction.bind(this), { once: true });
  }

  playVideoOnInteraction() {
    const video = this.backgroundVideo?.nativeElement;
    if (video && !this.isVideoOn) {
      this.isVideoOn = true;
      video.play().catch(error => console.error("Autoplay blocked", error));
    }
    else if (video && this.isVideoOn) {
      this.isVideoOn = false;
      video.pause();
    }
  }


}
