# Integration Testing Guide

This guide outlines the integration testing strategy for the Kitchen 360° Organizer project, focusing on component interactions and data flow.

## Testing Tools

- **Jest**: JavaScript testing framework
- **React Testing Library**: For testing React components
- **MSW (Mock Service Worker)**: For API mocking
- **TypeScript**: For type checking

## Testing Commands

- `npm run test:integration`: Run all integration tests
- `npm run test:integration:watch`: Run integration tests in watch mode

## Integration Testing Best Practices

### Component Integration

1. **Component Interaction**
   - Test communication between parent and child components
   - Verify data flow through component hierarchy
   - Test shared state management
   - Test component composition

2. **Context Integration**
   - Test components using shared context
   - Verify context updates propagate correctly
   - Test context-dependent component behavior
   - Test context state synchronization

3. **Event Flow**
   - Test event propagation through component tree
   - Verify state updates across components
   - Test complex user interactions
   - Test side effects of user actions

### Data Flow

1. **State Management**
   - Test state updates across multiple components
   - Verify state persistence
   - Test state synchronization
   - Test state recovery scenarios

2. **API Integration**
   - Test API calls and responses
   - Verify data transformation
   - Test error handling
   - Test loading states
   - Test data caching

3. **Storage Integration**
   - Test IndexedDB operations
   - Verify data persistence
   - Test data synchronization
   - Test offline capabilities
   - Test data migration

## Test Categories

1. **Room Management Flow**
   - Room creation and deletion
   - Room data persistence
   - Room list updates
   - Room selection and navigation
   - Room data synchronization

2. **Viewer Integration**
   - Viewer state management
   - Hotspot creation and management
   - Position synchronization
   - Image loading and caching
   - Error handling and recovery

3. **Navigation Flow**
   - Room selection and switching
   - Drawer state management
   - Navigation state persistence
   - URL synchronization
   - History management

## Guidelines

1. **Test Coverage**
   - Focus on complete user flows
   - Test data consistency
   - Verify system state
   - Test edge cases
   - Test error recovery

2. **Test Organization**
   - Group tests by feature
   - Use descriptive test names
   - Document test scenarios
   - Maintain test dependencies
   - Keep tests focused on integration

3. **Performance**
   - Monitor test execution time
   - Optimize test setup
   - Use appropriate mocking
   - Balance test coverage with speed
   - Test performance-critical paths

4. **Maintainability**
   - Keep tests focused
   - Use consistent patterns
   - Document complex scenarios
   - Review test dependencies
   - Update tests with feature changes

## Integration Testing vs Unit Testing

While unit tests (covered in TESTING.md) focus on isolated components, integration tests verify how components work together. Key differences:

1. **Scope**
   - Integration tests: Multiple components working together
   - Unit tests: Single component in isolation

2. **Dependencies**
   - Integration tests: Real dependencies used where appropriate
   - Unit tests: All dependencies mocked

3. **Purpose**
   - Integration tests: Verify component interactions and data flow
   - Unit tests: Verify component behavior in isolation

4. **Complexity**
   - Integration tests: More complex, end-to-end scenarios
   - Unit tests: Simple, focused tests

5. **Setup**
   - Integration tests: More complex setup with real dependencies
   - Unit tests: Simple setup with mocked dependencies 