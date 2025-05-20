import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../Model/Book';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

readonly url = environment.url;
constructor(private http:HttpClient) { }


  books: Book[] = [];
  getBooksByTitle(query: string):Observable<Book[]>{
    //Com o params eu consigo enviar o texto digitado na pesquisa para o back
    return this.http.get<Book[]>(`${this.url}/book/search?query=${query}`);
  }

  getBooksByAuthor(query: string):Observable<Book[]>{
    return this.http.get<Book[]>(`${this.url}/book/searchA?query=${query}`);
  }
}
