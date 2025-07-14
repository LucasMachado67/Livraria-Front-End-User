import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalPriceComponent } from './cart-total-price.component';

describe('CartTotalPriceComponent', () => {
  let component: CartTotalPriceComponent;
  let fixture: ComponentFixture<CartTotalPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartTotalPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartTotalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
