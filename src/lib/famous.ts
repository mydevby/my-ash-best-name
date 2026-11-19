export const famousIds = [
	'saint-nicholas',
	'husouski',
	'gogol',
	'lobachevsky',
	'rimsky-korsakov'
] as const;

export type FamousId = (typeof famousIds)[number];

/**
 * Drop images into `static/famous/` and set paths here, e.g. '/famous/gogol.jpg'.
 * Leave `null` to show the localized placeholder.
 */
export const famousPhotos: Record<FamousId, string | null> = {
	'saint-nicholas': null,
	husouski: null,
	gogol: null,
	lobachevsky: null,
	'rimsky-korsakov': null
};
