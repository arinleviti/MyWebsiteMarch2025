import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl= 'http://localhost:5227/api/blog';
  private http= inject (HttpClient)

  getBlogPosts() {
    return this.http.get<BlogPost[]>(`${this.apiUrl}`);
  }

  getPostById(id: number) {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  createPost(post: BlogPost) {
    return this.http.post(`${this.apiUrl}/post`, post);
  }
}
