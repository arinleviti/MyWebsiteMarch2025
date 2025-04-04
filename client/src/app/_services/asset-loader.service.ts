import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetLoaderService {
  private images = new Map<string, HTMLImageElement>();  // Store images
  private videos = new Map<string, HTMLVideoElement>();  // Store video URLs

  assetsReady = new BehaviorSubject(false);  // Track if assets are ready

  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      /* img.onload is an event handler in JavaScript that is triggered when an image has finished loading. */
      img.onload = () => {
        this.images.set(src, img);  // Store image in the Map
        resolve();
      };
      img.onerror = reject;
    });
  }

  preloadVideo(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = url;
        
      video.oncanplaythrough = () => {
        this.videos.set(url, video);
        resolve();
      };
      video.onerror = reject;
      
      // Some browsers need this to trigger loading
      video.load();
    });
  }

  getImage(src: string): HTMLImageElement | undefined {
    return this.images.get(src);  // Retrieve the image object
  }

  getVideoUrl(url: string): HTMLVideoElement | undefined {
    return this.videos.get(url);  // Retrieve the video URL
  }
}
