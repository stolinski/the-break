# Testing Guide

This project uses **Vitest** for unit/integration testing and **Playwright** for end-to-end testing.

## Unit Testing with Vitest

### Running Tests

```bash
# Run tests once
pnpm run test

# Run tests in watch mode (re-runs on file changes)
pnpm run test:watch

# Run tests with a web UI
pnpm run test:ui

# Run tests with coverage report
pnpm run test:coverage
```

### Writing Unit Tests

Unit tests should be placed next to the file they test with a `.test.ts` or `.spec.ts` extension.

#### Example: Testing a utility function

```typescript
// src/utils/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// src/utils/math.test.ts
import { expect, test } from 'vitest';
import { add } from './math';

test('adds numbers correctly', () => {
  expect(add(2, 3)).toBe(5);
});
```

#### Example: Testing Svelte state management

```typescript
// src/lib/state/counter.svelte.ts
function createCounter() {
  let count = $state(0);
  
  return {
    increment: () => count++,
    decrement: () => count--,
    get count() { return count; }
  };
}

export const counter = createCounter();

// src/lib/state/counter.test.ts
import { expect, test, beforeEach } from 'vitest';
import { counter } from './counter.svelte';

beforeEach(() => {
  // Reset state before each test
  counter.reset?.();
});

test('increments count', () => {
  const initialCount = counter.count;
  counter.increment();
  expect(counter.count).toBe(initialCount + 1);
});
```

### Available Test Utilities

The test environment includes:
- **jsdom** for DOM simulation
- **@testing-library/jest-dom** for additional matchers
- Mocked localStorage and PocketBase (see `src/lib/test-setup.ts`)

## Component Testing

Component testing for Svelte 5 is currently limited due to ecosystem compatibility. For now, focus on:
1. Testing component logic separately
2. Testing state management
3. Testing utility functions

When the ecosystem matures, component tests can be added using `@testing-library/svelte`.

## End-to-End Testing with Playwright

### Running E2E Tests

```bash
# Run e2e tests
pnpm run test:e2e

# Run e2e tests with interactive UI
pnpm run test:e2e:ui

# Install browsers (if needed)
npx playwright install
```

### Writing E2E Tests

E2E tests should be placed in the `tests/` directory with a `.spec.ts` extension.

#### Example: Testing user flows

```typescript
// tests/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate to moves page', async ({ page }) => {
  await page.goto('/');
  
  // Click on moves navigation
  await page.click('[data-testid="moves-nav"]');
  
  // Should be on moves page
  await expect(page).toHaveURL('/moves');
  await expect(page.locator('h1')).toContainText('Moves');
});

test('user can add a new move', async ({ page }) => {
  await page.goto('/moves');
  
  // Click add move button
  await page.click('[data-testid="add-move"]');
  
  // Fill out form
  await page.fill('[data-testid="move-name"]', 'Test Move');
  await page.selectOption('[data-testid="move-type"]', 'toprock');
  await page.click('[data-testid="submit-move"]');
  
  // Should see new move in list
  await expect(page.locator('[data-testid="move-list"]')).toContainText('Test Move');
});
```

### Playwright Configuration

The Playwright configuration supports:
- **Multiple browsers**: Chromium, Firefox, WebKit
- **Mobile testing**: iPhone and Android viewports
- **Automatic server startup**: Builds and serves the app before testing
- **Screenshots and traces**: Captured on test failure

## Best Practices

### Unit Tests
- Test business logic, not implementation details
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies (database, APIs)
- Keep tests fast and isolated

### E2E Tests
- Test critical user journeys
- Use data-testid attributes for reliable selectors
- Test across different browsers and viewports
- Keep e2e tests focused on happy paths
- Use page object models for complex flows

### General
- Run tests frequently during development
- Maintain good test coverage (aim for >80%)
- Update tests when changing functionality
- Use meaningful assertions
- Document complex test scenarios

## Continuous Integration

Tests should be run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run unit tests
  run: pnpm run test

- name: Run e2e tests
  run: |
    npx playwright install --with-deps
    pnpm run test:e2e
```

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout or check for infinite loops
2. **Component tests failing**: Ensure proper mocking of external dependencies
3. **E2E tests flaky**: Add proper waits and use data-testid attributes
4. **Coverage too low**: Add tests for untested code paths

### Debug Tips

- Use `test.only()` to run a single test
- Use `console.log()` in tests for debugging
- Use Playwright's debug mode: `npx playwright test --debug`
- Check test setup files for proper mocking