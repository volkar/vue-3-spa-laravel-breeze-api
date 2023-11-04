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
		name: "",
		password: "",
		password_confirmation: "",
    })

    onMounted(() => {
        authStore.clearRegisterForm()
    });

    const sendRegisterForm = async () => {
        authStore.clearRegisterForm()
        formSending.value = true
        await authStore.handleRegister(form.value)
        formSending.value = false
	}
</script>
<template>
	<PageGuard guest>
		<FormPlate class="typo">
			<h2 class="!mb-8">Create account</h2>

			<form :class="{ formsending: formSending }" @submit.prevent="sendRegisterForm()">

                <FormStatusErrorMessage v-if="authStore.registererror">{{ authStore.registererror }}</FormStatusErrorMessage>

				<div class="mb-4">
					<InputField v-model="form.email" type="email" label="Email" :error="authStore.registerfields.email" required />
                    <InputFieldErrorMessage v-if="authStore.registerfields.email">{{ authStore.registerfields.email[0] }}</InputFieldErrorMessage>
				</div>
				<div class="mb-4">
					<InputField v-model="form.name" type="text" label="Name" :error="authStore.registerfields.name" required />
					<InputFieldErrorMessage v-if="authStore.registerfields.name">{{ authStore.registerfields.name[0] }}</InputFieldErrorMessage>
				</div>
				<div class="mb-4">
					<InputField v-model="form.password" type="password" label="Password" :error="authStore.registerfields.password" required />
					<InputFieldErrorMessage v-if="authStore.registerfields.password">{{ authStore.registerfields.password[0] }}</InputFieldErrorMessage>
				</div>
				<div class="mb-8">
					<InputField v-model="form.password_confirmation" type="password" label="Password confirmation" required />
				</div>
				<div class="mb-8">
					<button type="submit" class="button">Create</button>
				</div>
			</form>

			<p>Already registered? <router-link :to="{ name: 'Login' }">Sign in</router-link></p>
		</FormPlate>
	</PageGuard>
</template>
