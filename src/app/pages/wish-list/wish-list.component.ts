import { Component, OnInit } from '@angular/core';
import { Book } from '../../Model/Book';
import { WishListService } from '../../service/wish-list.service';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{

  wishList: Book[] = [];
  book = new Book();
  loading: boolean = false;
  error: string | null = null;
  quantitySelected: number = 1;
  constructor(private wishlistService:WishListService,
    private router:Router,
    private toast:ToastrService,
    private cartService:CartService){}

  loadWishList(): void{
    this.loading = true;
    this.wishlistService.getWishList().subscribe({
      next: (books) => {
        this.wishList = books;
        this.loading = false;
      },
      error: (err) =>{
        this.error = "Error while loading the wish list";
        this.loading = false;
      }
    });
  }

  navigateToBookPage(code: number):void{
    const foundBook = this.wishList.find((book) => book.code === code);

    if (foundBook) {
      this.book = foundBook;
      this.router.navigate(['/books/', this.book.code], {
        state: { book: this.book },
      });
    }
  }

  addToCart(bookCode: number): void {
    if (!bookCode) {
      this.toast.error("Book code not found")
    }
    console.log(this.quantitySelected)
    this.cartService.addToCart(bookCode, this.quantitySelected).subscribe({
      next: () => {
        this.toast.success("Book added to cart");
      },
      error: () => {
        this.toast.error("Could not add to cart");
      }
    });
  }

  removeFromWishList(code: number): void{
    this.wishlistService.removeFromWishList(code).subscribe({
      next: () => {
        this.wishList = this.wishList.filter(book => book.code !== code);
        console.log("Caiu!")
      },
      error: () => {
        this.error = "Error while trying to remove from wish list";
      }
    });
  }

  ngOnInit(): void {
    this.loadWishList();
  }
}
