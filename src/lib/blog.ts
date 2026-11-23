import { messages, type Locale } from './i18n/messages';

export type BlogPost = {
	slug: string;
	date: string;
	title: string;
	excerpt: string;
	body: string[];
};

export function getBlogPosts(locale: Locale): BlogPost[] {
	return messages[locale].blogPosts;
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
