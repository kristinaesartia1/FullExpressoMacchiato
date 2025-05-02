<script setup lang="ts">
import FirmaMini from '@/assets/FirmaMini.svg';
import TextInput from '@/components/formComponents/TextInput.vue';
import { useUserStore } from '@/stores/useUserStore';
import { ref } from 'vue';

const userStore = useUserStore();
const email = ref('');
const name = ref('');
const password = ref('');
const submit = async () =>
{
    await userStore.signin(name.value, email.value, password.value);
}
</script>

<template>
    <v-sheet color="background" elevation="0" rounded class="pa-5" style="width: 85%; min-width: 250px; max-width: 1400px;">
        <div class="d-flex justify-center" style="height: 100px;">
            <img :src="FirmaMini" >
        </div>
        <div class="d-flex justify-center mt-4 mb-6" >
            <h3>CREATE AN ACCOUNT</h3>
        </div>
        <v-form class="pa-5 d-flex flex-wrap align-center mb-4" @submit.prevent="submit">
            <v-col cols="12">
                <TextInput label="Email" v-model="email" />
            </v-col>
            <v-col cols="12">
                <TextInput label="Name" v-model="name" />
            </v-col>
            <v-col cols="12">
                <TextInput label="Password" v-model="password" type="password" />
            </v-col>
            <v-col cols="12" class="text-center">
                <v-btn
                    class="mt-2"
                    text="Submit"
                    type="submit"
                    variant="outlined"
                />
            </v-col>
        </v-form>
        <div class="d-flex justify-center">
            <small>Already have an account? <RouterLink to="/hero/login">Login here.</RouterLink></small>
        </div>
    </v-sheet>
</template>

<style lang="scss" scoped>

</style>
