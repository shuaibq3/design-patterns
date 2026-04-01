/**
 * Tests for Singleton Pattern
 */

import { Database } from './index';

describe('Singleton Pattern', () => {
  test('should return the same instance on multiple calls', () => {
    const db1 = Database.getInstance();
    const db2 = Database.getInstance();

    expect(db1).toBe(db2);
  });

  test('should have only one instance', () => {
    const instances = new Set();

    for (let i = 0; i < 5; i++) {
      instances.add(Database.getInstance());
    }

    expect(instances.size).toBe(1);
  });

  test('should prevent multiple instances', () => {
    const db1 = Database.getInstance();
    const db2 = Database.getInstance();

    expect(db1).toBe(db2);
    // Additional instances should still be the same
    const db3 = Database.getInstance();
    expect(db3).toBe(db1);
  });

  test('instance should have required methods', () => {
    const db = Database.getInstance();

    expect(typeof db.connect).toBe('function');
    expect(typeof db.query).toBe('function');
    expect(typeof db.disconnect).toBe('function');
  });

  test('should maintain state across getInstance calls', () => {
    const db1 = Database.getInstance();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (db1 as any).testProperty = 'test value';

    const db2 = Database.getInstance();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((db2 as any).testProperty).toBe('test value');
  });
});
