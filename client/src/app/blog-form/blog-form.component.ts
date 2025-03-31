import { NgIf, NgForOf, NgClass, NgStyle, DecimalPipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogPost } from '../models/blog-post.model';
import { BlogService } from '../_services/blog.service';
import { SendPostDto } from '../models/send-post-dto';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-blog-form',
  imports: [NgIf, ReactiveFormsModule, NgForOf, NgStyle, NgClass, FileUploadModule, CommonModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  uploader? : FileUploader;
  hasBaseDropZoneOver = false;
  postId: number = 0;
  baseUrl = 'http://localhost:5227/blog/api'
  postChange = output<BlogPost>();

  post = input<BlogPost>();

  blogForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    creationDate: [new Date(), Validators.required]
  });

  onSubmit() {
    const formData: SendPostDto = {
      title: this.blogForm.value.title,
      content: this.blogForm.value.content,
      creationDate: new Date(this.blogForm.value.creationDate).toISOString()
    }
    this.blogService.createPost(formData).subscribe({
      next: (response: BlogPost) => {
        console.log('Full created post', response);
        console.log('Generated ID:', response.id);
        if (response.id !== undefined) {
          this.postId = response.id;
        } else {
          console.error('Received undefined post ID');
        }
        this.blogForm.reset({
          creationDate: new Date()
        })
      },
      error: (err) => {
        console.error('Error creating post', err)
      }
    })

  }
  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

initializeUploader() {
  this.uploader = new FileUploader({
    url: '',
    isHTML5: true,
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 10 * 1024 * 1024,
  });
  this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false;
  };
  }

  async uploadFiles() {
    if (!this.postId || this.postId === 0) {
      console.error('No post ID available');
      return;
    }

    // Process each file sequentially
    for (const item of this.uploader?.queue || []) {
      try {
        const response = await lastValueFrom(this.blogService.postPicture(this.postId, item._file));
        console.log('Upload successful:', response);
        
        // Optional: Update UI with the uploaded photo
        if (response && response.url) {
          const updatedPost = this.post() ? {...this.post()} : { photos: [] };
          updatedPost.photos = updatedPost.photos || [];
          updatedPost.photos.push(response);
          this.postChange.emit(updatedPost);
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    
    this.uploader?.clearQueue();
  }
   
  
    
}

