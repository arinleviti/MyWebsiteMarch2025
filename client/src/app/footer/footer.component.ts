import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PrivacyComponent } from "../modals/privacy/privacy.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieConsentComponent } from "../cookie-consent/cookie-consent.component";
import { AnalyticsService } from '../_services/analytics.service';

@Component({
  selector: 'app-footer',
  imports: [CookieConsentComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  constructor(private modalService: BsModalService) {}
  
  analyticsService = inject(AnalyticsService);

  openPrivacyModal() {
    this.modalService.show(PrivacyComponent, {
      class: 'modal-lg',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

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
    if (video ) {
      video.play().catch(error => console.error("Autoplay blocked", error));
    }
  }


  ngOnInit(){
    this.analyticsService.trackEvent('footer', 'footer loaded', 'footer loaded');

  }
 
}
