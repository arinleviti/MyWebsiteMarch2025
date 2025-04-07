import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetLoaderService {
  private images = new Map<string, HTMLImageElement>();  // Store images
  private videos = new Map<string, HTMLVideoElement>();  // Store video URLs
  private videoCache = new Map<string, string>(); // Just store URLs
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
    if (this.videos.has(url)) return Promise.resolve();
  
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.src = url;
      // This runs when the video is fully loaded (or nearly so)
      video.onloadeddata = () => {
        this.videos.set(url, video); // Store the full element
        resolve();
      };
  
      video.onerror = reject;
      video.load(); // Trigger loading
    });
  }
  
  getVideoElement(url: string): HTMLVideoElement | undefined {
    return this.videos.get(url);
  }
  


  getImage(src: string): HTMLImageElement | undefined {
    return this.images.get(src);  // Retrieve the image object
  }

  getVideoUrl(url: string): string | undefined {
    return this.videoCache.get(url);
  }
}
