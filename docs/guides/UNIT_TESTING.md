# Unit Testing Guide

This guide outlines the unit testing strategy for the Kitchen 360° Organizer project, focusing on isolated component testing.

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
   - Test component in isolation from other components

3. **Event Handling**
   - Test user interactions in isolation
   - Verify callback functions are called with correct arguments
   - Test state updates within the component
   - Mock all external dependencies

### Mocking Strategy

1. **External Dependencies**
   - Mock third-party libraries
   - Mock API calls
   - Mock browser APIs (e.g., IndexedDB)
   - Mock context providers
   - Mock child components

2. **Test Isolation**
   - Each test should be independent
   - Tests should not rely on external state
   - Clear mocks between tests
   - Avoid testing implementation details

## Test Categories

1. **Component Unit Tests**
   - Basic rendering and structure
   - Props handling
   - Internal state management
   - Event handlers
   - Error boundaries
   - Loading states

2. **Utility Function Tests**
   - Pure function testing
   - Data transformation
   - Validation logic
   - Formatting functions

3. **Hook Tests**
   - Custom hook behavior
   - State management
   - Effect handling
   - Context consumption

## Guidelines

1. **Test Coverage**
   - Focus on component-specific functionality
   - Test all component states
   - Test error cases
   - Maintain high coverage for core components

2. **Test Organization**
   - One test file per component
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
   - Keep tests simple and focused

## Integration Testing vs Unit Testing

While unit tests focus on isolated components, integration tests (covered in INTEGRATION_TESTING.md) test how components work together. Key differences:

1. **Scope**
   - Unit tests: Single component in isolation
   - Integration tests: Multiple components working together

2. **Dependencies**
   - Unit tests: All dependencies mocked
   - Integration tests: Real dependencies used where appropriate

3. **Purpose**
   - Unit tests: Verify component behavior in isolation
   - Integration tests: Verify component interactions and data flow

4. **Complexity**
   - Unit tests: Simple, focused tests
   - Integration tests: More complex, end-to-end scenarios 