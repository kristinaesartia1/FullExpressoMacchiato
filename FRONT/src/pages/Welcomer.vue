<script setup lang="ts">
import Container from '@/components/Container.vue';
import EmptyMessage from '@/components/EmptyMessage.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToSwagger = () =>
{
    const devSwaggerUrl = 'http://127.0.0.1:3000/swagger-ui';
    window.open(devSwaggerUrl, '_blank')
}
</script>

<template>
    <Container padding="1rem" style="column-gap: 2rem;">
        <EmptyMessage class="pointer mb-2" theme-color="surface" borders @click="router.push('personalPage')">
            Navigate to your personal page to set your preferences
        </EmptyMessage>
        <EmptyMessage v-if="import.meta.env.DEV" class="pointer" theme-color="info" borders @click="navigateToSwagger()">
            SWAGGER-UI
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
