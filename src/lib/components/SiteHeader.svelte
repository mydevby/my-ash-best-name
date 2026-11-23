<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import { t } from '../i18n/locale.svelte';

	let menuOpen = $state(false);
	let settingsOpen = $state(false);

	const homePath = $derived(resolve('/'));
	const blogPath = $derived(resolve('blog'));
	const isHome = $derived(
		page.url.pathname === homePath ||
			page.url.pathname.replace(/\/$/, '') === homePath.replace(/\/$/, '') ||
			page.url.pathname === '/' ||
			page.url.pathname === ''
	);

	const navItems = $derived([
		{ href: homePath, label: t().navHome, hash: 'top' },
		{ href: `${homePath}#history`, label: t().historyTitle, hash: 'history' },
		{ href: `${homePath}#famous`, label: t().famousTitle, hash: 'famous' },
		{ href: blogPath, label: t().navBlog, hash: null }
	]);

	const brandInitial = $derived(t().brand.trim().charAt(0));

	function syncHeaderHeight() {
		const header = document.querySelector('.header');
		if (!(header instanceof HTMLElement)) return;
		document.documentElement.style.setProperty(
			'--bn-header-height',
			`${header.getBoundingClientRect().height}px`
		);
	}

	$effect(() => {
		syncHeaderHeight();
		window.addEventListener('resize', syncHeaderHeight);
		return () => window.removeEventListener('resize', syncHeaderHeight);
	});

	function closeAll() {
		menuOpen = false;
		settingsOpen = false;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
		if (menuOpen) settingsOpen = false;
	}

	function toggleSettings() {
		settingsOpen = !settingsOpen;
		if (settingsOpen) menuOpen = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeAll();
	}

	function scrollToId(id: string) {
		const target = document.getElementById(id);
		if (!target) return;

		syncHeaderHeight();
		const headerHeight =
			Number.parseFloat(
				getComputedStyle(document.documentElement).getPropertyValue('--bn-header-height')
			) || 60;
		const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
		window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
	}

	async function goHomeSection(hash: string) {
		closeAll();
		if (isHome) {
			scrollToId(hash);
			return;
		}
		await goto(`${homePath}#${hash}`);
		await tick();
		scrollToId(hash);
	}

	async function goRoute(href: string) {
		closeAll();
		await goto(href);
	}

	async function onNavClick(event: MouseEvent, href: string, hash: string | null) {
		event.preventDefault();
		if (hash) {
			await goHomeSection(hash);
			return;
		}
		await goRoute(href);
	}

	async function onBrandClick(event: MouseEvent) {
		event.preventDefault();
		await goHomeSection('top');
	}
</script>

<svelte:window onkeydown={onKeydown} />

