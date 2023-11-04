<script setup>
	import { useAuthStore } from "@/stores/auth"
	import PageGuard from "@/components/PageGuard.vue"
	const authStore = useAuthStore()
</script>

<template>
	<PageGuard>
		<div class="typo">
			<h1>Vue 3 SPA for<br /><span class="gradient">Laravel Breeze</span> API</h1>
			<p v-if="authStore.user">
				Logged in as <strong>{{ authStore.user.name }}</strong>
			</p>
			<p v-else>You are not logged in</p>
		</div>
	</PageGuard>
</template>
