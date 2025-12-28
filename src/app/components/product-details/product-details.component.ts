import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(parseInt(productId, 10));
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.product = products.find(p => p.id === id) || null;
        this.loading = false;
        if (!this.product) {
          // Product not found, redirect to product list
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.loading = false;
        this.router.navigate(['/']);
      }
    });
  }

  onQuantityChange(value: string): void {
    this.selectedQuantity = parseInt(value, 10);
  }

  addToCart(): void {
    if (this.product && this.selectedQuantity > 0) {
      this.cartService.addToCart(this.product, this.selectedQuantity);
      alert(`Added ${this.selectedQuantity} ${this.product.name}(s) to cart!`);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

