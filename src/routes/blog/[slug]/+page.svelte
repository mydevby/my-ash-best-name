<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatBlogTag, formatReadingTime, getBlogPost } from '../../../lib/blog';
	import { getLocale, t } from '../../../lib/i18n/locale.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const locale = $derived(getLocale());
	const post = $derived(getBlogPost(data.slug, locale));

	function formatDate(value: string) {
		const [year, month, day] = value.split('-').map(Number);
		if (!year || !month || !day) return value;
		return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{post?.title ?? t().blogTitle} — {t().brand}</title>
	<meta name="description" content={post?.excerpt ?? t().blogMetaDescription} />
</svelte:head>

{#if post}
	<main class="post">
		<div class="post__wash" aria-hidden="true"></div>

		<article class="post__article">
			<p class="post__eyebrow">
				<a class="post__back" href={resolve('blog')}>{t().blogBack}</a>
			</p>
			<p class="post__meta">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span aria-hidden="true">·</span>
				<span>{formatReadingTime(post.readingMinutes, locale)}</span>
			</p>
			<h1 class="post__title">{post.title}</h1>
			<p class="post__tags">
				{#each post.tags as tag (tag)}
					<span class="post__tag">{formatBlogTag(tag, locale)}</span>
				{/each}
			</p>
			{#each post.body as paragraph, index (index)}
				<p class="post__text">{paragraph}</p>
			{/each}
		</article>
	</main>
{/if}

<style>
	.post {
		position: relative;
		isolation: isolate;
		min-height: calc(100dvh - var(--bn-header-height, 3.75rem));
		color: var(--bn-ink);
	}

	.post__wash {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			radial-gradient(120% 80% at 85% 0%, var(--bn-wash-a), transparent 55%),
			radial-gradient(90% 70% at 0% 100%, var(--bn-wash-b), transparent 50%),
			linear-gradient(165deg, var(--bn-paper) 0%, var(--bn-paper-deep) 100%);
	}

	.post__wash::after {
		content: '';
		position: absolute;
		inset: 0;
		opacity: var(--bn-dot-opacity);
		background-image: radial-gradient(var(--bn-dot) 0.7px, transparent 0.7px);
		background-size: 3px 3px;
		mask-image: linear-gradient(180deg, black, transparent 85%);
	}

	.post__article {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		max-width: 40rem;
		padding: clamp(2rem, 6vh, 3.5rem) clamp(1.25rem, 4vw, 2.5rem)
			clamp(2.5rem, 7vh, 4rem);
	}

	.post__eyebrow {
		margin: 0 0 0.35rem;
	}

	.post__back {
		font-family: var(--font-display);
		font-size: 0.78rem;
		font-weight: 650;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--bn-leaf-deep);
	}

	.post__back:hover {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.post__back:focus-visible {
		outline: 2px solid var(--bn-gold);
		outline-offset: 3px;
	}

	.post__meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.3;
		color: var(--bn-ink-soft);
	}

	.post__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.7rem, 5vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 1.1;
	}

	.post__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem 0.85rem;
		margin: 0 0 0.35rem;
		font-family: var(--font-display);
		font-size: 0.88rem;
		font-weight: 650;
		letter-spacing: -0.02em;
		color: var(--bn-leaf-deep);
	}

	.post__tag {
		display: inline-block;
	}

	.post__text {
		margin: 0;
		max-width: 38ch;
		font-size: clamp(1rem, 2.3vw, 1.12rem);
		line-height: 1.55;
		color: var(--bn-ink-soft);
	}
</style>
