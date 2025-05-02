<script setup lang="ts">
import Container from '@/components/Container.vue';

const props = defineProps<{ title:string, flexColumn?:boolean }>();
</script>

<template>
    <Container>
        <div class="d-flex justify-space-between flex-wrap w-100 align-center">
            <h1>{{ props.title }}</h1>
            <slot name="header" />
        </div>
        <v-divider class="w-100"/>
        <Container :flex-column="flexColumn">
            <slot />
        </Container>
    </Container>
</template>

<style lang="scss" scoped>

</style>
