import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
 
  busyRequestCount=0;
  private spinnerSrc=inject(NgxSpinnerService);

  busy(){
    this.busyRequestCount++;
    this.spinnerSrc.show(undefined,{
      type:'line-scale-party',
      bdColor:'rbga(255,255,255,0)',
      color:'#333333'
    })
  }

  idle(){
    this.busyRequestCount --;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount=0;
      this.spinnerSrc.hide();
    }
  }
}
