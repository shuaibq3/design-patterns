/**
 * Decorator Pattern
 * Attaches additional responsibilities to an object dynamically.
 *
 * This example shows UI Component decoration. Without decorators, you'd need
 * separate classes for each combination: BorderedButton, BorderedScrollableButton,
 * BorderedScrollableHighlightedButton, etc. (combinatorial explosion)
 *
 * With decorators, you have 3 classes + any number of combinations.
 */

// Component interface
export interface UIComponent {
  render(): string;
}

// Concrete component - basic button
export class Button implements UIComponent {
  private label: string;

  constructor(label: string) {
    this.label = label;
  }

  render(): string {
    return `[${this.label}]`;
  }
}

// Decorator base class
export abstract class UIDecorator implements UIComponent {
  protected component: UIComponent;

  constructor(component: UIComponent) {
    this.component = component;
  }

  abstract render(): string;
}

// Concrete decorators - each adds a specific responsibility
export class BorderDecorator extends UIDecorator {
  render(): string {
    const inner = this.component.render();
    return `┌${inner.split('\n')[0].replace(/./g, '─')}┐\n│${inner}│\n└${inner.split('\n')[0].replace(/./g, '─')}┘`;
  }
}

export class ShadowDecorator extends UIDecorator {
  render(): string {
    return `${this.component.render()}\n  ▄▄`;
  }
}

export class HighlightDecorator extends UIDecorator {
  render(): string {
    return `✨ ${this.component.render()} ✨`;
  }
}

// Usage - demonstrate the real power: multiple different combinations
console.log('--- Simple Button ---');
let component: UIComponent = new Button('Click me');
console.log(component.render());

console.log('\n--- Button with Border ---');
component = new BorderDecorator(new Button('Save'));
console.log(component.render());

console.log('\n--- Button with Border + Shadow ---');
component = new ShadowDecorator(new BorderDecorator(new Button('Delete')));
console.log(component.render());

console.log('\n--- Button with Border + Highlight ---');
component = new HighlightDecorator(new BorderDecorator(new Button('Confirm')));
console.log(component.render());

console.log('\n--- Button with Shadow + Highlight (different order) ---');
component = new HighlightDecorator(new ShadowDecorator(new Button('Special')));
console.log(component.render());

console.log('\n--- Button with all decorators ---');
component = new HighlightDecorator(
  new ShadowDecorator(
    new BorderDecorator(
      new Button('Premium')
    )
  )
);
console.log(component.render());

// Without decorators, you'd need separate classes for each:
// - Button
// - BorderedButton
// - ShadowButton
// - HighlightedButton
// - BorderedShadowButton
// - BorderedHighlightedButton
// - ShadowHighlightedButton
// - BorderedShadowHighlightedButton
// ... and more if you add more decorators!
//
// With decorators: just 1 base class + 3 decorators = unlimited combinations
