import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
 @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;
 @ViewChild('navbarToggler', { static: false }) navbarToggler!: ElementRef;

 router = inject(Router);
 showBot = false; // bot visibility
 toggleVisible = false;  // toggle visibility
 closeMenu() {
    // Only simulate the button click if the menu is currently open
    const isMenuOpen = document.querySelector('#navbarNav')?.classList.contains('show');
    if (isMenuOpen) {
      this.navbarToggler.nativeElement.click(); // Simulate the toggler button click
    }
  }

  goToProjects() {
  if (this.router.url !== '/home') {
    // Navigate to /home with a fragment 'projects'
    //When you use this, Angular does two things:It navigates to the route /home. It appends #projects to the URL, making it /home#projects.
    this.router.navigate(['/home'], { fragment: 'projects' });
  } else {
    // Already on home, just scroll
    this.scrollToSection('projects');
  }
}

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
  
 toggleBot() {
  this.showBot = !this.showBot;
}
  ngAfterViewInit() {
    // Make the toggle visible once Angular has rendered the view
    this.toggleVisible = true;
  }
}