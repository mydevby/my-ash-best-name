<script lang="ts">
	import { t } from '../i18n/locale.svelte';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	function close() {
		open = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) close();
	}

	$effect(() => {
		if (!open || typeof document === 'undefined') return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
	<div class="modal" role="presentation">
		<button type="button" class="modal__backdrop" aria-label={t().registerSoonClose} onclick={close}
		></button>
		<div
			class="modal__dialog"
			role="dialog"
			aria-modal="true"
			aria-labelledby="register-soon-title"
		>
			<p id="register-soon-title" class="modal__text">{t().registerSoon}</p>
			<button type="button" class="modal__close" onclick={close}>
				{t().registerSoonClose}
			</button>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		inset: 0;
		z-index: 80;
		display: grid;
		place-items: center;
		padding: 1.25rem;
	}

	.modal__backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		padding: 0;
		background: color-mix(in oklab, var(--bn-ink) 42%, transparent);
		cursor: pointer;
	}

	.modal__dialog {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: min(100%, 24rem);
		padding: 1.5rem 1.4rem 1.35rem;
		border: 1px solid var(--bn-line);
		border-radius: 0.75rem;
		background: var(--bn-paper);
		box-shadow: 0 22px 50px color-mix(in oklab, var(--bn-ink) 22%, transparent);
	}

	.modal__text {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.05rem, 2.8vw, 1.2rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.35;
		color: var(--bn-ink);
	}

	.modal__close {
		align-self: flex-start;
		min-height: 2.5rem;
		padding: 0.55rem 1.1rem;
		border: 0;
		border-radius: 0.45rem;
		background: var(--bn-control-active-bg);
		color: var(--bn-control-active-fg);
		font-family: var(--font-body);
		font-size: 0.95rem;
		font-weight: 650;
		cursor: pointer;
		transition: filter 0.18s ease;
	}

	.modal__close:hover {
		filter: brightness(1.06);
	}

	.modal__close:focus-visible {
		outline: 2px solid var(--bn-gold);
		outline-offset: 2px;
	}
</style>
