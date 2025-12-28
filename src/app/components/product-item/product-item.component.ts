import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<{product: Product, quantity: number}>();

  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  onQuantityChange(value: string): void {
    this.selectedQuantity = parseInt(value, 10);
  }

  onAddToCart(): void {
    if (this.selectedQuantity > 0) {
      this.addToCart.emit({ product: this.product, quantity: this.selectedQuantity });
      alert(`Added ${this.selectedQuantity} ${this.product.name}(s) to cart!`);
    }
  }
}

