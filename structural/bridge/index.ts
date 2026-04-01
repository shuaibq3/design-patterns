/**
 * Bridge Pattern
 * Decouples an abstraction from its implementation so the two can vary independently.
 */

// Implementation interface
export interface Renderer {
  renderCircle(radius: number): void;
  renderSquare(side: number): void;
}

// Concrete implementations
export class RasterRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`Rendering circle with radius ${radius} as pixels`);
  }

  renderSquare(side: number): void {
    console.log(`Rendering square with side ${side} as pixels`);
  }
}

export class VectorRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`Rendering circle with radius ${radius} as vectors`);
  }

  renderSquare(side: number): void {
    console.log(`Rendering square with side ${side} as vectors`);
  }
}

// Abstraction
export abstract class Shape {
  protected renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  abstract draw(): void;
}

// Refined abstractions
export class Circle extends Shape {
  private radius: number;

  constructor(renderer: Renderer, radius: number) {
    super(renderer);
    this.radius = radius;
  }

  draw(): void {
    this.renderer.renderCircle(this.radius);
  }
}

export class Square extends Shape {
  private side: number;

  constructor(renderer: Renderer, side: number) {
    super(renderer);
    this.side = side;
  }

  draw(): void {
    this.renderer.renderSquare(this.side);
  }
}

// Usage
const rasterRenderer = new RasterRenderer();
const vectorRenderer = new VectorRenderer();

const rasterCircle = new Circle(rasterRenderer, 5);
rasterCircle.draw();

const vectorSquare = new Square(vectorRenderer, 10);
vectorSquare.draw();
