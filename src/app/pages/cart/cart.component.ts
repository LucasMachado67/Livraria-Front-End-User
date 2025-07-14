import { Component, OnInit } from '@angular/core';
import { Book } from '../../Model/Book';
import { CartService } from '../../service/cart.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { CartTotalPriceComponent } from "../../components/cart-total-price/cart-total-price.component";
import { Cart } from '../../Model/Cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CartTotalPriceComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

    cart: Cart[] = [];
    book = new Book();
    loading: boolean = false;
    error: string | null = null;
    bookTotalPrice: number = 0;
    constructor(private cartService:CartService, private userService:UserService, private router:Router){}
    
    loadCart(): void{
      this.loading = true;
      this.cartService.getCart().subscribe({
        next: (books) => {
          this.cart = books;
          this.loading = false;
        },
        error: (err) =>{
          this.error = "Error while loading the shop cart";
          this.loading = false;
        }
      });
    }
  
    navigateToBookPage(code: number):void{
      const foundBook = this.cart.find((cart) => cart.book.code === code);
  
      if (foundBook) {
        this.router.navigate(['/books/', foundBook.book.code], {
          state: { book: this.book },
        });
      }
    }

    removeFromCart(code: number): void{
      this.cartService.removeFromCart(code).subscribe({
        next: () => {
          this.cart = this.cart.filter(cart => cart.book.code !== code);
        },
        error: () => {
          this.error = "Error while trying to remove from the shop cart";
        }
      });
    }

    getTotalPrice(): number {
      return this.cart.reduce((total, cartItem) => {
        return total + cartItem.book.price * cartItem.quantitySelected;
      }, 0);
    }
    
    ngOnInit(): void {
      this.loadCart();
    }
}
