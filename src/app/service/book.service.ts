import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../Model/Book';
import { environment } from '../../environment';
import { BookDetailsDTO } from '../Model/BookDetailsDTO';
import { Category } from '../Model/Category';
import { Author } from '../Model/Author';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  // private url:string = "http://localhost:8080";
  // private url:string = "https://livrariaback-end-production.up.railway.app";
  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  select():Observable<Book[]>{
    return this.http.get<Book[]>(this.url + "/book/all");
  }

  books:Book[] = []

  //Antiga forma
  // getBookById(code: number): Observable<any> {
  //   return this.http.get(`${this.url}/book/${code}`);
  // }
  //Nova forma de puxar o livro
  getBookByCode(code: number): Observable<BookDetailsDTO> {
    return this.http.get<BookDetailsDTO>(`${this.url}/book/${code}`);
  }

  //Pegar todas as categorias
  allCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.url + "/category/all");
  }

  //Pegar todos os Authors
  allAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url + '/author/all');
  }

}
