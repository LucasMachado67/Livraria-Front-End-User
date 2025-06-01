import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/loginAndRegistration/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/loginAndRegistration/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
  phone: FormControl
  gender: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})  
export class SignUpComponent {
    signupForm!: FormGroup<SignupForm>;

    constructor(
      private router: Router,
      private loginService: LoginService,
      private toastService: ToastrService
    ){
      this.signupForm = new FormGroup({
        name: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required]),
        passwordConfirm: new FormControl('',[Validators.required]),
        phone: new FormControl('',[Validators.required]),
        gender: new FormControl('',[Validators.required])
      })
    }

    submit(){
      this.loginService.signup(
                this.signupForm.value.name,
                this.signupForm.value.email,
                this.signupForm.value.password,
                this.signupForm.value.phone,
                this.signupForm.value.gender).subscribe({
                    next: () => {
                      this.toastService.success("Sign In successfully made!");
                      this.navigate();
                    },
                    error: (err) => {
                      this.toastService.error("Error during sign up!");
                      console.error(err);
                    }
                    });
    }
    navigate(){
      this.router.navigate(["login"])
    }
}
