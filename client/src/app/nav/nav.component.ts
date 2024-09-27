import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule,RouterLink,RouterLinkActive,TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService=inject(AccountService);
  model: any = {};
  private route=inject(Router);


  login() {
    
    this.accountService.login(this.model).subscribe({
      next : _=>{
        this.route.navigateByUrl('members');
      },
      error: errors => console.log(errors),

    })
  }

  logOut(){
  this.accountService.logout();
  this.route.navigateByUrl('/');
  }


}
