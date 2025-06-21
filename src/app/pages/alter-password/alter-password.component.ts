import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

interface changePassword{
  oldPassword:FormControl
  newPassword:FormControl
  confirmPassword:FormControl
}

@Component({
  selector: 'app-alter-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alter-password.component.html',
  styleUrl: './alter-password.component.scss'
})
export class AlterPasswordComponent {

  changePassword!: FormGroup<changePassword>
  email: string = "";
  constructor(private router:Router, private service:LoginService, private toastr:ToastrService){
    this.changePassword = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  confirm():any{

    if (this.changePassword.valid) {
      const oldPassword = this.changePassword.value.oldPassword;
      const newPassword = this.changePassword.value.newPassword;
      const confirmPassword = this.changePassword.value.confirmPassword;
      
      //Validations
      if(oldPassword === newPassword){

        this.toastr.error("New password must be different");
        return;
      }
      if (newPassword !== confirmPassword) {
        this.toastr.error("New password and confirm password do not match!");
        return;
      }

      const email = this.service.getUserData().email;

      this.service.changePassword(newPassword, email).subscribe({
        next: () => this.toastr.success('Password changed!'),
        error: err => this.toastr.error('Failed to change password: ' + err.error.message)
        
      });
    }
    this.router.navigate(["/profile"]);
  }

  cancel() {
    this.router.navigate(["/profile"]);
  }

}
