import { ViewportScroller } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private viewportScroller = inject(ViewportScroller);
 

  scrollToSection(sectionId: string) {
    // 1. Get navbar height (or use 70px as default)
    const navbarHeight = 110; 
    
    // 2. Find the Projects section
    const section = document.getElementById(sectionId);
    
    if (section) {
      // 3. Scroll to (section top position - navbar height)
      window.scrollTo({
        top: section.offsetTop - navbarHeight,
        behavior: 'smooth' // Adds nice animation
      });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
  

 
}
