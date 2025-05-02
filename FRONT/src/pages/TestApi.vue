<script setup lang="ts">
import Container from '@/components/Container.vue';
import { Cazzios } from '@/utils/axios.utils';
import { onMounted } from 'vue';

onMounted(async () =>
{
    await Cazzios.get('/sales');
})

</script>

<template>
    <Container>
        You should see the results of the apis in the dev tools.
    </Container>
</template>

<style lang="scss" scoped>

</style>
