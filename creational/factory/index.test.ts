/**
 * Tests for Factory Pattern
 */

import {
  Transport,
  Truck,
  Ship,
  Plane,
  RoadLogistics,
  SeaLogistics,
  AirLogistics
} from './index';

describe('Factory Pattern', () => {
  test('should create truck transport via RoadLogistics', () => {
    const logistics = new RoadLogistics();
    const transport = logistics.createTransport();

    expect(transport).toBeInstanceOf(Truck);
  });

  test('should create ship transport via SeaLogistics', () => {
    const logistics = new SeaLogistics();
    const transport = logistics.createTransport();

    expect(transport).toBeInstanceOf(Ship);
  });

  test('should create plane transport via AirLogistics', () => {
    const logistics = new AirLogistics();
    const transport = logistics.createTransport();

    expect(transport).toBeInstanceOf(Plane);
  });

  test('should deliver cargo using created transport', () => {
    const deliverSpy = jest.fn();
    const mockLogistics = new RoadLogistics();

    // Mock the createTransport method
    jest.spyOn(mockLogistics, 'createTransport').mockReturnValue({
      deliver: deliverSpy
    } as unknown as Transport);

    mockLogistics.planDelivery('Books');

    expect(deliverSpy).toHaveBeenCalledWith('Books');
  });

  test('should create different transport types for different logistics', () => {
    const road = new RoadLogistics();
    const sea = new SeaLogistics();
    const air = new AirLogistics();

    expect(road.createTransport()).toBeInstanceOf(Truck);
    expect(sea.createTransport()).toBeInstanceOf(Ship);
    expect(air.createTransport()).toBeInstanceOf(Plane);
  });
});
