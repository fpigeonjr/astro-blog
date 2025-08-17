# Testing Guide

This directory contains tests for the blog application, following Testing Library best practices.

## Testing Stack

### Core Framework
- **[Vitest](https://vitest.dev/)** - Fast unit test framework (Vite-native alternative to Jest)
- **[Happy DOM](https://github.com/capricorn86/happy-dom)** - Lightweight DOM environment for testing

### Testing Utilities
- **[@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro)** - Utilities for querying DOM elements
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro)** - Utilities for simulating user interactions

## Testing Philosophy

We follow **[Testing Library's guiding principles](https://testing-library.com/docs/guiding-principles)**:

> "The more your tests resemble the way your software is used, the more confidence they can give you."

### Key Principles:
1. **Test behavior, not implementation** - Focus on what users see and do
2. **Query by accessibility attributes** - Use `getByRole`, `getByLabelText`, etc.
3. **Simulate real user interactions** - Use `user-event` instead of `fireEvent`
4. **Avoid testing implementation details** - Don't test internal state or private methods

## Best Practices

### ✅ Preferred Approaches

#### 1. Use `user-event` for User Interactions
```javascript
import { userEvent } from '@testing-library/user-event';

// ✅ Good - Simulates real user behavior
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'Hello world');
await user.keyboard('{Enter}');

// ❌ Avoid - fireEvent is deprecated
fireEvent.click(button);
```

#### 2. Query by Accessibility Attributes
```javascript
import { getByRole, getByLabelText } from '@testing-library/dom';

// ✅ Good - How users find elements
const button = getByRole(container, 'button', { name: /toggle dark mode/i });
const input = getByLabelText(container, /email address/i);

// ❌ Avoid - Implementation details
const button = container.querySelector('#theme-toggle');
const input = container.querySelector('.email-input');
```

#### 3. Use Semantic HTML and ARIA
```javascript
// ✅ Good - Accessible and testable
<button aria-label="Toggle dark mode" type="button">
  <svg aria-hidden="true">...</svg>
</button>

// ❌ Avoid - Not accessible, hard to test
<div onclick="toggleTheme()" class="theme-button">
  <svg>...</svg>
</div>
```

#### 4. Test Async Behavior Properly
```javascript
// ✅ Good - Properly await user interactions
await user.click(button);
expect(localStorage.getItem('theme')).toBe('dark');

// ✅ Good - Wait for async updates
await waitFor(() => {
  expect(screen.getByText(/theme updated/i)).toBeInTheDocument();
});
```

### ❌ What to Avoid

#### 1. Don't Use `fireEvent` (Deprecated)
```javascript
// ❌ Don't do this - fireEvent is deprecated
fireEvent.click(button);
fireEvent.change(input, { target: { value: 'test' } });

// ✅ Do this instead - user-event simulates real interactions
await user.click(button);
await user.type(input, 'test');
```

#### 2. Don't Query by Implementation Details
```javascript
// ❌ Don't do this - Tests implementation, not behavior
const button = container.querySelector('.theme-toggle-btn');
const form = container.querySelector('#contact-form');

// ✅ Do this instead - Tests how users interact
const button = getByRole(container, 'button', { name: /toggle theme/i });
const form = getByRole(container, 'form', { name: /contact form/i });
```

#### 3. Don't Test Internal State
```javascript
// ❌ Don't do this - Tests implementation details
expect(component.state.isLoading).toBe(true);
expect(component.props.theme).toBe('dark');

// ✅ Do this instead - Test visible behavior
expect(getByText(container, /loading/i)).toBeInTheDocument();
expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
```

## Running Tests

### Basic Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getByRole } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

describe('ComponentName', () => {
  let container;
  let user;
  
  beforeEach(() => {
    // Setup clean DOM
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
    
    // Setup user-event
    user = userEvent.setup();
  });

  it('should do something when user interacts', async () => {
    // Arrange - Setup component/DOM
    container.innerHTML = `<button>Click me</button>`;
    
    // Act - Simulate user interaction
    const button = getByRole(container, 'button', { name: /click me/i });
    await user.click(button);
    
    // Assert - Check expected outcome
    expect(/* some visible change */).toBeTruthy();
  });
});
```

## Accessibility Testing

Always ensure your tests verify accessibility:

```javascript
it('should be keyboard accessible', async () => {
  const button = getByRole(container, 'button', { name: /toggle theme/i });
  
  // Test keyboard navigation
  button.focus();
  await user.keyboard('{Enter}');
  expect(/* expected behavior */).toBeTruthy();
  
  await user.keyboard(' '); // Space key
  expect(/* expected behavior */).toBeTruthy();
});

it('should have proper ARIA attributes', () => {
  const button = getByRole(container, 'button', { name: /toggle dark mode/i });
  
  expect(button).toHaveAttribute('aria-label');
  expect(button).toHaveAttribute('type', 'button');
});
```

## Mocking

### Mock External Dependencies
```javascript
// Mock external modules
vi.mock('../src/utils/theme.js', async () => {
  const original = await vi.importActual('./theme-mock.js');
  return original;
});

// Mock browser APIs
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  });
});
```

## File Organization

```
tests/
├── README.md                 # This file
├── theme-toggle.test.js      # Theme toggle functionality tests
├── theme-mock.js            # Mock utilities for theme functionality
└── utils/                   # Shared test utilities
    ├── test-utils.js        # Common test setup/helpers
    └── mocks/               # Mock implementations
```

## Additional Resources

- [Testing Library Documentation](https://testing-library.com/)
- [Vitest Documentation](https://vitest.dev/)
- [User Event Documentation](https://testing-library.com/docs/user-event/intro)
- [Common Testing Library Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Implementation vs Behavior](https://kentcdodds.com/blog/testing-implementation-details)

## Contributing

When adding new tests:

1. Follow the established patterns in existing test files
2. Use `user-event` for all user interactions
3. Query by accessibility attributes (`getByRole`, `getByLabelText`, etc.)
4. Test behavior, not implementation details
5. Ensure accessibility compliance
6. Add proper documentation for complex test scenarios