import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-total-price',
  standalone: true,
  imports: [],
  templateUrl: './cart-total-price.component.html',
  styleUrl: './cart-total-price.component.scss'
})
export class CartTotalPriceComponent {

  @Input() totalPrice:number = 0;
}
