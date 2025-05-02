<script setup lang="ts">
import Container from '@/components/Container.vue';
import EmptyMessage from '@/components/EmptyMessage.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
    <Container padding="1rem" style="column-gap: 2rem;">
        <EmptyMessage class="pointer" theme-color="surface" borders @click="router.push('personalPage')">
            Navigate to your personal page to set your preferences
        </EmptyMessage>
    </Container>
</template>

<style lang="scss" scoped>
.container-hover {
    transition: 250ms background-color ease;
    &:hover {
        background-color: #dffcfd !important;
    }
}
</style>
