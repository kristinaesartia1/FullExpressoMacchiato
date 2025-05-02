<script setup lang="ts">
import spinner from './spinner.singleton'
</script>

<template>
    <v-overlay :model-value="spinner.state.isVisible" class="d-flex justify-center align-center" persistent>
      <v-progress-circular indeterminate size="80" color="primary"></v-progress-circular>
    </v-overlay>
</template>

<style lang="scss" scoped>

</style>
