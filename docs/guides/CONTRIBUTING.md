# Contributing to Kitchen 360° Organizer

Thank you for your interest in contributing to the Kitchen 360° Organizer project! This document provides guidelines and standards for contributing to the project.

## Table of Contents
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Linting and Formatting](#linting-and-formatting)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)

## Code Standards

Our code standards are designed to maintain consistency and quality across the project. For detailed guidelines, see [Code Standards](CODE_STANDARDS.md).

### Key Principles
- Use TypeScript for type safety
- Follow functional programming principles
- Write self-documenting code
- Keep components small and focused
- Use meaningful variable and function names

### Component Structure
```typescript
// Example component structure
interface Props {
  // Props interface
}

const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
};
```

## Testing Guidelines

Comprehensive testing is crucial for maintaining code quality. See [Testing Guide](TESTING.md) for detailed information.

### Test Categories
1. Unit Tests
2. Integration Tests
3. End-to-End Tests
4. Performance Tests

### Test Coverage Requirements
- Minimum 80% code coverage
- 100% coverage for critical paths
- All new features must include tests

## Linting and Formatting

Consistent code formatting is maintained through ESLint and Prettier. See [Linting Guide](LINTING.md) for configuration details.

### Key Rules
- Use ESLint for code quality
- Use Prettier for formatting
- Run linting before commits
- Fix all warnings and errors

## Development Workflow

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/kitchen-360.git
   cd kitchen-360
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Run Tests**
   ```bash
   npm test
   ```

6. **Lint Code**
   ```bash
   npm run lint
   ```

## Pull Request Process

1. **Create Pull Request**
   - Use the PR template
   - Link related issues
   - Provide clear description

2. **Code Review**
   - Address review comments
   - Update documentation
   - Ensure tests pass

3. **Merge Requirements**
   - All tests passing
   - Code reviewed and approved
   - Documentation updated
   - No merge conflicts

## Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test changes
- chore: Maintenance tasks

## Getting Help

- Open an issue for bugs
- Use discussions for questions
- Join our community chat

## License

By contributing, you agree that your contributions will be licensed under the project's license.
