import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../Model/Contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // private url:string = "http://localhost:8080";
  private url:string = "https://livrariaback-end-production.up.railway.app";
  constructor(private http:HttpClient) { }

  addNewContact(contactData : Contact): Observable<Contact>{
    return this.http.post<Contact>(this.url + "/newErrand", contactData);
  }
}
