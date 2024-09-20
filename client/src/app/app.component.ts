import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  userList: any;

  http=inject(HttpClient);

  ngOnInit(): void {
    this.http.get("http://localhost:5111/api/user/2").subscribe({
      next: response=> this.userList=response,
      error:error=>console.log(error),
      complete: ()=>  console.log("requested have completed"),
    });
  }
}
