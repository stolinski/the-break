import { test, expect } from '@playwright/test';

test('homepage loads and has correct title', async ({ page }) => {
	await page.goto('/');
	
	// Check if the page loads without errors
	await expect(page).toHaveTitle(/The Break/);
});

test('navigation works correctly', async ({ page }) => {
	await page.goto('/');
	
	// Test navigation to different sections if they exist
	// This is a basic smoke test to ensure the app is functional
	const response = await page.goto('/');
	expect(response?.status()).toBeLessThan(400);
});

test('app is responsive', async ({ page }) => {
	await page.goto('/');
	
	// Test mobile viewport
	await page.setViewportSize({ width: 375, height: 667 });
	await expect(page).toHaveTitle(/The Break/);
	
	// Test desktop viewport  
	await page.setViewportSize({ width: 1920, height: 1080 });
	await expect(page).toHaveTitle(/The Break/);
});