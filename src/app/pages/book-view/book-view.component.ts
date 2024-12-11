import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../Model/Book';
import { BookService } from '../../service/book.service';
import { NgIf, NgFor } from '@angular/common';
import { QuantityButtonComponent } from "../../components/quantity-button/quantity-button.component";


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
  totalPrice: number = 0;
  
  constructor(private route: ActivatedRoute, private service:BookService) {}

  updateTotalPrice(quantity: number): void {
    const total = this.book.price * quantity;
    this.totalPrice = parseFloat(total.toFixed(2));
  }
  
  ngOnInit(): void {
    const bookCode = Number(this.route.snapshot.paramMap.get('code'));

    this.service.getBookById(bookCode).subscribe(
      (data) => {
        this.book = data;
        this.totalPrice = this.book.price;
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
    
    
    window.scrollTo(0, 0);
    
  }

  
}

