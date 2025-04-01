import { Component, inject, OnInit, } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostComponent } from "../blog-post/blog-post.component";


@Component({
  selector: 'app-blog-page',
  imports: [BlogPostComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent  {
  
  private blogService = inject(BlogService)
  blogPosts: BlogPost[] = [];
  
  ngOnInit(): void {
    this.loadPosts();
  }
  
  loadPosts() {
    this.blogService.getBlogPosts().subscribe({
      next: (blogPosts: BlogPost[]) => {
        this.blogPosts= [...blogPosts].sort((a, b) => 
           b.id! - a.id!
        )
       
        console.log(this.blogPosts);
      },
      error: (err) => {
        console.error('Error loading blog posts:', err);
      }
    })
  }
 
}
