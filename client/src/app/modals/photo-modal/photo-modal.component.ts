import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-photo-modal',
  imports: [ModalModule],
  templateUrl: './photo-modal.component.html',
  styleUrl: './photo-modal.component.css'
})
export class PhotoModalComponent {
  imageUrl: string = '';
  modalRef= inject (BsModalRef);
  // Close the modal
  close() {
    this.modalRef.hide(); // This hides the modal
  }
}
