import { expect, test, describe, beforeEach, vi } from 'vitest';

// Example of testing a more complex utility function
describe('Move utilities', () => {
	// Mock data for testing
	const mockMoves = [
		{ id: '1', name: 'Windmill', type: 'power', value: 8 },
		{ id: '2', name: 'Toprock', type: 'toprock', value: 3 },
		{ id: '3', name: 'Freeze', type: 'freeze', value: 5 }
	];

	test('filterMovesByType returns correct moves', () => {
		function filterMovesByType(moves: any[], type: string) {
			return moves.filter(move => move.type === type);
		}

		const powerMoves = filterMovesByType(mockMoves, 'power');
		expect(powerMoves).toHaveLength(1);
		expect(powerMoves[0].name).toBe('Windmill');
	});

	test('calculateTotalValue sums move values correctly', () => {
		function calculateTotalValue(moves: any[]) {
			return moves.reduce((total, move) => total + move.value, 0);
		}

		const total = calculateTotalValue(mockMoves);
		expect(total).toBe(16); // 8 + 3 + 5
	});

	test('sortMovesByValue sorts moves correctly', () => {
		function sortMovesByValue(moves: any[], ascending = true) {
			return [...moves].sort((a, b) => 
				ascending ? a.value - b.value : b.value - a.value
			);
		}

		const sorted = sortMovesByValue(mockMoves, false); // descending
		expect(sorted[0].name).toBe('Windmill'); // highest value
		expect(sorted[2].name).toBe('Toprock'); // lowest value
	});
});

// Example of testing with async operations
describe('Async operations', () => {
	test('delays execution correctly', async () => {
		function delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		const start = Date.now();
		await delay(100);
		const end = Date.now();
		
		expect(end - start).toBeGreaterThanOrEqual(95); // Allow some tolerance
	});

	test('handles async errors correctly', async () => {
		async function failingOperation() {
			throw new Error('Something went wrong');
		}

		await expect(failingOperation()).rejects.toThrow('Something went wrong');
	});
});

// Example of testing with mocks
describe('Mocked dependencies', () => {
	const mockApiCall = vi.fn();

	beforeEach(() => {
		mockApiCall.mockClear();
	});

	test('calls API with correct parameters', async () => {
		mockApiCall.mockResolvedValue({ success: true });

		async function saveMove(move: any) {
			return await mockApiCall('/api/moves', { 
				method: 'POST', 
				body: JSON.stringify(move) 
			});
		}

		const move = { name: 'Test Move', type: 'toprock' };
		await saveMove(move);

		expect(mockApiCall).toHaveBeenCalledWith('/api/moves', {
			method: 'POST',
			body: JSON.stringify(move)
		});
	});
});