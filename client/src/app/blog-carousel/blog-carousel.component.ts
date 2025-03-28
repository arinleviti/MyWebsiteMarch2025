import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BlogPost } from '../models/blog-post.model';
import { BlogService } from '../_services/blog.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-blog-carousel',
  imports: [CarouselModule, RouterLink, FontAwesomeModule],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.css'
})
export class BlogCarouselComponent implements OnInit{
blogService = inject(BlogService);

blogsForCarousel: BlogPost[] = [];

 ngOnInit(): void {
  
  this.blogService.getBlogPosts().subscribe({ 
    next: (posts: BlogPost[]) => {
      this.blogsForCarousel = posts;
    },
    error: (err) => {
      console.error('error loading blog posts in carousel', err);
    }
  
     
  })};
 
  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://res.cloudinary.com/dvr9t29vj/image/upload/v1743176287/vecteezy_user-icon-on-transparent-background_19879186_1_ynjssy.png'; // ✅ Standard Angular path
  }
  
}
