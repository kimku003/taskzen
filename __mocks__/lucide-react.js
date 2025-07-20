// __mocks__/lucide-react.js
// We are mocking lucide-react to return a simple string for any icon.
// This avoids the ESM/CJS issue during tests.

const React = require('react');

const lucideMock = new Proxy({}, {
  get: (target, prop) => {
    // Return a simple React component for any icon requested
    return (props) => React.createElement('svg', { ...props, 'data-lucide-icon': prop });
  }
});

module.exports = lucideMock;
