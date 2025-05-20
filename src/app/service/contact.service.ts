import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../Model/Contact';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly url = environment.url;
  constructor(private http:HttpClient) { }

  addNewContact(contactData : Contact): Observable<Contact>{
    return this.http.post<Contact>(this.url + "/errand/new", contactData);
  }
}
