<script setup lang="ts">
const props = withDefaults(defineProps<{ label:string, color?:string }>(), { color: "surface" })
</script>

<template>
    <div class="w-100">
        <v-label class="mb-1">{{ label }}</v-label>
        <v-card rounded border elevation="0" :color="props.color" class="pa-5 w-100">
            <slot />
        </v-card>
    </div>
</template>

<style lang="scss" scoped>

</style>
