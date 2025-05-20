import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../service/search.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive, RouterModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userName: string | null = null;
  hideUsersAndBooks: boolean = true;
  searchTerm: string = '';
  readonly url = environment.url;
  constructor(private http: HttpClient,
              private searchService: SearchService,
              private router: Router) {}

  //Navigation between pages
  navigateToPage(page: string) {
    if (page === 'profile') {
      this.router.navigate(['/user/myprofile']);
    } else if (page === 'favorites') {
      this.router.navigate(['/user/favorites']);
    }
  }


}
