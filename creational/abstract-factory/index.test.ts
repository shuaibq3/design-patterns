/**
 * Tests for Abstract Factory Pattern
 */

import {
  LightButton,
  LightCheckbox,
  LightTextInput,
  DarkButton,
  DarkCheckbox,
  DarkTextInput,
  LightThemeFactory,
  DarkThemeFactory
} from './index';

describe('Abstract Factory Pattern', () => {
  test('LightThemeFactory should create light theme components', () => {
    const factory = new LightThemeFactory();

    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    const textInput = factory.createTextInput();

    expect(button).toBeInstanceOf(LightButton);
    expect(checkbox).toBeInstanceOf(LightCheckbox);
    expect(textInput).toBeInstanceOf(LightTextInput);
  });

  test('DarkThemeFactory should create dark theme components', () => {
    const factory = new DarkThemeFactory();

    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    const textInput = factory.createTextInput();

    expect(button).toBeInstanceOf(DarkButton);
    expect(checkbox).toBeInstanceOf(DarkCheckbox);
    expect(textInput).toBeInstanceOf(DarkTextInput);
  });

  test('each factory should create related family of products', () => {
    const lightFactory = new LightThemeFactory();
    const darkFactory = new DarkThemeFactory();

    const lightComponents = [
      lightFactory.createButton(),
      lightFactory.createCheckbox(),
      lightFactory.createTextInput()
    ];
    const darkComponents = [
      darkFactory.createButton(),
      darkFactory.createCheckbox(),
      darkFactory.createTextInput()
    ];

    lightComponents.forEach((component) => {
      expect(component).toHaveProperty('render');
    });

    darkComponents.forEach((component) => {
      expect(component).toHaveProperty('render');
    });
  });

  test('components should have correct methods', () => {
    const factory = new LightThemeFactory();

    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    const textInput = factory.createTextInput();

    expect(typeof button.render).toBe('function');
    expect(typeof button.onClick).toBe('function');
    expect(typeof checkbox.toggle).toBe('function');
    expect(typeof textInput.setText).toBe('function');
  });
});
