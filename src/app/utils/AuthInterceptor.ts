import { HttpEvent, HttpHandler } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

//O Interceptor adiciona automaticamente o token nas requisições protegidas.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    
  const loginService = inject(LoginService);
  const token = loginService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq);
  }
  return next(req);
};
