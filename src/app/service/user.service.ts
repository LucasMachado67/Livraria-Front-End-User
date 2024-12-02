import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = "http://localhost:8080";
  constructor(private http:HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.url}/users/${id}`);
  }
}
