import { Component, inject, OnInit, } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostComponent } from "../blog-post/blog-post.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-blog-page',
  imports: [BlogPostComponent, PaginationModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent  {
  
 blogService = inject(BlogService)
  blogPosts: BlogPost[] = [];
  isLoggedIn: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalItems: number = 0; // Total number of items for pagination

  ngOnInit(): void {
    /* this.loadPosts(); */
    this.isAdminLoggedIn();
    this.loadPaginatedPosts();
  }
  loadPaginatedPosts() {
    this.blogService.getPaginatedPosts(this.pageNumber, this.pageSize).subscribe({
      next: (paginatedResult) => {
        this.blogPosts = paginatedResult.items;
        this.totalItems = paginatedResult.pagination.totalItems;  // Set the total items for pagination
      },
      error: (err) => {
        console.error('Error loading blog posts:', err);
      }
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadPaginatedPosts(); // Reload posts with the updated page number
  }
  /* not used anymore */
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
 
  isAdminLoggedIn(): boolean {
  if(sessionStorage.getItem('editAuth') === 'true')  
  this.isLoggedIn = true;
    return this.isLoggedIn;
  }
 }

