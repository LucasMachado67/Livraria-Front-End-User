import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from '../../Model/Book';
import { BookService } from '../../service/book.service';
import { ActivatedRoute } from '@angular/router';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quantity-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './quantity-button.component.html',
  styleUrl: './quantity-button.component.scss'
})
export class QuantityButtonComponent {
    
  book: any;
  currentQuantity: number = 1;
  plusButtonDisabled:Boolean = true;
  minusButtonDisabled:Boolean = true;
  showMessage: boolean = false;
  messageContent:string = "";

  constructor(private service:BookService, private route: ActivatedRoute){}

  @Output() quantityChange = new EventEmitter<number>();

  plus():void{
    
    if(this.currentQuantity >= this.book.quantity){
      this.plusButtonDisabled = !true;
      this.showMessage = true;
      this.messageContent = "Max quantity"
    }else{
      this.currentQuantity += 1;
      this.quantityChange.emit(this.currentQuantity);
      this.showMessage = false;
    }
  }
  minus(){

    if(this.currentQuantity <= 1){
      this.minusButtonDisabled=!true;
      this.showMessage = true;
      this.messageContent = "Minimum quantity is one"
    }else{
      this.currentQuantity += -1;
      this.quantityChange.emit(this.currentQuantity);
      this.showMessage = false;
    }
  }

  ngOnInit(): void{
    const bookCode = Number(this.route.snapshot.paramMap.get('code'));

    this.service.getBookById(bookCode).subscribe(
      (data) => {
        this.book = data;
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
  }
}
