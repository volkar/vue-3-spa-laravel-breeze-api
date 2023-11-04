<script setup>
	import { ref, onMounted } from "vue"
	import { useAuthStore } from "@/stores/auth"
	import FormPlate from "@/components/FormPlate.vue"
	import InputField from "@/components/InputField.vue"
	import InputFieldErrorMessage from "@/components/InputFieldErrorMessage.vue"
	import FormStatusErrorMessage from "@/components/FormStatusErrorMessage.vue"
	import PageGuard from "@/components/PageGuard.vue"

	const authStore = useAuthStore()

	const formSending = ref(false)
	const form = ref({
		email: "",
		password: "",
	})

	onMounted(() => {
		authStore.clearLoginForm()
	})

	const sendLoginForm = async () => {
		authStore.clearLoginForm()
		formSending.value = true
		await authStore.handleLogin(form.value)
		formSending.value = false
	}
</script>
<template>
	<PageGuard guest>
		<FormPlate class="typo">
			<h2 class="!mb-8">Sign in</h2>

			<form :class="{ formsending: formSending }" @submit.prevent="sendLoginForm()">
				<FormStatusErrorMessage v-if="authStore.loginerror">{{ authStore.loginerror }}</FormStatusErrorMessage>

				<div class="mb-4">
					<InputField v-model="form.email" type="email" label="Email" :error="authStore.loginfields.email" required />
					<InputFieldErrorMessage v-if="authStore.loginfields.email">{{ authStore.loginfields.email[0] }}</InputFieldErrorMessage>
				</div>
				<div class="mb-8">
					<InputField v-model="form.password" type="password" label="Password" required />
					<InputFieldErrorMessage v-if="authStore.loginfields.password">{{ authStore.loginfields.password[0] }}</InputFieldErrorMessage>
				</div>
				<div class="mb-8">
					<button type="submit" class="button">Sign in</button>
				</div>
			</form>

			<p class="!mb-2"><router-link :to="{ name: 'ForgotPassword' }">Forgot Password?</router-link></p>
			<p>Not a member yet? <router-link :to="{ name: 'Register' }">Create account</router-link></p>
		</FormPlate>
	</PageGuard>
</template>
