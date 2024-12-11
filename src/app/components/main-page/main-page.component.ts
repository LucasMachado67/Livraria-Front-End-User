import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Book } from '../../Model/Book';
import { BookService } from '../../service/book.service';
import { RouterLink, RouterLinkActive,RouterModule } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { FilterComponent } from '../filter/filter.component';
import { Filter } from '../../Model/Filter';
import { CategoryService } from '../../service/category.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    FilterComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{

  book = new Book();
  table:Boolean = true; 
  searchQuery: string = '';
  books:Book[] = [];
  allBooks: any[] = [];
  filter: Filter = new Filter();
  searchTerm: string = '';
  readonly url = environment.url;

  constructor(
    private service:BookService,
    private http: HttpClient,
    private searchService: SearchService
  ){}

  selectBook(): void {
    this.service.select().subscribe(
      (retorno) => {
        this.allBooks = retorno;
        this.books = this.allBooks;
      },
      (error) => console.error('Error loading books', error)
    );
  }
  //Function related to Filter
  applyFilter(filter: Filter) {
    this.books = this.allBooks.filter(book => {
      return (
        (!filter.price || (book.price >= filter.price.min && book.price <= filter.price.max)) &&
        (filter.language.length === 0 || filter.language.includes(book.language)) &&
        (filter.bookCover.length === 0 || filter.bookCover.some(cover => cover.toLowerCase() === book.bookCover.toLowerCase())) &&
        (filter.category.length === 0 || filter.category.some(cat => book.categories.includes(cat)))
      );
    });
  }
  //Functions related to Search
  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.searchTerm.length > 1) {
      this.http.get<any[]>(`${this.url}/books/search?query=${this.searchTerm}`).subscribe(
        (results) => {
          this.searchService.updateResults(results);
        },
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

  applySearch(searchTerm: any[]) {
    return this.books = searchTerm;
  }

  ngOnInit(): void {
    this.selectBook();
    this.searchService.searchResults$.subscribe((results) => {
      if (results.length > 0) {
        this.books = results;
        this.applySearch(results);
      } else {
        this.books = [...this.allBooks]; 
        this.applySearch(this.allBooks);
        this.service.select();
      }
    });
  }
}


