# Design Patterns Reference - TypeScript

A comprehensive reference implementation of 10 Gang of Four design patterns in TypeScript, with clear examples demonstrating when and why each pattern is useful.

## Setup

### Installation

```bash
npm install
```

### Scripts

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Execute a pattern file
npm run pattern -- <path-to-pattern>
```

## Project Structure

```
design-patterns/
├── creational/
│   ├── builder/              # Builder Pattern
│   ├── factory/              # Factory Pattern
│   ├── singleton/            # Singleton Pattern
│   └── abstract-factory/     # Abstract Factory Pattern
├── structural/
│   ├── bridge/               # Bridge Pattern
│   ├── adapter/              # Adapter Pattern
│   └── decorator/            # Decorator Pattern
└── behavioral/
    ├── observer/             # Observer Pattern
    ├── state/                # State Pattern
    └── strategy/             # Strategy Pattern
```

## Patterns Overview

### Creational Patterns

**Builder**
- Separates construction of a complex object from its representation
- Allows step-by-step construction with method chaining

**Factory**
- Creates objects without specifying their exact classes
- Provides interfaces for object creation

**Singleton**
- Ensures a class has only one instance
- Provides global point of access to the instance

**Abstract Factory**
- Creates families of related objects (e.g., light/dark UI themes)
- Provides interfaces for creating families of objects

### Structural Patterns

**Bridge**
- Decouples an abstraction from its implementation
- Allows two abstractions to vary independently

**Adapter**
- Converts interface of a class into another interface clients expect
- Lets classes work together that couldn't otherwise

**Decorator**
- Attaches additional responsibilities to objects dynamically
- Provides flexible alternative to subclassing
- Example: UI Component decoration (Border, Shadow, Highlight) with unlimited combinations
- Shows why decorators are superior to combinatorial class explosion

### Behavioral Patterns

**Observer**
- Defines one-to-many dependency between objects
- Notifies multiple objects about state changes automatically

**State**
- Allows object to alter behavior when internal state changes
- Simplifies complex conditional logic

**Strategy**
- Defines family of algorithms and makes them interchangeable
- Encapsulates algorithms to select at runtime

## Configuration

- **ESLint**: `.eslintrc.json` - TypeScript linting rules
- **TypeScript**: `tsconfig.json` - Compiler configuration
- **Jest**: `jest.config.js` - Test configuration

## Running Examples

To run any pattern example using the npm script:

```bash
# Creational Patterns
npm run pattern -- creational/builder/index.ts
npm run pattern -- creational/factory/index.ts
npm run pattern -- creational/singleton/index.ts
npm run pattern -- creational/abstract-factory/index.ts

# Structural Patterns
npm run pattern -- structural/bridge/index.ts
npm run pattern -- structural/adapter/index.ts
npm run pattern -- structural/decorator/index.ts

# Behavioral Patterns
npm run pattern -- behavioral/observer/index.ts
npm run pattern -- behavioral/state/index.ts
npm run pattern -- behavioral/strategy/index.ts
```

Or directly with ts-node:

```bash
npx ts-node <path-to-pattern>/index.ts
```
