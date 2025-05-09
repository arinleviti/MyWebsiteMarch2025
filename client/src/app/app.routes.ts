import { Routes } from '@angular/router';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { editGuard } from './guards/edit.guard';
import { EditAuthComponent } from './edit-auth/edit-auth.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'home', component: HomeComponent},
    {path: 'blogforms', component: BlogFormComponent, canActivate: [editGuard]},
    {path: 'auth', component: EditAuthComponent } 
];
