<template>
	<div class="form-status-error-message block font-semibold text-sm pb-6">
		<slot></slot>
	</div>
</template>

<style>
	.form-status-error-message {
		color: var(--error-color);
	}
</style>
