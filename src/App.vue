<script setup>
	import { onBeforeMount } from "vue"
	import { useAuthStore } from "@/stores/auth"
	import { useBaseStore } from "@/stores/base"

	import Header from "@/components/Header.vue"
	import Footer from "@/components/Footer.vue"

	const authStore = useAuthStore()
	const baseStore = useBaseStore()

	onBeforeMount(async () => {

		// First page load, get user data if authenticated
		const user = await authStore.getUserData()

		if (user) {
			// Authenticated
			authStore.setUser(user)
		}

		// Initialize website (render components)
		baseStore.setInitialization()
	})

	window.addEventListener("focus", async function () {
		// Check user session when inactivity lasts longer than 60 min (3600000 ms)
		const inactivityTimeoutMS = 3600000
		if (authStore.user && baseStore.initialized && baseStore.lastrequesttime < Date.now() - inactivityTimeoutMS) {
			const isAuthenticated = await authStore.checkUserSession()
            if (!isAuthenticated) {
				// Session expired, clear user data
				authStore.clearUser()
			}
		}
	})
</script>

<template>
	<Header v-if="baseStore.initialized" />

	<main :class="{ loading: !baseStore.initialized }">
		<router-view v-if="baseStore.initialized" />
	</main>

	<Footer v-if="baseStore.initialized" />
</template>

<style>
	/* --- Variables --- */

	:root {
		--text-color: #dde6f1;
		--bg-color: #121723;
		--accent-color: #52c3f8;
		--border-color: #273241;
        --error-color: #ff8c2e;
        --gradient: linear-gradient(45deg, #613cf6 0%, #c855c0 25%, #f345b3 50%, #f87026 75%, #ffc105 100%);
		--mobile-font: 3.3vw;
		--desktop-font: 1.4vw;
	}

	/* --- Base --- */

	html {
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		font-size: var(--mobile-font);
		line-height: 1.2rem;

		color: var(--text-color);
		background-color: var(--bg-color);

		-webkit-overflow-scrolling: touch;
	}

	@media only screen and (orientation: landscape) and (min-width: 768px) {
		html {
			font-size: var(--desktop-font);
			font-size: clamp(calc(0.925 * var(--desktop-font)), calc(0.75 * var(--desktop-font) + 25%), calc(1.03 * var(--desktop-font)));
		}
	}

	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	body {
		box-sizing: border-box;
		position: relative;
		margin: 0;
		padding: 0;

		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
		font-weight: 300;

		color: var(--text-color);
		background-color: var(--bg-color);

		min-height: 100%;
		min-height: 100svh;

		zoom: 1;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	#app {
		min-height: 100%;
		min-height: 100svh;
	}

	/* --- Elements normalization --- */

	input,
	textarea,
	button,
	select,
	a {
		-webkit-tap-highlight-color: transparent;
	}

	a,
	input.submit,
	input.button,
	button {
		-webkit-appearance: none;
		-moz-appearance: none;
		cursor: pointer;
	}

	img {
		display: inline-block;
		width: 100%;
		height: auto;
	}

	/* --- Layout --- */

	#app {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: stretch;
	}

	header[role="banner"] {
		flex: 0 0;
	}

	footer[role="contentinfo"] {
		flex: 0 0;
	}

	main {
		flex: 1 0;
	}

	/* --- Main --- */

	main {
		padding: 1.5rem;
	}

	@media only screen and (orientation: landscape) and (min-width: 768px) {
		main {
			padding: 2rem 4rem;
		}
	}

	/* --- Headings --- */

	.typo h1 {
		font-size: 3.2rem;
		font-weight: 600;
		line-height: 1em;
		margin-bottom: 0.5em;
	}

	.typo h1:first-child {
		margin-top: 0;
	}

	.typo h1 .gradient {
		background-image: var(--gradient);
		filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.1));
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
		-webkit-text-fill-color: transparent;
	}

	.typo h2 {
		font-size: 2.4rem;
		font-weight: 600;
		line-height: 1em;
		margin-bottom: 0.5em;
	}

	.typo h3 {
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 1em;
		margin-bottom: 0.5em;
	}

	/* --- Hero and Paragraphs --- */

	.typo .hero {
		font-size: 1.6rem;
		line-height: 1.25em;
		margin-bottom: 1em;
	}

	.typo strong {
		font-weight: 600;
	}

	.typo p {
		font-size: 1rem;
		line-height: 1.5em;
		margin-bottom: 1.5em;
	}

	.typo p:last-child {
		margin-bottom: 0;
	}

	/* --- Links --- */

	.typo p a {
		transition: border 300ms ease, color 300ms ease;
		display: inline;
		border-bottom: 2px solid var(--accent-color);
	}

	.typo p a:hover {
        color: var(--accent-color);
		border-bottom: 2px solid transparent;
	}

    .typo p a:focus {
        outline: none;
        color: var(--accent-color);
		border-bottom: 2px solid transparent;
	}

	/* --- Lists --- */

	.typo ul {
		padding: 0 0 0 1rem;
		margin: 0 0 1.4rem 0;
		list-style: disc;
	}

	.typo ul li {
		margin-bottom: 0.3rem;
	}

	.typo ul ul {
		margin: 0;
		list-style: circle;
	}

	.typo ul ol {
		margin: 0;
	}

	/* --- Buttons --- */

	.button {
		font-weight: 500;
		padding: 0.6rem 1.2rem;
		color: var(--bg-color);
		background: var(--text-color);
		text-decoration: none;
		border-radius: 10rem;
		border: 1px solid transparent;
		transition: background 300ms ease;
	}

	.button:hover {
		background: var(--accent-color);
	}
    .button:focus {
        outline: none;
		background: var(--accent-color);
	}

	.button-wire {
		font-weight: 500;
		padding: 0.6rem 1.2rem;
		color: var(--bg-text);
		background: transparent;
		text-decoration: none;
		border: 1px solid var(--border-color);
		border-radius: 10rem;
		transition: color 300ms ease;
	}

	.button-wire:hover {
		color: var(--accent-color);
	}
    .button-wire:focus {
        outline: none;
		color: var(--accent-color);
	}

	.button-ghost {
		font-weight: 500;
		padding: 0.6rem 1.2rem;
		color: var(--bg-text);
		background: transparent;
		text-decoration: none;
		border: 1px solid transparent;
		border-radius: 10rem;
		transition: color 300ms ease;
	}

	.button-ghost:hover {
		color: var(--accent-color);
	}
    .button-ghost:focus {
        outline: none;
		color: var(--accent-color);
	}

	/* --- Spinner --- */

	.loading::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -28px;
		margin-left: -28px;
		width: 50px;
		height: 50px;
		border-radius: 50px;
		border: 3px solid var(--border-color);
		border-top-color: var(--accent-color);
		animation: loading 2s linear infinite;
	}
	@keyframes loading {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

    /* --- Form sending --- */

    form.formsending {
        pointer-events: none;
    }

    form.formsending button {
        opacity: 0.2;
    }

    form.formsending div.input-component-wrapper:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background: var(--gradient);
        z-index: 10;
        animation: animatedbackground 3s ease alternate infinite;
        background-size: 300% 300%;
    }

    @keyframes animatedbackground {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

</style>
