import { Component, inject } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import { ArchiveModalComponent } from '../modals/archive-modal/archive-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expertise',
  imports: [ModalModule, CommonModule],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.css'
})
export class ExpertiseComponent {
  private modalService = inject(BsModalService); // Inject the modal service for opening modals

  bsModalRef: BsModalRef<ArchiveModalComponent> = new BsModalRef<ArchiveModalComponent>(); // Initialize the modal reference

  openArchiveModal() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Archive',
        message: 'Template for a burger restaurant. The site uses responsive design to look good on all devices.',
        linkUrl: 'https://heroic-lamington-f2f9a1.netlify.app/',
     /*    title2: 'Real-Time Dating App (Angular, Tutorial-Based Project)',
        message2: 'Skills Learned: WebSockets, Reactive Forms, Identity and Role Management, SignalR, Child to Parent and Parent to Child Communication, Route Guards, Pagination, Unit of Work Pattern, Caching. Login: Lisa, Password: Pa$$w0rd',
        linkUrl2: 'https://dating-app-course-baapdfdrfxbeeme4.italynorth-01.azurewebsites.net/' */
      }
    }
    this.bsModalRef = this.modalService.show(ArchiveModalComponent, initialState); // Open the modal with the specified initial state
  }
}
