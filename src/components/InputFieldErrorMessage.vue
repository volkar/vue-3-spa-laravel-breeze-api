<template>
	<div class="form-field-error-message text-xs pt-2">
		<slot />
	</div>
</template>

<style>
	.form-field-error-message {
		color: var(--error-color);
	}
</style>
