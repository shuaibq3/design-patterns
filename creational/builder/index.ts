/**
 * Builder Pattern with Composition
 * Separates the construction of a complex object from its representation.
 * Demonstrates composition with nested complex objects.
 */

// Component classes (composition)
export class CPU {
  constructor(public model: string, public cores: number, public ghz: number) {}

  toString(): string {
    return `CPU: ${this.model} (${this.cores} cores @ ${this.ghz}GHz)`;
  }
}

export class RAM {
  constructor(public capacity: number, public type: string, public speed: number) {}

  toString(): string {
    return `RAM: ${this.capacity}GB ${this.type} @ ${this.speed}MHz`;
  }
}

export class StorageDrive {
  constructor(public capacity: number, public type: string, public speed: string) {}

  toString(): string {
    return `Storage: ${this.capacity}TB ${this.type} (${this.speed})`;
  }
}

export class GPU {
  constructor(public model: string, public memory: number, public memoryType: string) {}

  toString(): string {
    return `GPU: ${this.model} (${this.memory}GB ${this.memoryType})`;
  }
}

export class PowerSupply {
  constructor(public wattage: number, public efficiency: string) {}

  toString(): string {
    return `Power Supply: ${this.wattage}W ${this.efficiency}`;
  }
}

export class Motherboard {
  constructor(public manufacturer: string, public socket: string, public chipset: string) {}

  toString(): string {
    return `Motherboard: ${this.manufacturer} ${this.chipset} (Socket ${this.socket})`;
  }
}

// Complex product with composition
export class Computer {
  cpu: CPU | null = null;
  ram: RAM | null = null;
  storage: StorageDrive | null = null;
  gpu: GPU | null = null;
  powerSupply: PowerSupply | null = null;
  motherboard: Motherboard | null = null;

  toString(): string {
    return `Computer {
      ${this.motherboard ? this.motherboard.toString() : 'Motherboard: Not set'}
      ${this.cpu ? this.cpu.toString() : 'CPU: Not set'}
      ${this.ram ? this.ram.toString() : 'RAM: Not set'}
      ${this.storage ? this.storage.toString() : 'Storage: Not set'}
      ${this.gpu ? this.gpu.toString() : 'GPU: Not set'}
      ${this.powerSupply ? this.powerSupply.toString() : 'Power Supply: Not set'}
    }`;
  }
}

// Builder
export class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCpu(model: string, cores: number, ghz: number): ComputerBuilder {
    this.computer.cpu = new CPU(model, cores, ghz);
    return this;
  }

  setRam(capacity: number, type: string, speed: number): ComputerBuilder {
    this.computer.ram = new RAM(capacity, type, speed);
    return this;
  }

  setStorage(capacity: number, type: string, speed: string): ComputerBuilder {
    this.computer.storage = new StorageDrive(capacity, type, speed);
    return this;
  }

  setGpu(model: string, memory: number, memoryType: string): ComputerBuilder {
    this.computer.gpu = new GPU(model, memory, memoryType);
    return this;
  }

  setPowerSupply(wattage: number, efficiency: string): ComputerBuilder {
    this.computer.powerSupply = new PowerSupply(wattage, efficiency);
    return this;
  }

  setMotherboard(
    manufacturer: string,
    socket: string,
    chipset: string
  ): ComputerBuilder {
    this.computer.motherboard = new Motherboard(manufacturer, socket, chipset);
    return this;
  }

  build(): Computer {
    return this.computer;
  }
}

// Usage
const gamingPC = new ComputerBuilder()
  .setMotherboard('ASUS', 'LGA1700', 'Z790-E')
  .setCpu('Intel Core i9-13900K', 24, 5.8)
  .setRam(32, 'DDR5', 6000)
  .setStorage(2, 'NVMe SSD', 'PCIe 4.0')
  .setGpu('NVIDIA RTX 4090', 24, 'GDDR6X')
  .setPowerSupply(850, '80+ Gold')
  .build();

console.log('Gaming PC:');
console.log(gamingPC.toString());

// Different configuration using the same builder
const budgetPC = new ComputerBuilder()
  .setMotherboard('MSI', 'AM5', 'B650')
  .setCpu('AMD Ryzen 5 5600X', 6, 4.6)
  .setRam(16, 'DDR4', 3200)
  .setStorage(512, 'SSD', 'SATA')
  .setPowerSupply(550, '80+ Bronze')
  .build();

console.log('\nBudget PC:');
console.log(budgetPC.toString());

// Partially built configuration
const workstationPC = new ComputerBuilder()
  .setMotherboard('Gigabyte', 'LGA1700', 'W680')
  .setCpu('Intel Xeon W5-3435X', 16, 4.0)
  .setRam(128, 'DDR5', 5600)
  .setStorage(4, 'NVMe SSD', 'PCIe 4.0')
  .setPowerSupply(1200, '80+ Platinum')
  .build();

console.log('\nWorkstation PC:');
console.log(workstationPC.toString());
