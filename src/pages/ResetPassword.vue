<script setup>
	import { ref, onMounted } from "vue"
	import { useAuthStore } from "@/stores/auth"
	import { useRoute } from "vue-router"
	import FormPlate from "@/components/FormPlate.vue"
	import InputField from "@/components/InputField.vue"
	import InputFieldErrorMessage from "@/components/InputFieldErrorMessage.vue"
	import FormStatusMessage from "@/components/FormStatusMessage.vue"
	import FormStatusErrorMessage from "@/components/FormStatusErrorMessage.vue"

	const route = useRoute()
	const authStore = useAuthStore()

	const formSending = ref(false)
	const form = ref({
		password: "",
		password_confirmation: "",
		email: route.query.email,
		token: route.params.token,
	})

	onMounted(() => {
		authStore.clearResetPasswordForm()
	})

	const sendResetPasswordForm = async () => {
		authStore.clearResetPasswordForm()
		formSending.value = true
		await authStore.handleResetPassword(form.value)
		formSending.value = false
	}
</script>

<template>
	<FormPlate class="typo">
		<h2 class="!mb-8">Reset password</h2>

		<form :class="{ formsending: formSending }" @submit.prevent="sendResetPasswordForm()">
			<FormStatusMessage v-if="authStore.resetpasswordsuccess">{{ authStore.resetpasswordsuccess }}</FormStatusMessage>
			<FormStatusErrorMessage v-if="authStore.resetpassworderror">{{ authStore.resetpassworderror }}</FormStatusErrorMessage>

			<div class="mb-4">
				<div>{{ route.query.email }}</div>
				<InputFieldErrorMessage v-if="authStore.resetpasswordfields.email">{{ authStore.resetpasswordfields.email[0] }}</InputFieldErrorMessage>
			</div>

			<div class="mb-4">
				<InputField v-model="form.password" type="password" label="New password" required />
				<InputFieldErrorMessage v-if="authStore.resetpasswordfields.password">{{ authStore.resetpasswordfields.password[0] }}</InputFieldErrorMessage>
			</div>
			<div class="mb-8">
				<InputField v-model="form.password_confirmation" type="password" label="Password confirmation" required />
			</div>
			<div class="mb-8">
				<button type="submit" class="button">Reset password</button>
			</div>
		</form>
	</FormPlate>
</template>
