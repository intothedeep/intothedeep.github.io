---
title: Getting Started with React
tags: [react, frontend, javascript]
date: 2025-03-20
thumbnail: /images/react-thumbnail.jpg
summary: Learn the fundamentals of React, a popular JavaScript library for building user interfaces maintained by Facebook.
---

# Getting Started with React

React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.

## Why React?

React has several advantages:

- **Component-Based**: Build encapsulated components that manage their own state.
- **Declarative**: React makes it painless to create interactive UIs.
- **Learn Once, Write Anywhere**: Develop new features without rewriting existing code.

## Installation

You can start a new React project using Create React App:

```bash
npx create-react-app my-app
cd my-app
npm start
```

## Basic Concepts

### JSX

JSX is a syntax extension to JavaScript. It looks like HTML but comes with the full power of JavaScript.

```jsx
const element = <h1>Hello, world!</h1>;
```

### Components

Components let you split the UI into independent, reusable pieces.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Props

Props are inputs to components. They are data passed from a parent component to a child component.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
```

### State

State allows React components to change their output over time in response to user actions, network responses, and anything else.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

## Next Steps

After understanding these basics, you can dive deeper into:

1. Handling events
2. Conditional rendering
3. Lists and keys
4. Forms
5. Lifting state up
6. Composition vs inheritance