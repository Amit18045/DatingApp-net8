import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toaster = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      debugger
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelError = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelError.push(error.error.errors[key])
                }
              } throw modelError.flat();
            } else {
              toaster.error(error.error, error.status);
            }
            break;
          case 401:
            toaster.error('unauthorized', error.status);
            break;

          case 404:
            router.navigateByUrl('/not found');
            break;
          case 500:
            const navigantionExtras: NavigationExtras = { state: { error: error.error } }
            router.navigateByUrl('/server-error', navigantionExtras);
            break;
          default:
            toaster.error("something unexpected went wrong");

            break;
        }
      }
      throw error;
    })

  );
};
