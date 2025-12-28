import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  name: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  cardNumber: string = '';
  cardName: string = '';
  expiryDate: string = '';
  cvv: string = '';

  cartTotal: number = 0;
  cartItemCount: number = 0;

  nameError: string = '';
  addressError: string = '';
  cityError: string = '';
  stateError: string = '';
  zipError: string = '';
  cardNumberError: string = '';
  cardNameError: string = '';
  expiryError: string = '';
  cvvError: string = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.cartService.getCart().length === 0) {
      this.router.navigate(['/cart']);
    }
    this.cartTotal = this.cartService.getTotalPrice();
    this.cartItemCount = this.cartService.getTotalItems();
  }

  validateName(): boolean {
    if (!this.name || this.name.trim().length === 0) {
      this.nameError = 'Name is required';
      return false;
    }
    if (this.name.trim().length < 3) {
      this.nameError = 'Name must be at least 3 characters long';
      return false;
    }
    this.nameError = '';
    return true;
  }

  validateAddress(): boolean {
    if (!this.address || this.address.trim().length === 0) {
      this.addressError = 'Address is required';
      return false;
    }
    if (this.address.trim().length < 5) {
      this.addressError = 'Address must be at least 5 characters long';
      return false;
    }
    this.addressError = '';
    return true;
  }

  validateCity(): boolean {
    if (!this.city || this.city.trim().length === 0) {
      this.cityError = 'City is required';
      return false;
    }
    this.cityError = '';
    return true;
  }

  validateState(): boolean {
    if (!this.state || this.state.trim().length === 0) {
      this.stateError = 'State is required';
      return false;
    }
    this.stateError = '';
    return true;
  }

  validateZip(): boolean {
    if (!this.zip || this.zip.trim().length === 0) {
      this.zipError = 'ZIP code is required';
      return false;
    }
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(this.zip)) {
      this.zipError = 'Please enter a valid ZIP code';
      return false;
    }
    this.zipError = '';
    return true;
  }

  validateCardNumber(): boolean {
    if (!this.cardNumber || this.cardNumber.trim().length === 0) {
      this.cardNumberError = 'Card number is required';
      return false;
    }
    // Remove spaces and check if it contains only digits
    const digitsOnly = this.cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(digitsOnly)) {
      this.cardNumberError = 'Card number must contain only numbers';
      return false;
    }
    // Check if it's exactly 16 digits
    if (digitsOnly.length !== 16) {
      this.cardNumberError = 'Please enter a valid 16-digit card number';
      return false;
    }
    this.cardNumberError = '';
    return true;
  }

  validateCardName(): boolean {
    if (!this.cardName || this.cardName.trim().length === 0) {
      this.cardNameError = 'Cardholder name is required';
      return false;
    }
    if (this.cardName.trim().length < 3) {
      this.cardNameError = 'Cardholder name must be at least 3 characters long';
      return false;
    }
    this.cardNameError = '';
    return true;
  }

  validateExpiry(): boolean {
    if (!this.expiryDate || this.expiryDate.trim().length === 0) {
      this.expiryError = 'Expiry date is required';
      return false;
    }
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(this.expiryDate)) {
      this.expiryError = 'Please enter a valid expiry date (MM/YY)';
      return false;
    }
    this.expiryError = '';
    return true;
  }

  validateCvv(): boolean {
    if (!this.cvv || this.cvv.trim().length === 0) {
      this.cvvError = 'CVV is required';
      return false;
    }
    if (!/^\d{3,4}$/.test(this.cvv)) {
      this.cvvError = 'Please enter a valid CVV (3-4 digits)';
      return false;
    }
    this.cvvError = '';
    return true;
  }

  validateForm(): boolean {
    const isValid = 
      this.validateName() &&
      this.validateAddress() &&
      this.validateCity() &&
      this.validateState() &&
      this.validateZip() &&
      this.validateCardNumber() &&
      this.validateCardName() &&
      this.validateExpiry() &&
      this.validateCvv();

    return isValid;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      // Clear the cart
      this.cartService.clearCart();
      // Navigate to confirmation page
      this.router.navigate(['/confirmation']);
    }
  }

  formatCardNumber(event: any): void {
    // Remove all non-digit characters
    let value = event.target.value.replace(/\D/g, '');
    // Limit to 16 digits
    value = value.substring(0, 16);
    // Format with spaces every 4 digits
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardNumber = formattedValue;
  }

  formatExpiry(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.expiryDate = value;
  }
}

