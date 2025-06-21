import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{


  name:string | null = "";
  email:string | null = "";
  phone:string | null = "";
  gender:string | null = "";
  constructor(private route: ActivatedRoute, private loginService: LoginService, private router:Router) {}
  

  updateUserInformation(){
    const userData = this.loginService.getUserData();
    this.name = userData.name;
    this.email = userData.email;
    this.phone = userData.phone;
    this.gender = userData.gender;
  }

  logout() {
    this.loginService.logout();
  }

  navigateToChangePassword() {
    this.router.navigate(['/profile/password'])
  }

  ngOnInit(): void {
    this.updateUserInformation();  
  }
}
