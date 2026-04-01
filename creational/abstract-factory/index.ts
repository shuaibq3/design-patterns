/**
 * Abstract Factory Pattern
 * Provides an interface for creating families of related or dependent objects
 * without specifying their concrete classes.
 */

// Abstract product interfaces
export interface Button {
  render(): void;
  onClick(): void;
}

export interface Checkbox {
  render(): void;
  toggle(): void;
}

export interface TextInput {
  render(): void;
  setText(text: string): void;
}

// Light theme concrete products
export class LightButton implements Button {
  render(): void {
    console.log('Rendering Light Button - White background, black text');
  }

  onClick(): void {
    console.log('Light Button clicked - Gray highlight on hover');
  }
}

export class LightCheckbox implements Checkbox {
  private checked = false;

  render(): void {
    console.log(`Rendering Light Checkbox - ${this.checked ? '✓' : '☐'}`);
  }

  toggle(): void {
    this.checked = !this.checked;
    console.log(`Light Checkbox toggled - Now ${this.checked ? 'checked' : 'unchecked'}`);
  }
}

export class LightTextInput implements TextInput {
  private text = '';

  render(): void {
    console.log(
      `Rendering Light TextInput - White background with content: "${this.text}"`
    );
  }

  setText(text: string): void {
    this.text = text;
    console.log(`Light TextInput text set to: "${text}"`);
  }
}

// Dark theme concrete products
export class DarkButton implements Button {
  render(): void {
    console.log('Rendering Dark Button - Dark background, white text');
  }

  onClick(): void {
    console.log('Dark Button clicked - Lighter highlight on hover');
  }
}

export class DarkCheckbox implements Checkbox {
  private checked = false;

  render(): void {
    console.log(`Rendering Dark Checkbox - ${this.checked ? '✓' : '☐'}`);
  }

  toggle(): void {
    this.checked = !this.checked;
    console.log(`Dark Checkbox toggled - Now ${this.checked ? 'checked' : 'unchecked'}`);
  }
}

export class DarkTextInput implements TextInput {
  private text = '';

  render(): void {
    console.log(
      `Rendering Dark TextInput - Dark background with content: "${this.text}"`
    );
  }

  setText(text: string): void {
    this.text = text;
    console.log(`Dark TextInput text set to: "${text}"`);
  }
}

// Abstract factory interface
export interface UIComponentFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
  createTextInput(): TextInput;
}

// Concrete factories
export class LightThemeFactory implements UIComponentFactory {
  createButton(): Button {
    return new LightButton();
  }

  createCheckbox(): Checkbox {
    return new LightCheckbox();
  }

  createTextInput(): TextInput {
    return new LightTextInput();
  }
}

export class DarkThemeFactory implements UIComponentFactory {
  createButton(): Button {
    return new DarkButton();
  }

  createCheckbox(): Checkbox {
    return new DarkCheckbox();
  }

  createTextInput(): TextInput {
    return new DarkTextInput();
  }
}

// Client code
class Application {
  private factory: UIComponentFactory;
  private button: Button;
  private checkbox: Checkbox;
  private textInput: TextInput;

  constructor(factory: UIComponentFactory) {
    this.factory = factory;
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
    this.textInput = factory.createTextInput();
  }

  render(): void {
    this.button.render();
    this.checkbox.render();
    this.textInput.render();
  }

  interact(): void {
    this.button.onClick();
    this.checkbox.toggle();
    this.textInput.setText('Enter your name here');
  }
}

// Usage - Demonstrating theme switching
console.log('=== Light Theme Application ===');
const lightTheme = new Application(new LightThemeFactory());
lightTheme.render();
console.log('');
lightTheme.interact();

console.log('\n=== Dark Theme Application ===');
const darkTheme = new Application(new DarkThemeFactory());
darkTheme.render();
console.log('');
darkTheme.interact();

// Dynamic theme selection
function createApplicationForTheme(themeType: 'light' | 'dark'): Application {
  const factory: UIComponentFactory =
    themeType === 'light' ? new LightThemeFactory() : new DarkThemeFactory();
  return new Application(factory);
}

console.log('\n=== Dynamic Theme Selection ===');
const selectedTheme = createApplicationForTheme('dark');
selectedTheme.render();
