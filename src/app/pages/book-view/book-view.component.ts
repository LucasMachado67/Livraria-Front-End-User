import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../Model/Book';
import { BookService } from '../../service/book.service';
import { NgIf, NgFor } from '@angular/common';
import { QuantityButtonComponent } from "../../components/quantity-button/quantity-button.component";
import { BookDetailsDTO } from '../../Model/BookDetailsDTO';
import { Category } from '../../Model/Category';
import { Author } from '../../Model/Author';


@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    NgIf,
    NgFor,
    QuantityButtonComponent
],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.scss'
})
export class BookViewComponent implements OnInit {
  @Input() Books!: Book;
  book: any;
  
  categories: Category[] = [];
  authors: Author[] = [];
  
  totalPrice: number = 0;
  constructor(private route: ActivatedRoute, private service:BookService) {}
  
  updateTotalPrice(quantity: number): void {
    const total = this.book.price * quantity;
    this.totalPrice = parseFloat(total.toFixed(2));
  }

  getCategories(): void {
    this.service
      .allCategories()
      .subscribe((retorno) => (this.categories = retorno));
  }
  getAuthors(): void {
    this.service
      .allAuthors()
      .subscribe((retorno) => (this.authors = retorno));
  }
  
  loadBook():void {
    const code = Number(this.route.snapshot.paramMap.get('code'));

      this.service.getBookByCode(code).subscribe(
      (data: BookDetailsDTO) => {
        this.book = {};
        this.book.code = data.code;
        this.book.title = data.title;
        this.book.year = data.year;
        this.book.price = data.price;
        this.book.pages = data.pages;
        this.book.language = data.language;
        this.book.bookCover = data.bookCover;
        this.book.image = data.image;
        this.book.quantity = data.quantity;
        this.book.description = data.description;
        this.book.author = {
          id: data.authorId,
          author: data.authorName,
        };
        //Setting to prevent the total price becoming 0
        this.totalPrice = this.book.price;
        const categoryArray = data.categories.split(',').map((c) => c.trim());
        this.book.categories = this.categories.filter(
          (cat) => categoryArray.includes(cat.category)
        );
      },
      (error) => {
        console.error('Error while trying to load book:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getCategories();
    this.loadBook();
    
    window.scrollTo(0, 0);
    
  }

  
}

