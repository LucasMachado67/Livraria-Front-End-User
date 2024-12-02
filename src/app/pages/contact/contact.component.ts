import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Contact } from '../../Model/Contact';
import { ContactService } from '../../service/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contact = new Contact();

  constructor(private service:ContactService){}

  register():void{
      this.service.addNewContact(this.contact)
      .subscribe(retorno => {
  
        this.contact = retorno;
  
        this.contact = new Contact();
  
        alert("Message successfully registered!");
      });
  }
}
