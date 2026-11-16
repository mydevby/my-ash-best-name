export const themes = ['light', 'dark', 'winter'] as const;

export type Theme = (typeof themes)[number];
