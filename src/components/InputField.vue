<script setup>
	defineProps(["modelValue", "type", "label", "error", "required"])
	defineEmits(["update:modelValue"])
</script>

<template>
	<div class="input-component-wrapper">
		<label :class="{ active: modelValue }">
			<span>{{ $props.label }}</span>
			<input :value="modelValue" :required="$props.required" :type="type" :class="{ error: $props.error }" @input="$emit('update:modelValue', $event.target.value)" />
		</label>
	</div>
</template>

<style>
	div.input-component-wrapper {
		position: relative;
		padding-top: 0.6rem;
	}
	div.input-component-wrapper label {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	div.input-component-wrapper label span {
		position: absolute;
		top: 0.5em;
		line-height: 1em;
		left: 0;
		z-index: 1;
		pointer-events: none;
		opacity: 0.4;
		font-size: 1rem;
		transition: font-size 300ms ease, top 300ms ease;
	}

	div.input-component-wrapper label:focus-within span,
	div.input-component-wrapper label.active span {
		top: -0.8em;
		font-size: 0.8rem;
	}

	div.input-component-wrapper input {
		position: relative;
		-webkit-appearance: none;
		appearance: none;
		display: inline-block;
		outline: 0;
		width: 100%;
		border: 0;
		border-bottom: 2px solid var(--border-color);
		color: var(--text-color);
		background: transparent !important;
		vertical-align: top;
		width: 100%;
		padding: 0.4em 0;
		margin: 0;
		transition: border 300ms ease;
	}

	div.input-component-wrapper input:-webkit-autofill,
	div.input-component-wrapper input:-webkit-autofill:focus {
		/* Autofill appearance */
		-webkit-box-shadow: 0 0 0 1000px #10141f inset;
		-webkit-text-fill-color: var(--text-color);
		background-clip: content-box !important;
	}

	div.input-component-wrapper input:hover {
		border-bottom: 2px solid var(--text-color);
	}

	div.input-component-wrapper input:focus {
		border-bottom: 2px solid var(--accent-color);
	}

	div.input-component-wrapper input.error {
		border-bottom: 2px solid var(--error-color);
	}
</style>
