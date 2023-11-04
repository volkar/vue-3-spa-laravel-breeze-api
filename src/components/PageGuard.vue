<script setup>
	const props = defineProps(["guest", "authenticated"])

	import { ref, onBeforeMount } from "vue"
	import { useAuthStore } from "@/stores/auth"

	const authStore = useAuthStore()
	const preventLoadBeforeCheck = ref(true)
	onBeforeMount(() => {
		if (typeof props.authenticated !== "undefined") {
			// Only authenticated users allowed
			preventLoadBeforeCheck.value = authStore.redirectIfGuest()
		} else if (typeof props.guest !== "undefined") {
			// Only guests allowed
			preventLoadBeforeCheck.value = authStore.redirectIfAuthenticated()
		} else {
			// Everyone allowed
			preventLoadBeforeCheck.value = false
		}
	})
</script>

<template>
	<div v-if="!preventLoadBeforeCheck">
		<slot></slot>
	</div>
</template>
