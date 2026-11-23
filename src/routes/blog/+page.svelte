<script lang="ts">
	import { resolve } from '$app/paths';
	import { getBlogPosts } from '../../lib/blog';
	import { getLocale, t } from '../../lib/i18n/locale.svelte';

	const posts = $derived(getBlogPosts(getLocale()));

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
	<title>{t().blogTitle} — {t().brand}</title>
	<meta name="description" content={t().blogMetaDescription} />
</svelte:head>

<main class="blog">
	<div class="blog__wash" aria-hidden="true"></div>

	<section class="blog__intro">
		<p class="blog__eyebrow">{t().brand}</p>
		<h1 class="blog__title">{t().blogTitle}</h1>
		<p class="blog__lede">{t().blogIntro}</p>
	</section>

	<section class="blog__list" aria-label={t().blogTitle}>
		{#if posts.length === 0}
			<p class="blog__empty">{t().blogEmpty}</p>
		{:else}
			<ul class="blog__items">
				{#each posts as post (post.slug)}
					<li class="blog__item">
						<a class="blog__link" href={resolve(`blog/${post.slug}`)}>
							<time class="blog__date" datetime={post.date}>{formatDate(post.date)}</time>
							<h2 class="blog__post-title">{post.title}</h2>
							<p class="blog__excerpt">{post.excerpt}</p>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</main>

<style>
	.blog {
		position: relative;
		isolation: isolate;
		min-height: calc(100dvh - var(--bn-header-height, 3.75rem));
		color: var(--bn-ink);
	}

	.blog__wash {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			radial-gradient(120% 80% at 85% 0%, var(--bn-wash-a), transparent 55%),
			radial-gradient(90% 70% at 0% 100%, var(--bn-wash-b), transparent 50%),
			linear-gradient(165deg, var(--bn-paper) 0%, var(--bn-paper-deep) 100%);
	}

	.blog__wash::after {
		content: '';
		position: absolute;
		inset: 0;
		opacity: var(--bn-dot-opacity);
		background-image: radial-gradient(var(--bn-dot) 0.7px, transparent 0.7px);
		background-size: 3px 3px;
		mask-image: linear-gradient(180deg, black, transparent 85%);
	}

	.blog__intro,
	.blog__list {
		position: relative;
		z-index: 1;
		max-width: 40rem;
		padding-inline: clamp(1.25rem, 4vw, 2.5rem);
	}

	.blog__intro {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-top: clamp(2rem, 6vh, 3.5rem);
		padding-bottom: clamp(1.5rem, 4vh, 2.25rem);
	}

	.blog__eyebrow {
		margin: 0;
		font-family: var(--font-display);
		font-size: 0.78rem;
		font-weight: 650;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--bn-leaf-deep);
	}

	.blog__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2rem, 6vw, 3.2rem);
		font-weight: 700;
		letter-spacing: -0.05em;
		line-height: 0.95;
	}

	.blog__lede {
		margin: 0;
		max-width: 34ch;
		font-size: clamp(1rem, 2.4vw, 1.15rem);
		line-height: 1.45;
		color: var(--bn-ink-soft);
	}

	.blog__list {
		padding-bottom: clamp(2.5rem, 7vh, 4rem);
	}

	.blog__empty {
		margin: 0;
		padding-top: 1rem;
		border-top: 1px solid var(--bn-line);
		font-size: 1.05rem;
		line-height: 1.45;
		color: var(--bn-ink-soft);
	}

	.blog__items {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.blog__item {
		border-top: 1px solid var(--bn-line);
	}

	.blog__link {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding-block: 1.25rem;
		color: inherit;
		text-decoration: none;
		transition: padding-left 0.18s ease;
	}

	.blog__link:hover {
		padding-left: 0.35rem;
	}

	.blog__link:hover .blog__post-title {
		color: var(--bn-leaf-deep);
	}

	.blog__link:focus-visible {
		outline: 2px solid var(--bn-gold);
		outline-offset: 3px;
	}

	.blog__date {
		font-size: 0.88rem;
		line-height: 1.3;
		color: var(--bn-ink-soft);
	}

	.blog__post-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.2rem, 3vw, 1.45rem);
		font-weight: 650;
		letter-spacing: -0.03em;
		line-height: 1.2;
		transition: color 0.18s ease;
	}

	.blog__excerpt {
		margin: 0;
		max-width: 38ch;
		font-size: clamp(0.95rem, 2.2vw, 1.05rem);
		line-height: 1.45;
		color: var(--bn-ink-soft);
	}
</style>
