import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-consent',
  imports: [],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.css'
})
export class CookieConsentComponent implements OnInit {
  ngOnInit() {
    this.loadScript();
  }

  private loadScript() {
    // Load the cookie consent script
    const script = document.createElement('script');
    script.src = '//www.freeprivacypolicy.com/public/cookie-consent/4.2.0/cookie-consent.js';
    script.charset = 'UTF-8';
    script.async = true;
    document.body.appendChild(script);

    // Initialize after script loads
    script.onload = () => {
      this.initializeCookieConsent();
    };
  }

  private initializeCookieConsent() {
    (window as any).cookieconsent.run({
      "notice_banner_type":"simple",
      "consent_type":"express",
      "palette":"light", 
      "language":"en",
      "page_load_consent_levels":["strictly-necessary"],
      "notice_banner_reject_button_hide":false,
      "preferences_center_close_button_hide":false,
      "page_refresh_confirmation_buttons":false,
      "website_name":"arinleviti.site"
    });
  }
}
