<script lang="ts">
	import { t } from '../lib/i18n/locale.svelte';
	import { getTheme } from '../lib/theme/theme.svelte';

	let ready = $state(false);

	const flakes = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		left: ((i * 37) % 100) + (i % 7) * 0.4,
		delay: (i % 12) * 0.45,
		duration: 9 + (i % 8) * 1.1,
		size: 2 + (i % 5),
		drift: -18 + (i % 9) * 4
	}));

	$effect(() => {
		const id = requestAnimationFrame(() => {
			ready = true;
		});
		return () => cancelAnimationFrame(id);
	});
</script>

<main class="about" class:about--ready={ready} class:about--winter={getTheme() === 'winter'}>
	<div class="about__wash" aria-hidden="true"></div>

	{#if getTheme() === 'winter'}
		<div class="about__snow" aria-hidden="true">
			{#each flakes as flake (flake.id)}
				<span
					class="about__flake"
					style="--left: {flake.left}%; --delay: {flake.delay}s; --duration: {flake.duration}s; --size: {flake.size}px; --drift: {flake.drift}px;"
				></span>
			{/each}
		</div>

		<svg class="about__pine" viewBox="0 0 220 320" aria-hidden="true">
			<path
				fill="currentColor"
				d="M110 18 168 96h-28l42 58h-30l46 68H30l46-68H46l42-58H60Z"
				opacity="0.9"
			/>
			<path fill="currentColor" d="M98 222h24v78H98z" opacity="0.85" />
			<circle cx="132" cy="120" r="5" fill="var(--bn-accent)" />
			<circle cx="84" cy="158" r="4.5" fill="var(--bn-accent)" />
			<circle cx="128" cy="186" r="5" fill="var(--bn-accent)" />
			<circle cx="74" cy="198" r="4" fill="#f2f7fb" />
			<circle cx="146" cy="150" r="3.5" fill="#f2f7fb" />
		</svg>
	{/if}

	<section class="about__hero">
		<p class="about__brand">{t().brand}</p>
		<h1 class="about__title">{t().title}</h1>
		<p class="about__lede">{t().lede}</p>
	</section>

	<section class="about__info">
		<h2 class="about__info-title">{t().aboutTitle}</h2>
		<p class="about__info-text">{t().aboutBody1}</p>
		<p class="about__info-text">{t().aboutBody2}</p>
	</section>
</main>

<style>
	.about {
		--reveal: 0;
		position: relative;
		isolation: isolate;
		display: grid;
		grid-template-rows: 1fr 1fr;
		overflow: hidden;
		height: 100dvh;
		color: var(--bn-ink);
	}

	.about--ready {
		--reveal: 1;
	}

	.about__wash {
		position: absolute;
		inset: 0;
		z-index: -2;
		background:
			radial-gradient(120% 80% at 85% 0%, var(--bn-wash-a), transparent 55%),
			radial-gradient(90% 70% at 0% 100%, var(--bn-wash-b), transparent 50%),
			linear-gradient(165deg, var(--bn-paper) 0%, var(--bn-paper-deep) 100%);
		transform: scale(calc(1.04 - 0.04 * var(--reveal)));
		transition:
			transform 1.1s cubic-bezier(0.22, 1, 0.36, 1),
			background 0.35s ease;
	}

	.about__wash::after {
		content: '';
		position: absolute;
		inset: 0;
		opacity: var(--bn-dot-opacity);
		background-image: radial-gradient(var(--bn-dot) 0.7px, transparent 0.7px);
		background-size: 3px 3px;
		mask-image: linear-gradient(180deg, black, transparent 85%);
	}

	.about--winter .about__wash::before {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 28%;
		background:
			linear-gradient(180deg, transparent, color-mix(in oklab, white 70%, #d7ecf8)),
			radial-gradient(120% 90% at 50% 100%, #ffffff 0%, transparent 70%);
		pointer-events: none;
	}

	.about__snow {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
	}

	.about__flake {
		position: absolute;
		top: -8%;
		left: var(--left);
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 0 6px color-mix(in oklab, white 70%, #9ec7e4);
		opacity: 0.85;
		animation: snowfall var(--duration) linear var(--delay) infinite;
	}

	.about__pine {
		position: absolute;
		right: clamp(-1rem, -2vw, 0);
		bottom: 0;
		z-index: 0;
		width: min(42vw, 17rem);
		height: auto;
		color: #0f5a3a;
		opacity: 0.88;
		pointer-events: none;
		filter: drop-shadow(0 10px 18px color-mix(in oklab, #0f5a3a 25%, transparent));
	}

	.about__hero,
	.about__info {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: clamp(0.65rem, 1.6vh, 1rem);
		padding-inline: clamp(1.25rem, 4vw, 2.5rem);
		max-width: 40rem;
		overflow: hidden;
	}

	.about__hero {
		padding-top: clamp(5rem, 12vh, 7rem);
		padding-bottom: clamp(1rem, 3vh, 1.75rem);
	}

	.about__info {
		justify-content: center;
		padding-top: clamp(0.75rem, 2vh, 1.25rem);
		padding-bottom: clamp(1.25rem, 4vh, 2rem);
		border-top: 1px solid var(--bn-line);
		background: var(--bn-panel);
	}

	.about__brand,
	.about__title,
	.about__lede,
	.about__info-title,
	.about__info-text {
		opacity: var(--reveal);
		transform: translateY(calc((1 - var(--reveal)) * 1.1rem));
		transition:
			opacity 0.7s ease,
			transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
			color 0.25s ease;
	}

	.about__brand {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2.4rem, 8vw, 4.5rem);
		font-weight: 700;
		letter-spacing: -0.05em;
		line-height: 0.95;
		transition-delay: 80ms;
	}

	.about--winter .about__brand {
		color: var(--bn-accent);
	}

	.about__title {
		margin: 0;
		max-width: 16ch;
		font-family: var(--font-display);
		font-size: clamp(1.35rem, 4.2vw, 2.1rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.15;
		transition-delay: 160ms;
	}

	.about--winter .about__title {
		box-decoration-break: clone;
		border-left: 3px solid var(--bn-accent);
		padding-left: 0.7rem;
	}

	.about__lede {
		margin: 0;
		max-width: 34ch;
		font-size: clamp(1rem, 2.4vw, 1.15rem);
		line-height: 1.45;
		color: var(--bn-ink-soft);
		transition-delay: 240ms;
	}

	.about__info-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 3.4vw, 1.7rem);
		font-weight: 650;
		letter-spacing: -0.03em;
		transition-delay: 300ms;
	}

	.about--winter .about__info-title {
		color: var(--bn-leaf-deep);
	}

	.about--winter .about__info-title::after {
		content: '';
		display: block;
		width: 2.75rem;
		height: 3px;
		margin-top: 0.45rem;
		border-radius: 999px;
		background: var(--bn-accent);
	}

	.about__info-text {
		margin: 0;
		max-width: 38ch;
		font-size: clamp(0.95rem, 2.2vw, 1.08rem);
		line-height: 1.5;
		color: var(--bn-ink-soft);
		transition-delay: 360ms;
	}

	.about__info-text + .about__info-text {
		transition-delay: 420ms;
	}

	@keyframes snowfall {
		0% {
			transform: translate3d(0, 0, 0);
			opacity: 0;
		}
		8% {
			opacity: 0.9;
		}
		100% {
			transform: translate3d(var(--drift), 110vh, 0);
			opacity: 0.15;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.about,
		.about__wash,
		.about__brand,
		.about__title,
		.about__lede,
		.about__info-title,
		.about__info-text {
			transition: none;
			transform: none;
			opacity: 1;
		}

		.about__flake {
			animation: none;
			opacity: 0.55;
		}
	}
</style>
