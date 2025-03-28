import { Component, inject, input, OnInit, signal } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog-post',
  imports: [],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent  {
  
 post = input<BlogPost | null>(null);
 setDefaultImage(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = 'https://res.cloudinary.com/dvr9t29vj/image/upload/v1743176287/vecteezy_user-icon-on-transparent-background_19879186_1_ynjssy.png'; // ✅ Standard Angular path
}
 
}




