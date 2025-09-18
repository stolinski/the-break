import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage for tests
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

// Mock PocketBase for tests
vi.mock('../pocketbase', () => ({
	pb: {
		authStore: {
			model: { id: 'test-user-id' }
		},
		collection: vi.fn(() => ({
			subscribe: vi.fn(),
			authRefresh: vi.fn(),
			getFullList: vi.fn(() => Promise.resolve([])),
			save: vi.fn(() => Promise.resolve({}))
		}))
	}
}));