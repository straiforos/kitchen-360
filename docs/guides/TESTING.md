# Unit Testing Guide

This guide outlines the unit testing strategy for the Kitchen 360° Organizer project.

## Testing Tools

- **Jest**: JavaScript testing framework
- **React Testing Library**: For testing React components
- **Jest DOM**: For DOM-specific testing utilities
- **TypeScript**: For type checking

## Testing Commands

- `npm test`: Run all unit tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Generate test coverage report

## Unit Testing Best Practices

### Component Testing

1. **Test Structure**
   - Use `describe` blocks to group related tests
   - Use `it` or `test` for individual test cases
   - Use `beforeEach` for test setup
   - Use `afterEach` for cleanup

2. **Component Rendering**
   - Test if components render without crashing
   - Test if required elements are present
   - Use `data-testid` attributes for reliable element selection

3. **Event Handling**
   - Test user interactions
   - Verify callback functions are called with correct arguments
   - Test state updates

### Mocking

1. **External Dependencies**
   - Mock third-party libraries
   - Mock API calls
   - Mock browser APIs (e.g., IndexedDB)

2. **Context and Providers**
   - Create mock context values
   - Wrap components with necessary providers
   - Test context-dependent behavior

## Test Categories

1. **Viewer Component**
   - Basic rendering
   - Position change handling
   - Property updates
   - Event handling

2. **AppBar Component**
   - Basic rendering
   - Title display
   - Theme toggle functionality
   - Navigation controls

3. **Navigation Component**
   - Basic rendering
   - Room list display
   - Room selection handling
   - Drawer state management

## Guidelines

1. **Test Coverage**
   - Focus on critical paths
   - Test both success and error scenarios
   - Maintain high coverage for core functionality

2. **Test Organization**
   - Group related tests together
   - Use descriptive test names
   - Keep tests focused and independent

3. **Performance**
   - Keep tests fast and efficient
   - Use appropriate mocking strategies
   - Avoid unnecessary setup and teardown

4. **Maintainability**
   - Write clear and readable tests
   - Use consistent patterns
   - Document complex test scenarios
