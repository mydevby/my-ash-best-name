<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
	import ThemeSwitcher from '../lib/components/ThemeSwitcher.svelte';
	import { hydrateLocale, t } from '../lib/i18n/locale.svelte';
	import { hydrateTheme } from '../lib/theme/theme.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	$effect(() => {
		hydrateLocale();
		hydrateTheme();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content={t().metaDescription} />
	<title>{t().brand}</title>
</svelte:head>

<div class="shell">
	<header class="shell__bar">
		<ThemeSwitcher />
		<LanguageSwitcher />
	</header>
	{@render children()}
</div>

<style>
	.shell {
		height: 100dvh;
		overflow: hidden;
	}

	.shell__bar {
		position: fixed;
		inset-inline: 0;
		top: 0;
		z-index: 50;
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		padding: 0.85rem clamp(1rem, 4vw, 1.5rem);
		pointer-events: none;
	}

	.shell__bar :global(.langs),
	.shell__bar :global(.themes) {
		pointer-events: auto;
	}
</style>
