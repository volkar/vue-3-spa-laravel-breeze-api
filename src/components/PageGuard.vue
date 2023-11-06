<script setup>
	const props = defineProps(["guest", "authenticated"])

	import { ref, onBeforeMount } from "vue"
	import { useAuthStore } from "@/stores/auth"

	const authStore = useAuthStore()
    const preventLoadBeforeCheck = ref(true)

    const guestOnly = ref(false)
    const authenticatedOnly = ref(false)

	onBeforeMount(() => {
		if (typeof props.authenticated !== "undefined") {
			// Only authenticated users allowed
            preventLoadBeforeCheck.value = authStore.redirectIfGuest()
            authenticatedOnly.value = true
		} else if (typeof props.guest !== "undefined") {
			// Only guests allowed
            preventLoadBeforeCheck.value = authStore.redirectIfAuthenticated()
            guestOnly.value = true
		} else {
			// Everyone allowed
			preventLoadBeforeCheck.value = false
		}
	})
</script>

<template>
	<div v-if="!preventLoadBeforeCheck && ((!guestOnly && !authenticatedOnly) || (guestOnly && !authStore.user) || (authenticatedOnly && authStore.user))">
		<slot></slot>
	</div>
</template>
