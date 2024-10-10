import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  cancelRegister = output<boolean>();
  private accountsrc = inject(AccountService);
  register() {
    debugger;
    this.accountsrc.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel()
      },
      error: error => console.log(error),
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
