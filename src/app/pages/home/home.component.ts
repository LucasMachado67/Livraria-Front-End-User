import { Component } from '@angular/core';
import { MainPageComponent } from '../../components/main-page/main-page.component';
import { HeaderComponent } from "../../components/header/header.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainPageComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
