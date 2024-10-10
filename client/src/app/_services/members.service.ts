import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_model/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  baseURl = environment.API_URl;


  getMembers() {
    return this.http.get<Member []>(`${this.baseURl}user`);
  }

  getMember(username: string) {
    return this.http.get<Member>(`${this.baseURl}user/${username}`)
  }

  
}
