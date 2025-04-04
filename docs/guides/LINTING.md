# Linting Guide

This document outlines the linting and code formatting standards for the Kitchen 360° Organizer project.

## Tools

### Core Tools
- ESLint: Code quality and style
- Prettier: Code formatting
- TypeScript ESLint: TypeScript support
- ESLint Import Plugin: Import/export rules
- ESLint React Plugin: React specific rules

## Configuration

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  rules: {
    // TypeScript
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    
    // React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Import
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],
    
    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
```

### Prettier Configuration
```javascript
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## Editor Integration

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "prettier.requireConfig": true
}
```

### Git Hooks
```javascript
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

```javascript
// lint-staged.config.js
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  '*.{json,md}': [
    'prettier --write'
  ]
};
```

## Rules and Best Practices

### TypeScript Rules
```typescript
// Good
interface Props {
  name: string;
  age: number;
}

const Component: React.FC<Props> = ({ name, age }) => {
  return <div>{name} is {age} years old</div>;
};

// Bad
const Component = (props) => {
  return <div>{props.name} is {props.age} years old</div>;
};
```

### React Rules
```typescript
// Good
const Component = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return <button onClick={handleClick}>Count: {count}</button>;
};

// Bad
const Component = () => {
  const [count, setCount] = useState(0);
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};
```

### Import Rules
```typescript
// Good
import React from 'react';
import { useState, useCallback } from 'react';
import { Viewer } from '@/components/Viewer';
import { useViewerState } from '@/hooks/useViewerState';
import type { Props } from './types';

// Bad
import React, { useState, useCallback } from 'react';
import { Viewer } from '../../components/Viewer';
import { useViewerState } from '../../../hooks/useViewerState';
```

## Common Issues and Solutions

### TypeScript Errors
```typescript
// Error: Type 'string | undefined' is not assignable to type 'string'
const name: string = user?.name; // Error

// Solution
const name: string = user?.name ?? 'Unknown';
```

### React Hooks
```typescript
// Error: React Hook "useEffect" has a missing dependency
useEffect(() => {
  console.log(count);
}, []); // Error

// Solution
useEffect(() => {
  console.log(count);
}, [count]);
```

### Import Order
```typescript
// Error: Import in body of module
const Component = () => {
  import { useState } from 'react'; // Error
  
  return null;
};

// Solution
import { useState } from 'react';

const Component = () => {
  return null;
};
```

## Performance Considerations

### ESLint Performance
```javascript
// .eslintrc.js
module.exports = {
  // ...other config
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
};
```

### Prettier Performance
```javascript
// .prettierrc
{
  // ...other config
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve"
}
```

## Continuous Integration

### GitHub Actions
```yaml
# .github/workflows/lint.yml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run lint
      - run: npm run format:check
```

## Custom Rules

### Project Specific Rules
```javascript
// .eslintrc.js
module.exports = {
  // ...other config
  rules: {
    'custom/no-console-in-production': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'custom/max-dependencies': ['error', { max: 10 }],
    'custom/no-inline-styles': 'error'
  }
};
```

### Rule Documentation
```javascript
// eslint-plugin-custom/rules/no-inline-styles.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow inline styles in JSX',
      category: 'Best Practices',
      recommended: true
    }
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === 'style' && node.value.type === 'JSXExpressionContainer') {
          context.report({
            node,
            message: 'Avoid inline styles. Use CSS modules or styled-components instead.'
          });
        }
      }
    };
  }
};
``` 