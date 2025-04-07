import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { SendPostDto } from '../models/send-post-dto';
import { PaginatedResult } from '../models/pagination';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl= environment.apiUrl; // Use the environment variable for the API URL
  private http= inject (HttpClient);

  paginatedResult = signal<PaginatedResult<BlogPost[]> | null>(null);

  getPaginatedPosts(pageNumber?: number, pageSize?: number) {
    // Angular class used to represent URL parameters
    let params = new HttpParams();
    if (pageNumber !== undefined && pageSize !== undefined) {
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    }
    //observe: 'response': This instructs Angular to include the full HTTP response (headers and body) in the result, rather than just the body.
    //when we specify observe: 'response', Angular will return the entire HTTP response, including headers and status code, instead of just the response body.
    //The response body is assumed to contain an array of BlogPost[], and the Pagination header is parsed to extract pagination details.
    return this.http.get<BlogPost[]>(`${this.apiUrl}/with-pagination`, { observe: 'response', params }).pipe(
      map(response => {
        //The response body is assumed to contain an array of BlogPost[], and the Pagination header is parsed to extract pagination details.
        const pagination = JSON.parse(response.headers.get('Pagination')!);
        
        return {
          items: response.body as BlogPost[],
          pagination
        };
      })
    );
  }

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

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-post/${id}`, { responseType: 'text' });
  }
}
