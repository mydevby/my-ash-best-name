import {
	blogTagIds,
	messages,
	type BlogTagId,
	type Locale
} from './i18n/messages';

export type { BlogTagId };

export type BlogPost = {
	slug: string;
	date: string;
	title: string;
	excerpt: string;
	body: string[];
	tags: BlogTagId[];
	readingMinutes: number;
};

const WORDS_PER_MINUTE = 180;

export function estimateReadingMinutes(body: string[]): number {
	const words = body.join(' ').trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function pluralForm(n: number, one: string, few: string, many: string): string {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return one;
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
	return many;
}

export function formatReadingTime(minutes: number, locale: Locale): string {
	if (locale === 'be') {
		return `${minutes} ${pluralForm(minutes, 'хвіліна', 'хвіліны', 'хвілін')}`;
	}
	return `${minutes} ${pluralForm(minutes, 'минута', 'минуты', 'минут')}`;
}

export function getBlogPosts(locale: Locale): BlogPost[] {
	return messages[locale].blogPosts.map((post) => ({
		...post,
		readingMinutes: estimateReadingMinutes(post.body)
	}));
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
	return getBlogPosts(locale).find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
	const slugs = new Set<string>();
	for (const locale of Object.keys(messages) as Locale[]) {
		for (const post of messages[locale].blogPosts) {
			slugs.add(post.slug);
		}
	}
	return [...slugs];
}

export function getBlogTags(locale: Locale): BlogTagId[] {
	const used = new Set<BlogTagId>();
	for (const post of messages[locale].blogPosts) {
		for (const tag of post.tags) used.add(tag);
	}
	return blogTagIds.filter((tag) => used.has(tag));
}

export function formatBlogTag(tag: BlogTagId, locale: Locale): string {
	return `#${messages[locale].blogTagLabels[tag]}`;
}
