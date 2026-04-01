/**
 * Tests for Bridge Pattern
 */

import {
  Renderer,
  RasterRenderer,
  VectorRenderer,
  Circle,
  Square
} from './index';

describe('Bridge Pattern', () => {
  test('Circle should use raster renderer', () => {
    const renderer = new RasterRenderer();
    const spy = jest.spyOn(renderer, 'renderCircle');

    const circle = new Circle(renderer, 5);
    circle.draw();

    expect(spy).toHaveBeenCalledWith(5);
  });

  test('Square should use vector renderer', () => {
    const renderer = new VectorRenderer();
    const spy = jest.spyOn(renderer, 'renderSquare');

    const square = new Square(renderer, 10);
    square.draw();

    expect(spy).toHaveBeenCalledWith(10);
  });

  test('Shape should work with different renderers', () => {
    const rasterRenderer = new RasterRenderer();
    const vectorRenderer = new VectorRenderer();

    const rasterSpy = jest.spyOn(rasterRenderer, 'renderCircle');
    const vectorSpy = jest.spyOn(vectorRenderer, 'renderSquare');

    const circle = new Circle(rasterRenderer, 7);
    const square = new Square(vectorRenderer, 14);

    circle.draw();
    square.draw();

    expect(rasterSpy).toHaveBeenCalledWith(7);
    expect(vectorSpy).toHaveBeenCalledWith(14);
  });

  test('should allow switching renderers at runtime', () => {
    let renderer: Renderer = new RasterRenderer();
    const shape = new Circle(renderer, 5);

    const rasterSpy = jest.spyOn(renderer, 'renderCircle');
    shape.draw();
    expect(rasterSpy).toHaveBeenCalledWith(5);

    renderer = new VectorRenderer();
    const vectorSpy = jest.spyOn(renderer, 'renderCircle');
    const newShape = new Circle(renderer, 5);
    newShape.draw();
    expect(vectorSpy).toHaveBeenCalledWith(5);
  });
});
