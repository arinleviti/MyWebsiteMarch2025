import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BlogPost } from '../models/blog-post.model';
import { BlogService } from '../_services/blog.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { map } from 'rxjs';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-carousel',
  imports: [CarouselModule, FontAwesomeModule, NgFor, RouterLink],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.css'
})
export class BlogCarouselComponent implements OnInit{
blogService = inject(BlogService);

postsForCarousel: BlogPost[] = [];
itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  slidesChangeMessage = '';
slides : {image: string, title: string |undefined}[] = [];



  ngOnInit(): void {
    this.blogService.getBlogPosts().subscribe({
      next: (posts: BlogPost[]) => {
        this.postsForCarousel = posts;
        this.postsForCarousel = this.postsForCarousel.sort((a, b) =>
          b.id! - a.id!
        );
        this.slides = this.postsForCarousel.map((post) => ({
          image: post.photos && post.photos.length > 0 && post.photos[0].url
            ? post.photos[0].url
            : 'https://res.cloudinary.com/dvr9t29vj/image/upload/v1743176287/vecteezy_user-icon-on-transparent-background_19879186_1_ynjssy.png',
          title: post.title,
        }));

        console.log('Slides:', this.slides); // Debugging
      },
      error: (err) => {
        console.error('Error loading blog posts in carousel', err);
      },
    });
  }
  onSlideRangeChange(indexes: number[]|void): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }
 
  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://res.cloudinary.com/dvr9t29vj/image/upload/v1743176287/vecteezy_user-icon-on-transparent-background_19879186_1_ynjssy.png'; // ✅ Standard Angular path
  }
  
}
