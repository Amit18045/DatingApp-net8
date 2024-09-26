import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService=inject(AccountService);
  model: any = {};


 login() {
   this.accountService.login(this.model).subscribe({
     next : Response=>{
       console.log(Response);
     },
     error: errors => console.log(errors),

   })
 }

 logOut(){
 this.accountService.logout();
 }

}
