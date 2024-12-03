import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  // private apiUrl: string = "http://localhost:8080"
  private apiUrl: string = "https://livrariaback-end-production.up.railway.app"

  constructor(private httpClient: HttpClient) { }

  login(email: string , password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/auth/login", { email, password}).pipe(
      tap((value) =>{
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }

  signup(name: string ,email: string , password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl +"/auth/register", { name, email, password}).pipe(
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
