import { THEME_STORAGE_KEY } from '../prefs';
import { themes, type Theme } from './themes';

function isTheme(value: string): value is Theme {
	return (themes as readonly string[]).includes(value);
}

function canUseDom() {
	return typeof window !== 'undefined' && typeof document !== 'undefined';
}

let theme = $state<Theme>('light');
let hydrated = $state(false);

function applyDocumentTheme(next: Theme) {
	if (!canUseDom()) return;
	document.documentElement.dataset.theme = next;
}

export function hydrateTheme() {
	if (!canUseDom() || hydrated) return;

	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	if (stored && isTheme(stored)) {
		theme = stored;
	}
	applyDocumentTheme(theme);
	hydrated = true;
}

export function getTheme(): Theme {
	return theme;
}

export function setTheme(next: Theme) {
	theme = next;
	if (canUseDom()) {
		localStorage.setItem(THEME_STORAGE_KEY, next);
		applyDocumentTheme(next);
	}
}
