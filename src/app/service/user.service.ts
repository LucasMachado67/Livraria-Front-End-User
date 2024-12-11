import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private url:string = "http://localhost:8080";
  // private url:string = "https://livrariaback-end-production.up.railway.app";
  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.url}/users/${id}`);
  }
}
