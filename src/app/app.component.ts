import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyStore';
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartCount();
    // Listen to cart changes
    setInterval(() => {
      this.updateCartCount();
    }, 100);
  }

  updateCartCount(): void {
    this.cartItemCount = this.cartService.getTotalItems();
  }
}

