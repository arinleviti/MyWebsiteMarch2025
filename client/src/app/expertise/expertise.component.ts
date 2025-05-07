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
        message: 'This the old version of my website, created with Razor Pages. While the design is outdated, it demonstrates backend logic and SQL integration that laid the foundation for my current full-stack skills.',
        linkUrl: 'https://mywebsitenov2024-bvgnhxfrcecmaaf9.italynorth-01.azurewebsites.net/',
        title2: 'Real-Time Dating App (Angular, Tutorial-Based Project)',
        message2: 'Skills Learned: WebSockets, Reactive Forms, Identity and Role Management, SignalR, Child to Parent and Parent to Child Communication, Route Guards, Pagination, Unit of Work Pattern, Caching. Login: Lisa, Password: Pa$$w0rd',
        linkUrl2: 'https://dating-app-course-baapdfdrfxbeeme4.italynorth-01.azurewebsites.net/'
      }
    }
    this.bsModalRef = this.modalService.show(ArchiveModalComponent, initialState); // Open the modal with the specified initial state
  }
}
