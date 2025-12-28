# MyStore - Angular E-commerce Application

A beautiful, modern single-page e-commerce application built with Angular that allows users to browse products, add them to a shopping cart, and complete the checkout process.

## Features

- **Product List Page**: Display all available products with images, names, and prices
- **Product Details Page**: View detailed information about individual products
- **Shopping Cart**: Add, remove, and update quantities of products
- **Checkout Form**: Collect user information with form validation
- **Order Confirmation**: Display order confirmation after successful checkout
- **Responsive Design**: Beautiful UI that works on all devices

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Navigate to `http://localhost:4200/` in your browser

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── product.ts
│   ├── services/
│   │   ├── product.service.ts
│   │   └── cart.service.ts
│   ├── components/
│   │   ├── product-list/
│   │   ├── product-item/
│   │   ├── product-details/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── confirmation/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.module.ts
│   └── app-routing.module.ts
└── assets/
    └── data.json
```

## Technologies Used

- Angular 17
- TypeScript
- RxJS
- CSS3 (with modern gradients and animations)

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

