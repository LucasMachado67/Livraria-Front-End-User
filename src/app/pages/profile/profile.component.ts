import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { User } from '../../Model/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';

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
export class ProfileComponent {

  user = new User();
  @Input() Users!: User;
  book: any;

  constructor(private route: ActivatedRoute, private service: UserService) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('code'));

    this.service.getUserById(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error while fetching user:', error);
      }
    );
  }
}
