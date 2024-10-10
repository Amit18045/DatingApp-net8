import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const accountSrc= inject(AccountService);
  if(accountSrc.currentUser()){
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${accountSrc.currentUser()?.token}`
      }
    })
  }
  return next(req);
};
