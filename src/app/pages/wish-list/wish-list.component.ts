import { Component, OnInit } from '@angular/core';
import { Book } from '../../Model/Book';
import { WishListService } from '../../service/wish-list.service';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';

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
  
  constructor(private wishlistService:WishListService, private userService:UserService, private router:Router){}

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

  addToCart(code: number){

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
