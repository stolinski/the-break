import { expect, test } from 'vitest';
import { settings } from './settings';

test('settings should have correct app_name', () => {
	expect(settings.app_name).toBe('The Break');
});

test('settings should have correct app_route', () => {
	expect(settings.app_route).toBe('/moves');
});

test('settings should be an object with expected properties', () => {
	expect(settings).toBeTypeOf('object');
	expect(settings).toHaveProperty('app_name');
	expect(settings).toHaveProperty('app_route');
});