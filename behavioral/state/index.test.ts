/**
 * Tests for State Pattern
 */

import {
  RedState,
  GreenState,
  YellowState,
  TrafficLight
} from './index';

describe('State Pattern', () => {
  test('traffic light should start in red state', () => {
    const light = new TrafficLight();

    expect(light.getState()).toBeInstanceOf(RedState);
  });

  test('red light should transition to green', () => {
    const light = new TrafficLight();

    light.request();

    expect(light.getState()).toBeInstanceOf(GreenState);
  });

  test('green light should transition to yellow', () => {
    const light = new TrafficLight();

    light.request(); // Red -> Green
    light.request(); // Green -> Yellow

    expect(light.getState()).toBeInstanceOf(YellowState);
  });

  test('yellow light should transition to red', () => {
    const light = new TrafficLight();

    light.request(); // Red -> Green
    light.request(); // Green -> Yellow
    light.request(); // Yellow -> Red

    expect(light.getState()).toBeInstanceOf(RedState);
  });

  test('traffic light should cycle through all states', () => {
    const light = new TrafficLight();
    const states: string[] = [];

    for (let i = 0; i < 4; i++) {
      states.push(light.getState().constructor.name);
      light.request();
    }

    expect(states).toEqual(['RedState', 'GreenState', 'YellowState', 'RedState']);
  });

  test('should allow manual state setting', () => {
    const light = new TrafficLight();

    light.setState(new YellowState());

    expect(light.getState()).toBeInstanceOf(YellowState);
  });

  test('state transitions should be consistent', () => {
    const light1 = new TrafficLight();
    const light2 = new TrafficLight();

    for (let i = 0; i < 3; i++) {
      light1.request();
      light2.request();
    }

    expect(light1.getState().constructor.name).toBe(light2.getState().constructor.name);
  });
});
