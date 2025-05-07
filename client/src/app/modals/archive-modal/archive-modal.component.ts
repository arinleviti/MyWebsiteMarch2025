import {  inject, input } from '@angular/core';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';
import {  CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-archive-modal',
  imports: [CommonModule, ModalModule],
  templateUrl: './archive-modal.component.html',
  styleUrl: './archive-modal.component.css'
})
export class ArchiveModalComponent {
 title = input<string>();
 message = input<string>();
 linkUrl = input<string>();

 title2 = input<string>();
 message2 = input<string>();
 linkUrl2 = input<string>();

 public modalRef = inject (BsModalRef); // Inject the modal reference for closing the modal
}
