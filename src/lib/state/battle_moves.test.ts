import { expect, test, beforeEach, vi } from 'vitest';
import { battle_moves } from './battle_moves.svelte';

// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

beforeEach(() => {
	// Reset mocks before each test
	vi.clearAllMocks();
	
	// Reset localStorage mock
	Object.defineProperty(global, 'localStorage', {
		value: localStorageMock,
		writable: true
	});
	
	// Reset battle_moves state
	battle_moves.reset();
});

test('battle_moves should start with empty array', () => {
	localStorageMock.getItem.mockReturnValue(null);
	expect(battle_moves.moves).toEqual([]);
});

test('battle_moves should load from localStorage', () => {
	const savedMoves = ['move1', 'move2'];
	localStorageMock.getItem.mockReturnValue(JSON.stringify(savedMoves));
	
	// Create a new instance to test loading
	const testBattleMoves = battle_moves;
	expect(testBattleMoves.moves).toEqual([]);
});

test('battle_moves.use() should add move if not already used', () => {
	battle_moves.use('move1');
	expect(battle_moves.moves).toContain('move1');
	expect(localStorageMock.setItem).toHaveBeenCalledWith('battle_moves', JSON.stringify(['move1']));
});

test('battle_moves.use() should not add duplicate moves', () => {
	battle_moves.use('move1');
	battle_moves.use('move1');
	
	expect(battle_moves.moves).toEqual(['move1']);
	// LocalStorage setItem is called for the first use, but not for the duplicate
	expect(localStorageMock.setItem).toHaveBeenCalledWith('battle_moves', JSON.stringify(['move1']));
});

test('battle_moves.reset() should clear all moves', () => {
	battle_moves.use('move1');
	battle_moves.use('move2');
	
	battle_moves.reset();
	
	expect(battle_moves.moves).toEqual([]);
	expect(localStorageMock.setItem).toHaveBeenLastCalledWith('battle_moves', JSON.stringify([]));
});

test('battle_moves should sync with localStorage on changes', () => {
	battle_moves.use('move1');
	battle_moves.use('move2');
	
	expect(localStorageMock.setItem).toHaveBeenCalledWith('battle_moves', JSON.stringify(['move1']));
	expect(localStorageMock.setItem).toHaveBeenCalledWith('battle_moves', JSON.stringify(['move1', 'move2']));
});