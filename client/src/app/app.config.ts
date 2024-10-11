import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './_interceptor/error.interceptor';
import { jwtInterceptor } from './_interceptor/jwt.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './_interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([errorInterceptor,jwtInterceptor,loadingInterceptor])),
  provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideAnimations(),
    provideToastr({
      positionClass:'toast-bottom-right'
    }),importProvidersFrom(NgxSpinnerModule)
  ]
};
