import { Routes } from '@angular/router';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogFormComponent } from './blog-form/blog-form.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'home', component: HomeComponent},
    {path: 'blogForms', component:BlogFormComponent}
];
