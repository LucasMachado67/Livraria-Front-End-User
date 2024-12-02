import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../service/search.service';

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
  

  constructor(private http: HttpClient,
              private searchService: SearchService,
              private router: Router) {}


  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
  
    if (this.searchTerm.length > 1) {
      this.http.get<any[]>(`http://localhost:8080/books/search?query=${this.searchTerm}`).subscribe(
        (results) => this.searchService.updateResults(results),
        (error) => {
          console.error('Error fetching search results', error);
          if (error.status === 200 && error.ok === false) {
            alert('Error: The response format is not valid JSON.');
          }
        }
      );
    } else {
      this.searchService.updateResults([]);
    }
  }

  //Navigation between pages
  navigateToPage(page: string) {
    if (page === 'profile') {
      this.router.navigate(['/user/myprofile']);
    } else if (page === 'favorites') {
      this.router.navigate(['/user/favorites']);
    }
  }


}
