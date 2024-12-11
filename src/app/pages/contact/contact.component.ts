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

  formatPhone(): void {
    let phone = this.contact.phone.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    if (phone.length > 2) {
      phone = phone.substring(0, 2) + ' ' + phone.substring(2);
    }
    if (phone.length > 7) {
      phone = phone.substring(0, 7) + '-' + phone.substring(7, 11);
    }
    this.contact.phone = phone;
  }
}
