import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { SendPostDto } from '../models/send-post-dto';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl= 'http://localhost:5227/api/blog';
  private http= inject (HttpClient);


  getBlogPosts() {
    return this.http.get<BlogPost[]>(`${this.apiUrl}`);
  }

  getPostById(id: number) {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  createPost(post: SendPostDto): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/post`, post);
    //        ^ Tell Angular to expect a BlogPost response
  }

  postPicture(postId: number, file: File): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/add-photo/${postId}`, formData)
  }
}
