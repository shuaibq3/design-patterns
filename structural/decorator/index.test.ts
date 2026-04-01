/**
 * Tests for Decorator Pattern
 */

import {
  UIComponent,
  Button,
  BorderDecorator,
  ShadowDecorator,
  HighlightDecorator
} from './index';

describe('Decorator Pattern', () => {
  test('button should render with label', () => {
    const button = new Button('Click me');
    const rendered = button.render();

    expect(rendered).toContain('Click me');
    expect(rendered).toBe('[Click me]');
  });

  test('border decorator should wrap component', () => {
    const button = new Button('Save');
    const bordered = new BorderDecorator(button);
    const rendered = bordered.render();

    expect(rendered).toContain('Save');
    expect(rendered).toContain('┌');
    expect(rendered).toContain('└');
  });

  test('shadow decorator should add shadow to component', () => {
    const button = new Button('Delete');
    const shadowed = new ShadowDecorator(button);
    const rendered = shadowed.render();

    expect(rendered).toContain('Delete');
    expect(rendered).toContain('▄▄');
  });

  test('highlight decorator should add highlight', () => {
    const button = new Button('Special');
    const highlighted = new HighlightDecorator(button);
    const rendered = highlighted.render();

    expect(rendered).toContain('Special');
    expect(rendered).toContain('✨');
  });

  test('multiple decorators should stack (border + shadow)', () => {
    let component: UIComponent = new Button('Stacked');
    component = new BorderDecorator(component);
    component = new ShadowDecorator(component);
    const rendered = component.render();

    expect(rendered).toContain('Stacked');
    expect(rendered).toContain('┌');
    expect(rendered).toContain('▄▄');
  });

  test('decorators should be composable in any order', () => {
    const button1 = new Button('Test1');
    const button2 = new Button('Test2');

    // Order 1: Shadow then Highlight
    const variant1: UIComponent = new HighlightDecorator(
      new ShadowDecorator(button1)
    );

    // Order 2: Highlight then Shadow
    const variant2: UIComponent = new ShadowDecorator(
      new HighlightDecorator(button2)
    );

    const render1 = variant1.render();
    const render2 = variant2.render();

    // Both should contain the decorations but in different orders
    expect(render1).toContain('✨');
    expect(render1).toContain('▄▄');
    expect(render2).toContain('✨');
    expect(render2).toContain('▄▄');
  });

  test('all decorators should compose together', () => {
    let component: UIComponent = new Button('Premium');
    component = new HighlightDecorator(
      new ShadowDecorator(new BorderDecorator(component))
    );
    const rendered = component.render();

    expect(rendered).toContain('Premium');
    expect(rendered).toContain('✨');
    expect(rendered).toContain('┌');
    expect(rendered).toContain('▄▄');
  });

  test('original button should remain unchanged when decorated', () => {
    const button = new Button('Original');
    const original = button.render();

    // Apply decorators
    const decorated = new BorderDecorator(
      new ShadowDecorator(new HighlightDecorator(button))
    );
    decorated.render();

    // Original button should be unmodified
    expect(button.render()).toBe(original);
    expect(button.render()).toBe('[Original]');
  });

  test('decorators can wrap any UI component', () => {
    const button = new Button('Flexible');

    // Create a variation
    const bordered: UIComponent = new BorderDecorator(button);

    // The decorator should work regardless of component type
    expect(bordered.render()).toContain('Flexible');
    expect(bordered.render()).toContain('┌');
  });
});
