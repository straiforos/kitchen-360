# Code Standards

This document outlines the coding standards and best practices for the Kitchen 360° Organizer project.

## TypeScript Standards

### Type Definitions
```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Use type aliases for unions and intersections
type Status = 'active' | 'inactive' | 'pending';
type UserWithStatus = User & { status: Status };

// Use enums for related constants
enum ViewType {
  PANORAMA = 'panorama',
  THUMBNAIL = 'thumbnail',
  GALLERY = 'gallery'
}
```

### Type Safety
- Always define return types for functions
- Use strict null checks
- Avoid `any` type
- Use type guards for runtime type checking

### Generics
```typescript
// Use generics for reusable components
interface Props<T> {
  data: T;
  renderItem: (item: T) => React.ReactNode;
}

const List = <T extends unknown>({ data, renderItem }: Props<T>) => {
  // Implementation
};
```

## React Standards

### Component Structure
```typescript
// Functional components with hooks
const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // 1. Hooks
  const [state, setState] = useState<StateType>(initialState);
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // 3. Handlers
  const handleEvent = useCallback((event: EventType) => {
    // Handler logic
  }, [dependencies]);
  
  // 4. Render
  return (
    // JSX
  );
};
```

### Hooks
- Use custom hooks for reusable logic
- Follow hooks naming convention (use*)
- Keep hooks pure and focused
- Document hook dependencies

### Props
- Use TypeScript interfaces for props
- Destructure props at component level
- Use default props when appropriate
- Document required props

## State Management

### Local State
```typescript
// Use useState for simple state
const [count, setCount] = useState<number>(0);

// Use useReducer for complex state
const [state, dispatch] = useReducer(reducer, initialState);
```

### Global State
- Use React Context for global state
- Keep context providers focused
- Use custom hooks for context access
- Document context usage

## Error Handling

### Try-Catch Blocks
```typescript
try {
  // Operation
} catch (error) {
  if (error instanceof CustomError) {
    // Handle specific error
  } else {
    // Handle unknown error
  }
}
```

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error
  }
  
  render() {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}
```

## Performance

### Memoization
```typescript
// Use useMemo for expensive calculations
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Use useCallback for function references
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Code Splitting
```typescript
// Use dynamic imports for code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

## Documentation

### Comments
```typescript
/**
 * Component description
 * @param props - Component props
 * @returns Rendered component
 */
const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // Implementation
};
```

### JSDoc
```typescript
/**
 * Calculates the distance between two points
 * @param point1 - First point coordinates
 * @param point2 - Second point coordinates
 * @returns Distance between points
 */
function calculateDistance(point1: Point, point2: Point): number {
  // Implementation
}
```

## File Organization

### Directory Structure
```
src/
  components/
    common/
    features/
  hooks/
  utils/
  types/
  constants/
  services/
  styles/
```

### Naming Conventions
- PascalCase for components
- camelCase for functions and variables
- UPPER_SNAKE_CASE for constants
- kebab-case for file names

## Testing

### Test Files
- Place test files next to source files
- Use `.test.ts` or `.test.tsx` extension
- Follow AAA pattern (Arrange, Act, Assert)

### Test Structure
```typescript
describe('Component', () => {
  beforeEach(() => {
    // Setup
  });
  
  it('should render correctly', () => {
    // Arrange
    // Act
    // Assert
  });
  
  it('should handle events', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Accessibility

### ARIA Attributes
```typescript
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  onClick={handleClick}
>
  Close
</button>
```

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Maintain logical tab order
- Provide focus indicators
- Handle keyboard events

## Security

### Input Validation
```typescript
function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters
  return input.replace(/[<>]/g, '');
}
```

### Data Handling
- Sanitize user input
- Validate data before processing
- Use secure storage methods
- Implement proper error handling 