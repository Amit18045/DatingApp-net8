import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountSrv=inject(AccountService);
  const toastrc=inject(ToastrService);
  if(accountSrv.currentUser()){
    return true;
  }else{
    toastrc.error('You shall not pass!')
    return false;
  }

};
