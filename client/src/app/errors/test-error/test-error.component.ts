import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css'
})
export class TestErrorComponent {
  baseURL = "https://localhost:5001/api/";
  private http = inject(HttpClient);
  validationError:string[]=[];

  get400Error() {
    this.http.get(`${this.baseURL}buggy/bad-request`).subscribe({
      next: response => { console.log(response) },
      error: error => { console.log(error) }
    });
  }

  get401Error() {
    this.http.get(`${this.baseURL}buggy/auth`).subscribe({
      next: response => { console.log(response) },
      error: error => { console.log(error) }
    });
  }

  get404Error() {
    this.http.get(`${this.baseURL}buggy/not-found`).subscribe({
      next: response => { console.log(response) },
      error: error => { console.log(error) }
    });
  }
  get500Error() {
    this.http.get(`${this.baseURL}buggy/server-error`).subscribe({
      next: response => { console.log(response) },
      error: error => { console.log(error) }
    });
  }

  get400ValidationError() {
    debugger
    this.http.post(`${this.baseURL}account/register`,{}).subscribe({
      next: response => { console.log(response) },
      error: error => { console.log(error)
         this.validationError=error }
    });
  }

}
