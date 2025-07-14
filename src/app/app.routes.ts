import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookViewComponent } from './pages/book-view/book-view.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { authGuard } from './utils/AuthGuard';
import { AlterPasswordComponent } from './pages/alter-password/alter-password.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { CartComponent } from './pages/cart/cart.component';


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
        path: "errand/new", component: ContactComponent, canActivate: [authGuard] 
    }
    ,
    {
        path: "profile", component: ProfileComponent, canActivate: [authGuard] 
    },
    {
        path: "profile/password", component: AlterPasswordComponent, canActivate: [authGuard]
    },
    {
        path: "wishlist", component: WishListComponent, canActivate: [authGuard]
    },
    {
        path: "cart", component: CartComponent, canActivate: [authGuard]
    }
];
