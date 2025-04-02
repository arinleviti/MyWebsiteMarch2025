import { Component, inject, TemplateRef } from '@angular/core';
import { PrivacyComponent } from "../modals/privacy/privacy.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  constructor(private modalService: BsModalService) {}

  openPrivacyModal() {
    this.modalService.show(PrivacyComponent, {
      class: 'modal-lg',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }
}
