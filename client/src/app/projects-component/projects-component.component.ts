import { Component } from '@angular/core';
import { projects, Project } from '../_services/projects';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-component',
  imports: [ProjectCardComponent,CommonModule],
  templateUrl: './projects-component.component.html',
  styleUrl: './projects-component.component.css'
})
export class ProjectsComponent {
 projects: Project[] = projects; // assign the array of projects
}
