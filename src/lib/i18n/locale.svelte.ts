import { LOCALE_STORAGE_KEY } from '../prefs';
import { localeMeta, locales, messages, type Locale, type Messages } from './messages';

function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

function canUseDom() {
	return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function detectBrowserLocale(): Locale {
	if (!canUseDom()) return 'be';

	const candidates = [...(navigator.languages ?? []), navigator.language];

	for (const raw of candidates) {
		if (!raw) continue;
		const code = raw.toLowerCase();
		if (code.startsWith('be')) return 'be';
		if (code.startsWith('ru')) return 'ru';
		if (code.startsWith('en')) return 'en';
	}

	return 'be';
}

let locale = $state<Locale>('be');
let hydrated = $state(false);

function applyDocumentLang(next: Locale) {
	if (!canUseDom()) return;
	document.documentElement.lang = localeMeta[next].htmlLang;
}

export function hydrateLocale() {
	if (!canUseDom() || hydrated) return;

	const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
	locale = stored && isLocale(stored) ? stored : detectBrowserLocale();
	applyDocumentLang(locale);
	hydrated = true;
}

export function getLocale(): Locale {
	return locale;
}

export function setLocale(next: Locale) {
	locale = next;
	if (canUseDom()) {
		localStorage.setItem(LOCALE_STORAGE_KEY, next);
		applyDocumentLang(next);
	}
}

export function t(): Messages {
	return messages[locale];
}
