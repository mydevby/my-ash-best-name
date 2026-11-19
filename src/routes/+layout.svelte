<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import SiteHeader from '../lib/components/SiteHeader.svelte';
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
	<SiteHeader />
	{@render children()}
</div>

<style>
	.shell {
		min-height: 100dvh;
	}
</style>
