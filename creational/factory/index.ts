/**
 * Factory Pattern
 * Creates objects without specifying their exact classes.
 */

// Product interface
export interface Transport {
  deliver(cargo: string): void;
}

// Concrete products
export class Truck implements Transport {
  deliver(cargo: string): void {
    console.log(`Truck delivering ${cargo} by road`);
  }
}

export class Ship implements Transport {
  deliver(cargo: string): void {
    console.log(`Ship delivering ${cargo} by sea`);
  }
}

export class Plane implements Transport {
  deliver(cargo: string): void {
    console.log(`Plane delivering ${cargo} by air`);
  }
}

// Creator/Factory
export abstract class Logistics {
  abstract createTransport(): Transport;

  planDelivery(cargo: string): void {
    const transport = this.createTransport();
    transport.deliver(cargo);
  }
}

// Concrete factories
export class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

export class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}

export class AirLogistics extends Logistics {
  createTransport(): Transport {
    return new Plane();
  }
}

// Usage
function main(logisticsType: string): void {
  let logistics: Logistics;

  if (logisticsType === 'road') {
    logistics = new RoadLogistics();
  } else if (logisticsType === 'sea') {
    logistics = new SeaLogistics();
  } else if (logisticsType === 'air') {
    logistics = new AirLogistics();
  } else {
    throw new Error('Unknown logistics type');
  }

  logistics.planDelivery('Books');
}

main('road');
main('sea');
main('air');
