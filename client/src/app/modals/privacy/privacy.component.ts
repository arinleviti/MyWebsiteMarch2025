import { NgFor } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-privacy',
  imports: [ModalModule, NgFor],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {
  constructor(public modalRef: BsModalRef) {}
  
  // Your privacy policy content here
  policySections = [
    "1. Introduction This Privacy Policy explains how your data is handled when you visit my website, in compliance with GDPR (Regulation EU 2016/679) and Italian privacy laws. This website is a static portfolio showcasing my work. It uses Google Analytics to monitor website performance and user interactions but does not collect or store personal information unless you voluntarily submit a comment on a blog post. ",
    "2. Data Collected Comments: When you submit a comment on a blog post, the following information is processed solely to display your comment: The name or nickname you provide. The content of your comment. No other personal data, such as email addresses or IP addresses, is collected, stored, or processed. Website Analytics: Google Analytics collects anonymized data about your visit to this website. This may include: Pages viewed and time spent on the website. Device and browser type. General geographic location (city or country level). Referring websites or search terms used to find the website. This data is anonymized and aggregated to analyze website traffic and improve user experience. No personally identifiable information (PII) is collected.",
    "3. Purpose of Data Collection Comments: The information you provide in the comment form is used exclusively to display your comment on the website. Website Analytics: The anonymized data collected via Google Analytics is used to analyze website performance and improve content.",
    "4. Cookies and Tracking This website uses cookies for Google Analytics. Upon visiting the site, you will be prompted to consent to the use of cookies. If you decline, no analytics cookies will be stored, and tracking will be disabled.",
    "5. Third-Party Services Google Analytics: Google Analytics processes anonymized data about website usage. Google’s privacy policy is available at https://policies.google.com/privacy. Cookie Consent Tool: This website uses a cookie consent tool to manage user preferences regarding cookies. The tool ensures that no analytics cookies are stored without your consent.",
    "6. User Rights Under GDPR, you have the following rights: To request information about the data collected. To withdraw consent for cookies and tracking. To request the deletion of any comments you have submitted. For any requests, please contact me at the email provided below.",
    "7. Contact If you have questions or concerns about this Privacy Policy, feel free to contact me: Arin Leviti Email: arin.leviti@gmail.com"
    // Add all your policy sections
  ];
  
}
