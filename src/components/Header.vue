<script setup>
	import { ref } from "vue"
	import { useAuthStore } from "@/stores/auth"

	const authStore = useAuthStore()
	const mobileMenuOpened = ref(false)

	const logout = async () => {
		await authStore.handleLogout()
		authStore.redirectToIndexEndpoint()
	}
</script>

<template>
	<header role="banner">
		<nav role="navigation">
			<div>
				<span class="menu-wrapper" :class="{ active: mobileMenuOpened }">
					<router-link :to="{ name: 'Index' }" class="nav-link">Index</router-link>
					<router-link v-if="authStore.user" :to="{ name: 'Dashboard' }" class="nav-link">Dashboard</router-link>
				</span>
			</div>

			<div>
				<router-link :to="{ name: 'Login' }" v-if="!authStore.user"><button class="button mr-2">Sign in</button></router-link>
				<router-link :to="{ name: 'Register' }" v-if="!authStore.user"><button class="button-ghost">Create account</button></router-link>

				<button @click.prevent="logout()" v-if="authStore.user" class="button">Sign out</button>

				<a href="#" @click.prevent="mobileMenuOpened = !mobileMenuOpened" class="inline-block ml-5 translate-y-1.5 md:hidden">
					<svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" /></svg>
				</a>
			</div>
		</nav>
	</header>
</template>

<style>
	header[role="banner"] {
		position: relative;
		padding: 1.5rem;
	}

	@media only screen and (orientation: landscape) and (min-width: 768px) {
		header[role="banner"] {
			padding: 2rem 4rem;
		}
	}

	header[role="banner"] nav {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	header[role="banner"] a.nav-link {
		font-weight: 600;
		margin-right: 2rem;
		display: none;
		transition: color 300ms ease;
	}

	header[role="banner"] a.active {
		color: var(--accent-color);
	}

	header[role="banner"] a.nav-link:hover {
		color: var(--accent-color);
	}

	@media only screen and (orientation: landscape) and (min-width: 768px) {
		header[role="banner"] a.nav-link {
			display: inline;
		}
	}

	@media only screen and (orientation: portrait), only screen and (max-width: 768px) {
		header[role="banner"] .menu-wrapper.active {
			position: absolute;
			width: 100%;
			padding: 1rem;
			background-color: var(--text-color);
			color: var(--bg-color);
			bottom: 0;
			transform: translate(0, 100%);
			left: 0;
			z-index: 10;
		}

		header[role="banner"] .menu-wrapper.active a {
			display: block;
			padding: 0.8rem 1rem;
			font-size: 1.2rem;
		}
	}
</style>
