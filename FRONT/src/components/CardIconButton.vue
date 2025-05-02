<script setup lang="ts">

interface Props { icon:string, name:string, color:string }
const props = defineProps<Props>()
const emit = defineEmits<{ onclick: [string] }>();
</script>

<template>
    <div class="d-flex flex-column justify-end">
        <v-card
            rounded
            border
            elevation="0"
            :color="props.color"
            class="pa-4 pointer mb-1"
            @click="emit('onclick', props.name)"
        >
            <v-icon :icon="props.icon"/>
        </v-card>
        <v-label class="w-100 text-center d-block" style="font-size: 0.6rem;">{{ props.name }}</v-label>
    </div>
</template>

<style lang="scss" scoped>

</style>
