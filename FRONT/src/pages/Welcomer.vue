<script setup lang="ts">
import Container from '@/components/Container.vue';
import EmptyMessage from '@/components/EmptyMessage.vue';
import IconButton from '@/components/formComponents/IconButton.vue';
import TextInput from '@/components/formComponents/TextInput.vue';
import { useSocket } from '@/utils/socket.utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const isDev = ref(import.meta.env.DEV)
const router = useRouter();
const devSocket = useSocket({
    namespace: 'devUser',
    connectionQuery: { commId: window.localStorage.getItem('t') },
    events: {
        "sayingStuff": (data) => { messages.value.push(data.message); }
    }
});


const messages = ref<string[]>([]);
const myMessage = ref<string>('');

function sendMessage() {
    if (myMessage.value.trim() === '') return;
    devSocket.value?.emit('sayStuff', myMessage.value);
    myMessage.value = '';
}

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
        <EmptyMessage v-if="isDev" class="pointer" theme-color="info" borders @click="navigateToSwagger()">
            SWAGGER-UI
        </EmptyMessage>
        <Container padding="1rem">
            <div class="w-100" style="height: 400px; overflow-y: scroll;">
                <p v-for="(message, _i) in messages" class="mb-0">{{ message }}</p>
            </div>
        </Container>
        <TextInput v-model="myMessage" />
        <IconButton block text="Say Hi" color="success" @on-click="sendMessage()"/>
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
