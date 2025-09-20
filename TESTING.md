# Testing Guide

This project uses **Playwright** for comprehensive end-to-end testing that covers functionality, user interactions, and visual validation.

## Running Tests

```bash
# Run all tests
pnpm run test

# Run tests with interactive UI for debugging
pnpm run test:ui

# Install browsers (if needed)
npx playwright install
```

## Writing Tests

Tests should be placed in the `tests/` directory with a `.spec.ts` extension.

### Example: Testing user flows

```typescript
// tests/navigation.spec.ts
import { test, expect } from '@playwright/test'

test('user can navigate to moves page', async ({ page }) => {
	await page.goto('/')

	// Click on moves navigation
	await page.click('[data-testid="moves-nav"]')

	// Should be on moves page
	await expect(page).toHaveURL('/moves')
	await expect(page.locator('h1')).toContainText('Moves')
})

test('user can add a new move', async ({ page }) => {
	await page.goto('/moves')

	// Click add move button
	await page.click('[data-testid="add-move"]')

	// Fill out form
	await page.fill('[data-testid="move-name"]', 'Test Move')
	await page.selectOption('[data-testid="move-type"]', 'toprock')
	await page.click('[data-testid="submit-move"]')

	// Should see new move in list
	await expect(page.locator('[data-testid="move-list"]')).toContainText('Test Move')
})
```

### Testing Mobile Responsiveness

```typescript
test('mobile navigation works correctly', async ({ page }) => {
	// Set mobile viewport
	await page.setViewportSize({ width: 375, height: 667 })
	await page.goto('/')

	// Test mobile-specific interactions
	await page.click('[data-testid="mobile-menu-toggle"]')
	await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible()
})
```

### Testing Form Interactions

```typescript
test('move form validation works', async ({ page }) => {
	await page.goto('/moves')
	await page.click('[data-testid="add-move"]')

	// Try to submit without required fields
	await page.click('[data-testid="submit-move"]')

	// Should show validation errors
	await expect(page.locator('[data-testid="error-message"]')).toBeVisible()

	// Fill required fields and submit
	await page.fill('[data-testid="move-name"]', 'Test Move')
	await page.selectOption('[data-testid="move-type"]', 'toprock')
	await page.click('[data-testid="submit-move"]')

	// Should succeed
	await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
})
```

## Playwright Configuration

The Playwright configuration supports:

- **Multiple browsers**: Chromium, Firefox, WebKit
- **Mobile testing**: iPhone and Android viewports
- **Automatic server startup**: Builds and serves the app before testing
- **Screenshots and traces**: Captured on test failure
- **Parallel execution**: Tests run in parallel for faster feedback

## Best Practices

### Test Structure

- Use descriptive test names that explain the user scenario
- Group related tests using `test.describe()`
- Test critical user journeys end-to-end
- Test across different browsers and viewports
- Use data-testid attributes for reliable element selection

### Writing Reliable Tests

```typescript
// Good: Use data-testid for reliable selection
await page.click('[data-testid="submit-button"]')

// Avoid: CSS selectors that might change
await page.click('.btn-primary')

// Good: Wait for specific conditions
await expect(page.locator('[data-testid="loading"]')).toBeHidden()
await page.click('[data-testid="next-step"]')

// Good: Test user-visible behavior
await expect(page.locator('text=Move added successfully')).toBeVisible()
```

### Page Object Pattern

For complex flows, consider using the Page Object pattern:

```typescript
// tests/pages/MovesPage.ts
export class MovesPage {
	constructor(private page: Page) {}

	async addMove(name: string, type: string) {
		await this.page.click('[data-testid="add-move"]')
		await this.page.fill('[data-testid="move-name"]', name)
		await this.page.selectOption('[data-testid="move-type"]', type)
		await this.page.click('[data-testid="submit-move"]')
	}

	async expectMoveInList(moveName: string) {
		await expect(this.page.locator(`[data-testid="move-${moveName}"]`)).toBeVisible()
	}
}

// tests/moves.spec.ts
import { MovesPage } from './pages/MovesPage'

test('user can add and see new move', async ({ page }) => {
	const movesPage = new MovesPage(page)
	await page.goto('/moves')

	await movesPage.addMove('Windmill', 'power')
	await movesPage.expectMoveInList('Windmill')
})
```

## Continuous Integration

The project includes a GitHub Actions workflow that:

- Runs on every pull request and push to main
- Installs dependencies and builds the project
- Runs linting and type checking
- Executes all Playwright tests
- Uploads test reports as artifacts

## Debugging Tests

### Interactive Mode

```bash
# Run tests with UI for step-by-step debugging
pnpm run test:ui

# Run a specific test file
npx playwright test tests/specific-test.spec.ts

# Run tests in headed mode (shows browser)
npx playwright test --headed
```

### Debug Mode

```bash
# Run in debug mode with browser developer tools
npx playwright test --debug

# Pause test execution at specific points
await page.pause(); // Add this line in your test
```

### Screenshots and Videos

Configure in `playwright.config.ts`:

```typescript
use: {
  // Capture screenshot on failure
  screenshot: 'only-on-failure',

  // Record video on failure
  video: 'retain-on-failure',
}
```

## Common Test Scenarios

### Authentication Flow

```typescript
test('user login flow', async ({ page }) => {
	await page.goto('/login')
	await page.fill('[data-testid="email"]', 'test@example.com')
	await page.fill('[data-testid="password"]', 'password')
	await page.click('[data-testid="login-button"]')

	await expect(page).toHaveURL('/dashboard')
	await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
})
```

### Data Persistence

```typescript
test('data persists after page reload', async ({ page }) => {
	await page.goto('/moves')
	await page.click('[data-testid="add-move"]')
	await page.fill('[data-testid="move-name"]', 'Test Move')
	await page.click('[data-testid="submit-move"]')

	// Reload page
	await page.reload()

	// Data should still be there
	await expect(page.locator('text=Test Move')).toBeVisible()
})
```

## Performance Testing

```typescript
test('page loads within acceptable time', async ({ page }) => {
	const startTime = Date.now()
	await page.goto('/')
	await page.waitForLoadState('networkidle')
	const loadTime = Date.now() - startTime

	expect(loadTime).toBeLessThan(3000) // Page should load within 3 seconds
})
```

This comprehensive testing approach ensures that the application works correctly from the user's perspective while maintaining good performance and reliability.
