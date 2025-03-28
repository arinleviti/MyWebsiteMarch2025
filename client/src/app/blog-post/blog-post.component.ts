import { Component, inject, input, OnInit, signal } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { BlogPost } from '../models/blog-post.model';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PhotoModalComponent } from '../modals/photo-modal/photo-modal.component';

@Component({
  selector: 'app-blog-post',
  imports: [DatePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent {

  post = input<BlogPost | null>(null);
  private modalService = inject(BsModalService);
  
  photoModalRef: BsModalRef<PhotoModalComponent> = new BsModalRef<PhotoModalComponent>();

  openModal(photoUrl: string) {
    const initialState = {
      imageUrl: photoUrl
    };
    this.photoModalRef = this.modalService.show(PhotoModalComponent, {initialState});
  }

  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src =
      'https://res.cloudinary.com/dvr9t29vj/image/upload/v1743176287/vecteezy_user-icon-on-transparent-background_19879186_1_ynjssy.png'; // ✅ Standard Angular path
  }
}
