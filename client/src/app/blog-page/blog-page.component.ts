import { Component, inject, OnInit, } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { BlogPost } from '../models/blog-post.model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-blog-page',
  imports: [],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent implements OnInit {
  
  private blogService = inject(BlogService)
  blogPosts: BlogPost[] = [];
  
  ngOnInit(): void {
    this.loadPosts();
  }
  
  loadPosts() {
    this.blogService.getBlogPosts().subscribe({
      next: (blogPosts: BlogPost[]) => {
        this.blogPosts = blogPosts
      },
      error: (err) => {
        console.error('Error loading blog posts:', err);
      }
    })
  }
}
