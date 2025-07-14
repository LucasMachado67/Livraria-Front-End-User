import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../Model/Book';
import { BookService } from '../../service/book.service';
import { NgIf, NgFor } from '@angular/common';
import { QuantityButtonComponent } from "../../components/quantity-button/quantity-button.component";
import { BookDetailsDTO } from '../../Model/BookDetailsDTO';
import { Author } from '../../Model/Author';
import { Category } from '../../Model/Category';
import { WishListService } from '../../service/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../Model/Cart';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    NgIf,
    NgFor,
    QuantityButtonComponent,
    NgClass
],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.scss'
})
export class BookViewComponent implements OnInit {

  @Input() Books!: Book;
  book: any;
  categories: Category[] = [];
  authors: Author[] = [];
  wishList: Book[] = [];
  cart: Cart[] = [];
  totalPrice: number = 0;
  inWishList: boolean = false;
  inCart: boolean = false;
  loading: boolean = false;
  error: string | null = null;
  quantitySelected: number = 1;
  constructor(
    private route: ActivatedRoute,
    private service:BookService,
    private wishListService:WishListService,
    private toast:ToastrService,
    private cartService:CartService) {}
  
  updateTotalPrice(quantity: number): void {
    const total = this.book.price * quantity;
    this.totalPrice = parseFloat(total.toFixed(2));
    this.quantitySelected = quantity;
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

  addToWishList() {
    if (!this.book?.code) {
      this.toast.error("Book code not found")
    }
    this.wishListService.addToWishList(this.book.code).subscribe({
      next: () => {
        this.toast.success("Book added to wish list");
        this.inWishList = true;
      },
      error: () => {
        this.toast.error("Could not add to wish list");
      }
    });
  }

  removeFromWishList(code: number): void{
    this.wishListService.removeFromWishList(code).subscribe({
      next: () => {
        this.wishList = this.wishList.filter(book => book.code !== code);
        this.toast.info("Removed from wishList");
        this.inWishList = false;
      },
      error: () => {
        this.toast.error("Error while trying to remove");
      }
    });
  }

  isInWishList(): void {
    this.loading = true;
    this.wishListService.getWishList().subscribe({
      next: (books) => {
        this.wishList = books;

        this.wishList.forEach(book => {
          if(book.code == this.book.code){
            this.inWishList = true;
          }
        });

        this.loading = false;
      },
      error: (err) =>{
        console.log("Error while trying to fetch favored book")
        this.loading = false;
      }
    }); 
  }

  addToCart(): void {
    if (!this.book?.code) {
      this.toast.error("Book code not found")
    }
    console.log(this.quantitySelected)
    this.cartService.addToCart(this.book.code, this.quantitySelected).subscribe({
      next: () => {
        this.toast.success("Book added to cart");
        this.inCart = true;
      },
      error: () => {
        this.toast.error("Could not add to cart");
      }
    });
  }

  removeFromCart(code: number): void{
    this.cartService.removeFromCart(code).subscribe({
      next: () => {
        this.cart = this.cart.filter(item => item.book.code !== code);
        this.toast.info("Removed from cart");
        this.inCart = false;
      },
      error: () => {
        this.toast.error("Error while trying to remove");
      }
    });
  }

  isInCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (books) => {
        this.cart.forEach(cart => {
          if(cart.book.code == this.book.code){
            this.inCart = true;
          }
        });

        this.loading = false;
      },
      error: (err) =>{
        console.log("Error while trying to fetch in cart books")
        this.loading = false;
      }
    }); 
  }
  
  ngOnInit(): void {
    this.getCategories();
    this.loadBook();
    this.isInWishList();
    this.isInCart();
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    
  }

  
}

