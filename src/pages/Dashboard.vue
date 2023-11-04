<script setup>
	import { useAuthStore } from "@/stores/auth"
	import PageGuard from "@/components/PageGuard.vue"

    const authStore = useAuthStore()

</script>

<template>
	<PageGuard authenticated>
		<section>
			<div class="typo">
				<h1>Your private<br /><span class="gradient">Dashboard</span></h1>
				<p>
					Logged in as <strong>{{ authStore.user.name }}</strong><br>
                    <a :href="'mailto:' + authStore.user.email">{{ authStore.user.email }}</a><br>
				</p>

			</div>
		</section>
	</PageGuard>
</template>
