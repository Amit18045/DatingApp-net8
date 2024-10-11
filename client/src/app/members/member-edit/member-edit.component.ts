import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_model/member';
import { MembersService } from '../../_services/members.service';
import { AccountService } from '../../_services/account.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload',['$event']) notify($event:any){
    if(this.editForm?.dirty){
      $event.returnValue=true;
    }
  }
  member?: Member;
  private memberSrc = inject(MembersService);
  private accountSrc = inject(AccountService);
  private toastrSrc = inject(ToastrService);
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.accountSrc.currentUser();
    if (!username) return;
    this.memberSrc.getMember(username.username).subscribe({
      next: membr => this.member = membr
    })
  }
  updateMember() {
    
    this.memberSrc.updateMember(this.editForm?.value).subscribe({
      next:_=>{
        this.toastrSrc.success("Profile Update Successfully");
        this.editForm?.reset(this.member);
      }
    })
   
  }
}
