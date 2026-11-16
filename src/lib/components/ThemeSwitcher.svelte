<script lang="ts">
	import { t } from '../i18n/locale.svelte';
	import { getTheme, setTheme } from '../theme/theme.svelte';
	import { themes, type Theme } from '../theme/themes';

	const labels = $derived({
		light: t().themeLight,
		dark: t().themeDark,
		winter: t().themeWinter
	} satisfies Record<Theme, string>);
</script>

<div class="themes" role="group" aria-label={t().themeLabel}>
	{#each themes as code (code)}
		<button
			type="button"
			class="themes__btn"
			class:themes__btn--active={getTheme() === code}
			aria-label={labels[code]}
			aria-pressed={getTheme() === code}
			onclick={() => setTheme(code)}
		>
			<span class="themes__icon" aria-hidden="true">
				{#if code === 'light'}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
						<circle cx="12" cy="12" r="4" />
						<path
							stroke-linecap="round"
							d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"
						/>
					</svg>
				{:else if code === 'dark'}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
						<path
							stroke-linejoin="round"
							d="M20 14.5A7.5 7.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"
						/>
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
						<path
							stroke-linecap="round"
							d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M3 12h18M7.5 3.8l9 16.4M16.5 3.8l-9 16.4"
						/>
					</svg>
				{/if}
			</span>
		</button>
	{/each}
</div>

<style>
	.themes {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem;
		border: 1px solid var(--bn-control-border);
		border-radius: 0.45rem;
		background: var(--bn-control-bg);
		backdrop-filter: blur(8px);
	}

	.themes__btn {
		display: inline-grid;
		place-items: center;
		width: 2.1rem;
		height: 2.1rem;
		padding: 0;
		border: 0;
		border-radius: 0.3rem;
		background: transparent;
		color: var(--bn-ink-soft);
		cursor: pointer;
		transition:
			background 0.18s ease,
			color 0.18s ease;
	}

	.themes__btn:hover {
		background: color-mix(in oklab, var(--bn-leaf) 14%, transparent);
		color: var(--bn-ink);
	}

	.themes__btn--active {
		background: var(--bn-control-active-bg);
		color: var(--bn-control-active-fg);
	}

	.themes__btn:focus-visible {
		outline: 2px solid var(--bn-gold);
		outline-offset: 2px;
	}

	.themes__icon {
		display: grid;
		width: 1.05rem;
		height: 1.05rem;
	}

	.themes__icon :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
