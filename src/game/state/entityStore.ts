import { createStore, createEvent } from 'effector';

// Event to set the full entity array (used after each engine tick)
export const setEntities = createEvent<any[]>();
export const undo = createEvent();
export const redo = createEvent();

// Main entity store: holds the current array of entities
export const $entities = createStore<any[]>([]).on(setEntities, (_, entities) => entities);

// History store for undo/redo
export const $history = createStore<{ past: any[][]; present: any[]; future: any[][] }>({ past: [], present: [], future: [] })
	.on(setEntities, (state, entities) => ({
		past: state.present.length ? [...state.past, state.present] : state.past,
		present: entities,
		future: []
	}))
	.on(undo, (state) => {
		if (state.past.length === 0) return state;
		const previous = state.past[state.past.length - 1];
		const newPast = state.past.slice(0, -1);
		return {
			past: newPast,
			present: previous,
			future: [state.present, ...state.future]
		};
	})
	.on(redo, (state) => {
		if (state.future.length === 0) return state;
		const next = state.future[0];
		const newFuture = state.future.slice(1);
		return {
			past: [...state.past, state.present],
			present: next,
			future: newFuture
		};
	});
