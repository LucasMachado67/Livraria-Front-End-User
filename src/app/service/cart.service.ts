import { Injectable } from '@angular/core';
import { Book } from '../Model/Book';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../Model/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:Cart[] = []
  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  getCart():Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url + "/cart/all")
  }
  
  addToCart(bookId: number, quantity: number): Observable<void> {
    return this.http.post<void>(this.url + "/cart/add", null, {params: { bookId: bookId.toString(),quantity: quantity.toString()}});
  }
  
  removeFromCart(bookId: number): Observable<any> {
    return this.http.delete<any>(this.url + "/cart/" + bookId);
  }
}
