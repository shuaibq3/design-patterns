/**
 * State Pattern
 * Allows an object to alter its behavior when its internal state changes.
 */

// State interface
export interface State {
  handle(context: TrafficLight): void;
}

// Concrete states
export class RedState implements State {
  handle(context: TrafficLight): void {
    console.log('Red light - Stop!');
    context.setState(new GreenState());
  }
}

export class GreenState implements State {
  handle(context: TrafficLight): void {
    console.log('Green light - Go!');
    context.setState(new YellowState());
  }
}

export class YellowState implements State {
  handle(context: TrafficLight): void {
    console.log('Yellow light - Caution!');
    context.setState(new RedState());
  }
}

// Context
export class TrafficLight {
  private state: State;

  constructor() {
    this.state = new RedState();
  }

  setState(state: State): void {
    this.state = state;
  }

  getState(): State {
    return this.state;
  }

  request(): void {
    this.state.handle(this);
  }
}

// Usage
const light = new TrafficLight();

light.request(); // Red light - Stop!
light.request(); // Green light - Go!
light.request(); // Yellow light - Caution!
light.request(); // Red light - Stop!;
