/**
 * Observer Pattern
 * Defines a one-to-many dependency between objects so that when one object changes state,
 * all its dependents are notified automatically.
 */

// Observer interface
export interface Observer {
  update(data: string): void;
}

// Subject
export class NewsAgency {
  private observers: Observer[] = [];
  private latestNews: string = '';

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      console.log('Observer attached');
    }
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log('Observer detached');
    }
  }

  notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.update(this.latestNews);
    });
  }

  publishNews(news: string): void {
    this.latestNews = news;
    this.notifyObservers();
  }
}

// Concrete observers
export class EmailSubscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(data: string): void {
    console.log(`${this.name} received email: ${data}`);
  }
}

export class SMSSubscriber implements Observer {
  private number: string;

  constructor(number: string) {
    this.number = number;
  }

  update(data: string): void {
    console.log(`${this.number} received SMS: ${data}`);
  }
}

// Usage
const agency = new NewsAgency();

const emailSub = new EmailSubscriber('john@example.com');
const smsSub = new SMSSubscriber('+1234567890');

agency.attach(emailSub);
agency.attach(smsSub);

agency.publishNews('Breaking news: Stock market rises!');
agency.publishNews('Weather alert: Heavy rain expected');
