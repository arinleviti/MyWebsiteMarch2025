import { Component, ElementRef, ViewChild, inject, OnInit, AfterViewInit } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostComponent } from "../blog-post/blog-post.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [BlogPostComponent, PaginationModule],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit, AfterViewInit {
  @ViewChild('backgroundVideoElement', { static: true }) backgroundVideoElement!: ElementRef<HTMLDivElement>;

  private blogService = inject(BlogService);
  video!: HTMLVideoElement;

  blogPosts: BlogPost[] = [];
  isLoggedIn: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;

  ngOnInit(): void {
    this.isAdminLoggedIn();
    this.loadPaginatedPosts();
  }

  loadPaginatedPosts() {
    this.blogService.getPaginatedPosts(this.pageNumber, this.pageSize).subscribe({
      next: (paginatedResult) => {
        this.blogPosts = paginatedResult.items;
        this.totalItems = paginatedResult.pagination.totalItems;
      },
      error: (err) => console.error('Error loading blog posts:', err)
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadPaginatedPosts();
  }

  isAdminLoggedIn(): boolean {
    this.isLoggedIn = sessionStorage.getItem('editAuth') === 'true';
    return this.isLoggedIn;
  }

  ngAfterViewInit(): void {
    this.createBackgroundVideo();
  }

  private createBackgroundVideo(): void {
    this.video = document.createElement('video');
    this.video.src = 'https://res.cloudinary.com/doydy0awd/video/upload/f_auto,q_auto/v1756472201/bgvideo_nrt3ps.webm';
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.preload = 'auto';

    Object.assign(this.video.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: '0'
    });

    this.backgroundVideoElement.nativeElement.appendChild(this.video);
    this.video.play().catch(e => console.log('Autoplay prevented:', e));
  }

  playVideo(): void {
    if (!this.video) return;
    if (this.video.paused) this.video.play().catch(() => {});
    else this.video.pause();
  }
}


/* import { Component,ElementRef,ViewChild, inject, OnInit, } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostComponent } from "../blog-post/blog-post.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AssetLoaderService } from '../_services/asset-loader.service';

@Component({
  selector: 'app-blog-page',
  imports: [BlogPostComponent, PaginationModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent  {
    @ViewChild('backgroundVideoElement') backgroundVideoElement!: ElementRef;
  private assetLoader = inject(AssetLoaderService);
  video?: HTMLVideoElement;
 blogService = inject(BlogService)
  blogPosts: BlogPost[] = [];
  isLoggedIn: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalItems: number = 0; // Total number of items for pagination

  ngOnInit(): void {
    
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
   ngAfterViewInit() {
  const url = 'https://res.cloudinary.com/doydy0awd/video/upload/f_auto,q_auto/v1756472201/bgvideo_nrt3ps.webm';
  const video = this.assetLoader.getVideoElement(url);
  if (!video) return;

  this.video = video.cloneNode(true) as HTMLVideoElement;
  this.video.autoplay = true;
  this.video.loop = true;
  this.video.muted = true;
  this.video.playsInline = true;

  // Apply styles properly
  Object.assign(this.video.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '0'
  });

  this.backgroundVideoElement.nativeElement.appendChild(this.video);
  this.video.play().catch(e => console.log('Autoplay prevented:', e));
}
  playVideo() {
    if (!this.video) return;
    if (this.video.paused) this.video.play().catch(() => {});
    else this.video.pause();
  }
 }

 */