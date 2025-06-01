import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environment';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive, RouterModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{


  username: string | null = "";
  hideUsersAndBooks: boolean = true;

  constructor(private router: Router,private loginService: LoginService) {}

  isLoggedIn(): boolean {
    return  !!this.loginService.getToken();
  }

  updateUsername(){
    if (typeof sessionStorage !== 'undefined') {
      return this.username = sessionStorage.getItem('username');
    }
    return null;
  }

  //Navigation between pages
  navigateToPage(page: string) {
    if (page === 'profile') {
      this.router.navigate(['/user/myprofile']);
    } else if (page === 'favorites') {
      this.router.navigate(['/user/favorites']);
    }
  }
  ngOnInit(){
    this.updateUsername();
  }

}
