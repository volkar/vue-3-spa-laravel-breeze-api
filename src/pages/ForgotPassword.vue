<script setup>
	import { ref, onMounted } from "vue"
	import { useAuthStore } from "@/stores/auth"
	import FormPlate from "@/components/FormPlate.vue"
	import InputField from "@/components/InputField.vue"
	import InputFieldErrorMessage from "@/components/InputFieldErrorMessage.vue"
	import FormStatusMessage from "@/components/FormStatusMessage.vue"
	import FormStatusErrorMessage from "@/components/FormStatusErrorMessage.vue"
	import PageGuard from "@/components/PageGuard.vue"

	const authStore = useAuthStore()

	const formSending = ref(false)
	const email = ref()

	onMounted(() => {
		authStore.clearForgotPasswordForm()
	})

	const sendForgotPasswordForm = async () => {
		authStore.clearForgotPasswordForm()
		formSending.value = true
		await authStore.handleForgotPassword(email.value)
		formSending.value = false
	}
</script>

<template>
	<PageGuard guest>
		<FormPlate class="typo">
			<h2 class="!mb-8">Forgot password</h2>

			<form :class="{ formsending: formSending }" @submit.prevent="sendForgotPasswordForm()">
				<FormStatusMessage v-if="authStore.forgotpasswordsuccess">{{ authStore.forgotpasswordsuccess }}</FormStatusMessage>
				<FormStatusErrorMessage v-if="authStore.forgotpassworderror">{{ authStore.forgotpassworderror }}</FormStatusErrorMessage>

				<div class="mb-8">
					<InputField v-model="email" type="email" label="Email" required />
					<InputFieldErrorMessage v-if="authStore.forgotpasswordfields.email">{{ authStore.forgotpasswordfields.email[0] }}</InputFieldErrorMessage>
				</div>

				<div class="mb-8">
					<button type="submit" class="button">Send link</button>
				</div>
			</form>

			<p>Already registered? <router-link :to="{ name: 'Login' }">Sign In</router-link></p>
		</FormPlate>
	</PageGuard>
</template>
