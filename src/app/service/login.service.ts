import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response';
import { tap } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  // private url: string = "http://localhost:8080"
  // private url: string = "https://livrariaback-end-production.up.railway.app"
  readonly url = environment.url;
  constructor(private httpClient: HttpClient) { }

  login(email: string , password: string){
    return this.httpClient.post<LoginResponse>(this.url + "/auth/login", { email, password}).pipe(
      tap((value) =>{
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }

  signup(name: string ,email: string , password: string){
    return this.httpClient.post<LoginResponse>(this.url +"/auth/register", { name, email, password}).pipe(
      tap((value) =>{
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }

  logout(){
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
  }
}
