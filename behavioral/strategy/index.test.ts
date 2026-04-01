/**
 * Tests for Strategy Pattern
 */

import {
  CreditCardPayment,
  PayPalPayment,
  CryptoCurrencyPayment,
  ShoppingCart
} from './index';

describe('Strategy Pattern', () => {
  test('shopping cart should add items', () => {
    const cart = new ShoppingCart();
    cart.addItem(10);
    cart.addItem(20);

    expect(cart.getTotal()).toBe(30);
  });

  test('should allow setting payment strategy', () => {
    const cart = new ShoppingCart();
    const strategy = new CreditCardPayment('1234-5678-9012-3456');

    expect(() => {
      cart.setPaymentStrategy(strategy);
    }).not.toThrow();
  });

  test('should handle credit card payment', () => {
    const cart = new ShoppingCart();
    const strategy = new CreditCardPayment('1234-5678-9012-3456');
    const spy = jest.spyOn(strategy, 'pay');

    cart.addItem(50);
    cart.setPaymentStrategy(strategy);
    cart.checkout();

    expect(spy).toHaveBeenCalledWith(50);
  });

  test('should handle paypal payment', () => {
    const cart = new ShoppingCart();
    const strategy = new PayPalPayment('user@example.com');
    const spy = jest.spyOn(strategy, 'pay');

    cart.addItem(100);
    cart.setPaymentStrategy(strategy);
    cart.checkout();

    expect(spy).toHaveBeenCalledWith(100);
  });

  test('should handle cryptocurrency payment', () => {
    const cart = new ShoppingCart();
    const strategy = new CryptoCurrencyPayment('0x123abc...');
    const spy = jest.spyOn(strategy, 'pay');

    cart.addItem(75);
    cart.setPaymentStrategy(strategy);
    cart.checkout();

    expect(spy).toHaveBeenCalledWith(75);
  });

  test('should throw error if no strategy is set', () => {
    const cart = new ShoppingCart();
    cart.addItem(100);

    expect(() => {
      cart.checkout();
    }).toThrow('Please select a payment strategy');
  });

  test('should allow switching payment strategies', () => {
    const cart = new ShoppingCart();
    cart.addItem(100);

    const creditCard = new CreditCardPayment('1234-5678-9012-3456');
    const paypal = new PayPalPayment('user@example.com');

    const creditCardSpy = jest.spyOn(creditCard, 'pay');
    const paypalSpy = jest.spyOn(paypal, 'pay');

    cart.setPaymentStrategy(creditCard);
    cart.checkout();

    cart.setPaymentStrategy(paypal);
    cart.checkout();

    expect(creditCardSpy).toHaveBeenCalledWith(100);
    expect(paypalSpy).toHaveBeenCalledWith(100);
  });

  test('should calculate correct total with multiple items', () => {
    const cart = new ShoppingCart();
    cart.addItem(25.5);
    cart.addItem(34.75);
    cart.addItem(10);

    expect(cart.getTotal()).toBeCloseTo(70.25);
  });
});
