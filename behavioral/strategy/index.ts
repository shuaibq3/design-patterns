/**
 * Strategy Pattern
 * Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
 */

// Strategy interface
export interface PaymentStrategy {
  pay(amount: number): void;
}

// Concrete strategies
export class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  pay(amount: number): void {
    console.log(`Processing $${amount} payment using credit card ${this.cardNumber}`);
  }
}

export class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay(amount: number): void {
    console.log(`Processing $${amount} payment using PayPal account ${this.email}`);
  }
}

export class CryptoCurrencyPayment implements PaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  pay(amount: number): void {
    console.log(`Processing $${amount} payment using crypto wallet ${this.walletAddress}`);
  }
}

// Context
export class ShoppingCart {
  private items: number[] = [];
  private strategy: PaymentStrategy | null = null;

  addItem(price: number): void {
    this.items.push(price);
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  checkout(): void {
    if (!this.strategy) {
      throw new Error('Please select a payment strategy');
    }

    const total = this.items.reduce((sum, price) => sum + price, 0);
    this.strategy.pay(total);
  }

  getTotal(): number {
    return this.items.reduce((sum, price) => sum + price, 0);
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem(29.99);
cart.addItem(15.5);

const creditCard = new CreditCardPayment('1234-5678-9012-3456');
cart.setPaymentStrategy(creditCard);
cart.checkout();

const paypal = new PayPalPayment('user@example.com');
cart.setPaymentStrategy(paypal);
cart.checkout();

const cryptoPayment = new CryptoCurrencyPayment('0x123abc...');
cart.setPaymentStrategy(cryptoPayment);
cart.checkout();
