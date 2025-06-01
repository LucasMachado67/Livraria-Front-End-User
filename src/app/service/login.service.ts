import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response';
import { tap } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly url = environment.url;
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(this.url + '/auth/login', { email, password })
      .pipe(
        tap((value) => {
          if (value.token) sessionStorage.setItem('auth-token', value.token);
          if (value.email)sessionStorage.setItem('email', value.email);
          if (value.name)sessionStorage.setItem('username', value.name);
          if (value.phone)sessionStorage.setItem('phone', value.phone);
          if (value.gender)sessionStorage.setItem('gender', value.gender)
        })
      );
  }

  signup(
    name: string,
    email: string,
    password: string,
    phone: string,
    gender: string
  ) {
    return this.httpClient
      .post<LoginResponse>(this.url + '/auth/signup', {
        name,
        email,
        password,
        phone,
        gender,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.email);
        })
      );
  }

  getToken(): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('auth-token');
    }
    return null;
  }

  getUserData(): any {
    if(typeof sessionStorage !== 'undefined'){
      return {
        email: sessionStorage.getItem('email'),
        name: sessionStorage.getItem('username'), 
        phone: sessionStorage.getItem('phone'),
        gender: sessionStorage.getItem('gender')
      };
    }
    return null;
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
  }

  // authChanged = new EventEmitter<any>();

  // setUser(token: string, email: string) {
  //   sessionStorage.setItem('auth-token', token);
  //   sessionStorage.setItem('username', email);
  //   this.authChanged.emit(email);
  // }
}
