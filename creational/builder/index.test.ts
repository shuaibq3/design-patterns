/**
 * Tests for Builder Pattern
 */

import {
  ComputerBuilder
} from './index';

describe('Builder Pattern', () => {
  test('should build a complete computer', () => {
    const computer = new ComputerBuilder()
      .setMotherboard('ASUS', 'LGA1700', 'Z790-E')
      .setCpu('Intel i9', 24, 5.8)
      .setRam(32, 'DDR5', 6000)
      .setStorage(2, 'NVMe SSD', 'PCIe 4.0')
      .setGpu('RTX 4090', 24, 'GDDR6X')
      .setPowerSupply(850, '80+ Gold')
      .build();

    expect(computer.cpu?.model).toBe('Intel i9');
    expect(computer.ram?.capacity).toBe(32);
    expect(computer.storage?.type).toBe('NVMe SSD');
    expect(computer.gpu?.model).toBe('RTX 4090');
    expect(computer.powerSupply?.wattage).toBe(850);
    expect(computer.motherboard?.manufacturer).toBe('ASUS');
  });

  test('should build computer with partial configuration', () => {
    const computer = new ComputerBuilder()
      .setCpu('Ryzen 5', 6, 4.6)
      .setRam(16, 'DDR4', 3200)
      .build();

    expect(computer.cpu?.cores).toBe(6);
    expect(computer.ram?.type).toBe('DDR4');
    expect(computer.gpu).toBeNull();
    expect(computer.powerSupply).toBeNull();
  });

  test('should allow method chaining', () => {
    const builder = new ComputerBuilder();
    const result = builder
      .setCpu('Intel i5', 8, 4.0)
      .setRam(16, 'DDR4', 3200);

    expect(result).toBe(builder);
  });

  test('should build empty computer with no components', () => {
    const computer = new ComputerBuilder().build();

    expect(computer.cpu).toBeNull();
    expect(computer.ram).toBeNull();
    expect(computer.storage).toBeNull();
    expect(computer.gpu).toBeNull();
    expect(computer.powerSupply).toBeNull();
    expect(computer.motherboard).toBeNull();
  });
});
