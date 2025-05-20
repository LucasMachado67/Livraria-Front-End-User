import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookViewComponent } from './pages/book-view/book-view.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';


export const routes: Routes = [
    {
        path: '',redirectTo: 'home',pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: "books/:code", component: BookViewComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "signup", component: SignUpComponent
    },
    {
        path: "user/myprofile", component: ProfileComponent
    },
    {
        path: "errand/new", component: ContactComponent
    }
];
