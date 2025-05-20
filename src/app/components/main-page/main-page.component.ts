import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Book } from '../../Model/Book';
import { BookService } from '../../service/book.service';
import { Router, RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { Filter } from '../../Model/Filter';
import { environment } from '../../../environment';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FilterComponent,
    SearchBarComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  book = new Book();
  table: Boolean = true;
  searchQuery: string = '';
  books: Book[] = [];
  allBooks: any[] = [];
  filter: Filter = new Filter();
  searchTerm: string = '';
  readonly url = environment.url;

  constructor(private service: BookService, private router: Router) {}

  selectBook(): void {
    this.service.select().subscribe(
      (retorno) => {
        this.allBooks = retorno;
        this.books = this.allBooks;
      },
      (error) => console.error('Error loading books', error)
    );
  }

  viewBook(code: number) {
    const foundBook = this.books.find((book) => book.code === code);

    if (foundBook) {
      this.book = foundBook;
      this.router.navigate(['/books/', this.book.code], {
        state: { book: this.book },
      });
    } else {
      console.error('Livro não encontrado com o código:', code);
    }
  }
  //Function related to Filter
  applyFilter(filter: Filter) {
    this.books = this.allBooks.filter((book) => {
      return (
        (!filter.price ||
          (book.price >= filter.price.min && book.price <= filter.price.max)) &&
        (filter.language.length === 0 ||
          filter.language.includes(book.language)) &&
        (filter.bookCover.length === 0 ||
          filter.bookCover.some(
            (cover) => cover.toLowerCase() === book.bookCover.toLowerCase()
          )) &&
        (filter.category.length === 0 ||
          filter.category.some((cat) => book.categories.includes(cat)))
      );
    });
  }
  searchByTitleOrAuthor($event: Book[]) {
    if (this.books.length <= 0) {
      alert('No Data Found for the title');
    }
    this.books = $event;
    return this.books;
  }

  ngOnInit(): void {
    this.selectBook();
  }
}
