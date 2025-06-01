import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response';
import { tap } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly url = environment.url;
  constructor(private httpClient: HttpClient) { }

  login(email: string , password: string){
    return this.httpClient.post<LoginResponse>(this.url + "/auth/login", { email, password}).pipe(
      tap((value) =>{
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.email)
      })
    )
  }

  signup(name: string, email: string, password: string, phone: string, gender: string){
    return this.httpClient.post<LoginResponse>(this.url +"/auth/signup", { name, email, password, phone, gender}).pipe(
      tap((value) =>{
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.email)
      })
    )
  }

  getToken():string | null{
    return localStorage.getItem('auth-token');
  }

  logout(){
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
  }
}