<header class="header">
	<a class="header__brand" href={homePath} onclick={onBrandClick}>
		<span class="header__mark" aria-hidden="true">
			<span class="header__mark-letter">{brandInitial}</span>
		</span>
		<span class="header__name">{t().brand}</span>
	</a>

	<div class="header__actions">
		<button
			type="button"
			class="header__icon-btn"
			class:header__icon-btn--active={menuOpen}
			aria-label={menuOpen ? t().menuClose : t().menuOpen}
			aria-expanded={menuOpen}
			aria-controls="site-menu"
			onclick={toggleMenu}
		>
			<span class="header__burger" class:header__burger--open={menuOpen} aria-hidden="true">
				<span></span>
				<span></span>
				<span></span>
			</span>
		</button>

		<div class="header__settings-wrap">
			<button
				type="button"
				class="header__icon-btn"
				class:header__icon-btn--active={settingsOpen}
				aria-label={settingsOpen ? t().settingsClose : t().settingsOpen}
				aria-expanded={settingsOpen}
				aria-controls="site-settings"
				onclick={toggleSettings}
			>
				<svg class="header__gear" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						stroke="currentColor"
						stroke-width="1.7"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
					/>
					<path
						stroke="currentColor"
						stroke-width="1.7"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.4 12a7.5 7.5 0 0 0-.1-1l1.6-1.3-1.5-2.6-2 .7a7.7 7.7 0 0 0-1.7-1l-.3-2.1H10.6l-.3 2.1a7.7 7.7 0 0 0-1.7 1l-2-.7L5.1 9.7 6.7 11a7.5 7.5 0 0 0 0 2l-1.6 1.3 1.5 2.6 2-.7a7.7 7.7 0 0 0 1.7 1l.3 2.1h3.8l.3-2.1a7.7 7.7 0 0 0 1.7-1l2 .7 1.5-2.6-1.6-1.3c.1-.3.1-.7.1-1Z"
					/>
				</svg>
			</button>

			{#if settingsOpen}
				<div
					id="site-settings"
					class="header__settings"
					role="dialog"
					aria-label={t().settingsLabel}
				>
					<p class="header__settings-label">{t().themeLabel}</p>
					<ThemeSwitcher />
					<p class="header__settings-label">{t().langLabel}</p>
					<LanguageSwitcher />
				</div>
			{/if}
		</div>
	</div>
</header>

{#if menuOpen || settingsOpen}
	<button
		type="button"
		class="header__backdrop"
		class:header__backdrop--dim={menuOpen}
		aria-label={menuOpen ? t().menuClose : t().settingsClose}
		onclick={closeAll}
	></button>
{/if}

<aside
	id="site-menu"
	class="header__drawer"
	class:header__drawer--open={menuOpen}
	aria-hidden={!menuOpen}
	inert={!menuOpen}
	aria-label={t().menuLabel}
>
	<nav class="header__nav">
		<p class="header__nav-label">{t().menuLabel}</p>
		<ul class="header__nav-list">
			{#each navItems as item (item.href)}
				<li>
					<a
						class="header__nav-link"
						href={item.href}
						tabindex={menuOpen ? 0 : -1}
						onclick={(event) => onNavClick(event, item.href, item.hash)}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 60;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 3.75rem;
		padding: 0.65rem clamp(1rem, 4vw, 1.5rem);
		border-bottom: 1px solid var(--bn-line);
		background: color-mix(in oklab, var(--bn-paper) 78%, transparent);
		backdrop-filter: blur(12px);
	}

	.header__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		min-width: 0;
		color: inherit;
		text-decoration: none;
	}

	.header__brand:focus-visible {
		outline: 2px solid var(--bn-gold);
		outline-offset: 3px;
		border-radius: 0.35rem;
	}

	.header__mark {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 2.35rem;
		height: 2.35rem;
		border: 1.5px solid color-mix(in oklab, var(--bn-leaf-deep) 45%, transparent);
		border-radius: 999px;
		color: var(--bn-leaf-deep);
		background:
			radial-gradient(
				circle at 30% 25%,
				color-mix(in oklab, var(--bn-gold) 28%, transparent),
				transparent 55%
			),
			color-mix(in oklab, var(--bn-control-bg) 88%, transparent);
	}

	.header__mark-letter {
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 1;
		transform: translateY(0.02em);
	}

	.header__name {
		overflow: hidden;
		font-family: var(--font-display);
		font-size: clamp(1.05rem, 2.8vw, 1.25rem);
		font-weight: 650;
		letter-spacing: -0.04em;
		line-height: 1.1;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.header__actions {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.header__icon-btn {
		display: inline-grid;
		place-items: center;
		width: 2.45rem;
		height: 2.45rem;
		padding: 0;
		border: 1px solid var(--bn-control-border);
		border-radius: 0.45rem;
		background: var(--bn-control-bg);
		color: var(--bn-ink-soft);
		cursor: pointer;
		transition:
			background 0.18s ease,
			color 0.18s ease,
			border-color 0.18s ease;
	}

	.header__icon-btn:hover {
		color: var(--bn-ink);
		background: color-mix(in oklab, var(--bn-leaf) 12%, var(--bn-control-bg));
	}

	.header__icon-btn--active {
		color: var(--bn-control-active-fg);
		background: var(--bn-control-active-bg);
		border-color: transparent;
	}

	.header__icon-btn:focus-visible {
		outline: 2px solid var(--bn-gold);
		outline-offset: 2px;
	}

	.header__burger {
		display: grid;
		gap: 0.28rem;
		width: 1.05rem;
	}

	.header__burger span {
		display: block;
		height: 1.5px;
		border-radius: 999px;
		background: currentColor;
		transition: transform 0.22s ease, opacity 0.22s ease;
	}

	.header__burger--open span:nth-child(1) {
		transform: translateY(0.34rem) rotate(45deg);
	}

	.header__burger--open span:nth-child(2) {
		opacity: 0;
	}

	.header__burger--open span:nth-child(3) {
		transform: translateY(-0.34rem) rotate(-45deg);
	}

	.header__gear {
		width: 1.15rem;
		height: 1.15rem;
	}

	.header__settings-wrap {
		position: relative;
	}

	.header__settings {
		position: absolute;
		top: calc(100% + 0.55rem);
		right: 0;
		z-index: 70;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		width: max-content;
		min-width: 12.5rem;
		padding: 0.85rem;
		border: 1px solid var(--bn-line);
		border-radius: 0.65rem;
		background: color-mix(in oklab, var(--bn-paper) 92%, white);
		box-shadow: 0 14px 36px color-mix(in oklab, var(--bn-ink) 14%, transparent);
	}

	.header__settings-label {
		margin: 0;
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 650;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--bn-ink-soft);
	}

	.header__settings-label:not(:first-child) {
		margin-top: 0.25rem;
	}

	.header__backdrop {
		position: fixed;
		inset: 0;
		z-index: 55;
		border: 0;
		padding: 0;
		background: transparent;
		cursor: pointer;
	}

	.header__backdrop--dim {
		background: color-mix(in oklab, var(--bn-ink) 28%, transparent);
	}

	.header__drawer {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 65;
		display: flex;
		flex-direction: column;
		width: min(20rem, 86vw);
		height: 100dvh;
		padding: 5rem 1.35rem 1.5rem;
		border-left: 1px solid var(--bn-line);
		background: color-mix(in oklab, var(--bn-paper) 94%, white);
		box-shadow: -18px 0 40px color-mix(in oklab, var(--bn-ink) 12%, transparent);
		transform: translateX(104%);
		transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.header__drawer--open {
		transform: translateX(0);
	}

	.header__nav-label {
		margin: 0 0 1rem;
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 650;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--bn-ink-soft);
	}

	.header__nav-list {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.header__nav-link {
		display: block;
		padding: 0.85rem 0.2rem;
		border-bottom: 1px solid var(--bn-line);
		color: inherit;
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.2;
		text-decoration: none;
		transition: color 0.18s ease, padding-left 0.18s ease;
	}

	.header__nav-link:hover {
		padding-left: 0.35rem;
		color: var(--bn-leaf-deep);
	}

	.header__nav-link:focus-visible {
		outline: 2px solid var(--bn-gold);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.header__drawer,
		.header__burger span,
		.header__nav-link {
			transition: none;
		}
	}
</style>
