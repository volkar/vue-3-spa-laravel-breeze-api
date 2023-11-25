<template>
	<div class="plate">
		<slot />
	</div>
</template>

<style scoped>
	.plate {
		padding: 2rem;
		background-color: rgba(0, 0, 0, 0.12);
		max-width: 25rem;
		margin: 0 auto;
		border-radius: 0.8rem;
	}
</style>
