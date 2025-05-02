<script setup lang="ts">
import AppSpinner from './components/singletons/AppSpinner.vue';

</script>

<template>
	<v-app>
		<AppSpinner />
		<router-view />
	</v-app>
</template>

<style scoped>
</style>
