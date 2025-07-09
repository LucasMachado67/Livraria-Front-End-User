import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../Model/Book';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishList: Book[] = [];
  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  getWishList():Observable<Book[]> {
    return this.http.get<Book[]>(this.url + "/wishlist/all")
  }

  addToWishList(bookId: number): Observable<void> {
    return this.http.post<void>(this.url + "/wishlist/add", null, {params: { bookId: bookId.toString()}});
  }

  removeFromWishList(bookId: number): Observable<any> {
    return this.http.delete<any>(this.url + "/wishlist/" + bookId);
  }

} 
