/**
 * Tests for Observer Pattern
 */

import { Observer, NewsAgency } from './index';

describe('Observer Pattern', () => {
  class MockObserver implements Observer {
    receivedData: string = '';

    update(data: string): void {
      this.receivedData = data;
    }
  }

  test('observers should be notified of news', () => {
    const agency = new NewsAgency();
    const observer1 = new MockObserver();
    const observer2 = new MockObserver();

    agency.attach(observer1);
    agency.attach(observer2);
    agency.publishNews('Breaking news!');

    expect(observer1.receivedData).toBe('Breaking news!');
    expect(observer2.receivedData).toBe('Breaking news!');
  });

  test('detached observers should not be notified', () => {
    const agency = new NewsAgency();
    const observer = new MockObserver();

    agency.attach(observer);
    agency.detach(observer);
    agency.publishNews('News update');

    expect(observer.receivedData).toBe('');
  });

  test('should prevent duplicate observers', () => {
    const agency = new NewsAgency();
    const observer = new MockObserver();

    agency.attach(observer);
    agency.attach(observer);
    agency.publishNews('Test');

    // Should only receive one notification
    expect(observer.receivedData).toBe('Test');
  });

  test('multiple news updates should notify all observers', () => {
    const agency = new NewsAgency();
    const observer1 = new MockObserver();
    const observer2 = new MockObserver();

    agency.attach(observer1);
    agency.attach(observer2);

    agency.publishNews('First news');
    expect(observer1.receivedData).toBe('First news');
    expect(observer2.receivedData).toBe('First news');

    agency.publishNews('Second news');
    expect(observer1.receivedData).toBe('Second news');
    expect(observer2.receivedData).toBe('Second news');
  });

  test('observer update should be called with correct data', () => {
    const agency = new NewsAgency();
    const observer = new MockObserver();
    const spy = jest.spyOn(observer, 'update');

    agency.attach(observer);
    const newsText = 'Important news';
    agency.publishNews(newsText);

    expect(spy).toHaveBeenCalledWith(newsText);
  });
});
