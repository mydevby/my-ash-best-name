<script lang="ts">
	import { getLocale, setLocale, t } from '../i18n/locale.svelte';
	import { localeMeta, locales } from '../i18n/messages';
</script>

<div class="langs" role="group" aria-label={t().langLabel}>
	{#each locales as code (code)}
		<button
			type="button"
			class="langs__btn"
			class:langs__btn--active={getLocale() === code}
			aria-label={localeMeta[code].flagLabel}
			aria-pressed={getLocale() === code}
			onclick={() => setLocale(code)}
		>
			<span class="langs__flag" aria-hidden="true">
				{#if code === 'ru'}
					<svg viewBox="0 0 9 6">
						<rect width="9" height="2" y="0" fill="#fff" />
						<rect width="9" height="2" y="2" fill="#0039a6" />
						<rect width="9" height="2" y="4" fill="#d52b1e" />
					</svg>
				{:else}
					<svg viewBox="0 0 12 6">
						<rect width="12" height="4" fill="#c8312a" />
						<rect y="4" width="12" height="2" fill="#6dae3e" />
						<rect width="2.2" height="6" fill="#c8312a" />
						<path
							fill="#fff"
							d="M0.35 0.35h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zM0.35 1.4h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zM0.35 2.45h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zM0.35 3.5h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zM0.35 4.55h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5zm0.75 0h0.5v0.7h-0.5z"
						/>
					</svg>
				{/if}
			</span>
			<span class="langs__code">{code}</span>
		</button>
	{/each}
</div>

<style>
	.langs {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.3rem;
		border: 1px solid var(--bn-control-border);
		border-radius: 0.45rem;
		background: var(--bn-control-bg);
		backdrop-filter: blur(8px);
	}

	.langs__btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 2.1rem;
		padding: 0.25rem 0.55rem;
		border: 0;
		border-radius: 0.3rem;
		background: transparent;
		color: var(--bn-ink-soft);
		font-family: var(--font-body);
		font-size: 0.78rem;
		font-weight: 650;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			background 0.18s ease,
			color 0.18s ease;
	}

	.langs__btn:hover {
		background: color-mix(in oklab, var(--bn-leaf) 12%, transparent);
		color: var(--bn-ink);
	}

	.langs__btn--active {
		background: var(--bn-control-active-bg);
		color: var(--bn-control-active-fg);
	}

	.langs__btn:focus-visible {
		outline: 2px solid var(--bn-gold);
		outline-offset: 2px;
	}

	.langs__flag {
		display: grid;
		width: 1.25rem;
		height: 0.85rem;
		overflow: hidden;
		border-radius: 0.12rem;
		box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--bn-ink) 18%, transparent);
	}

	.langs__flag :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
