import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_model/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  baseURl = environment.API_URl;
  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(`${this.baseURl}user`).subscribe({
      next: member => this.members.set(member),
    });
  }

  getMember(username: string) {
    var member = this.members().find(x => x.username == username);
    if (member != undefined) return of(member);
    return this.http.get<Member>(`${this.baseURl}user/${username}`)
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseURl}user`, member).pipe(tap(() => {
      this.members.update(members => members.map(m => m.username === member.username ? member : m))
    }));
  }
}
