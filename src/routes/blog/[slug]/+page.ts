import { error } from '@sveltejs/kit';
import { getAllBlogSlugs, getBlogPost } from '../../../lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => getAllBlogSlugs().map((slug) => ({ slug }));

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const post = getBlogPost(params.slug, 'be');
	if (!post) error(404, 'Not found');
	return { slug: params.slug };
};
