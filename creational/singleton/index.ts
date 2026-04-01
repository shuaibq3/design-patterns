/**
 * Singleton Pattern
 * Ensures a class has only one instance and provides a global point of access to it.
 */

// Singleton implementation
export class Database {
  private static instance: Database;
  private connectionString: string;

  private constructor() {
    this.connectionString = 'localhost:5432';
    console.log('Database instance created');
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  connect(): void {
    console.log(`Connecting to database at ${this.connectionString}`);
  }

  query(sql: string): void {
    console.log(`Executing query: ${sql}`);
  }

  disconnect(): void {
    console.log('Disconnecting from database');
  }
}

// Usage
const db1 = Database.getInstance();
db1.connect();
db1.query('SELECT * FROM users');

const db2 = Database.getInstance();
db2.query('SELECT * FROM products');

console.log(db1 === db2); // true - same instance

db1.disconnect();
