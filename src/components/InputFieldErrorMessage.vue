<template>
	<div class="form-field-error-message text-xs pt-2">
		<slot></slot>
	</div>
</template>

<style>
	.form-field-error-message {
		color: var(--error-color);
	}
</style>
