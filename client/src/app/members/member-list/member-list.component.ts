import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_model/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  member: Member[] = [];
  memberService = inject(MembersService);
  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    this.memberService.getMembers().subscribe({
      next: resposnse => this.member = resposnse


    })
  }
}
