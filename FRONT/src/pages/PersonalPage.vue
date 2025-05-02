<script setup lang="ts">
import Container from '@/components/Container.vue';
import EmptyMessage from '@/components/EmptyMessage.vue';
import IconButton from '@/components/formComponents/IconButton.vue';
import TextInput from '@/components/formComponents/TextInput.vue';
import { useUserStore } from '@/stores/useUserStore';
import { Cazzios } from '@/utils/axios.utils';
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const preferences = useUserStore();

const savingFile:Ref<File[]> = ref([]);
const image:Ref<string | undefined> = ref(undefined);
const name = ref('')
const email = ref('')

const currentPass = ref('');
const newPass = ref('');
onMounted(() =>
{
    name.value = preferences.name ?? '';
    email.value = preferences.email ?? '';
    image.value = preferences.image ?? '';
})



const savePreferences = async () =>
{
    const res = await Cazzios.postMultipart('/user', { name:name.value, image:savingFile.value[0] });
    if (res.isOk)
    {
        window.localStorage.setItem('name', res.response.name)
        window.localStorage.setItem('email', res.response.email)
        window.localStorage.setItem('image', res.response.image)

        toast.success('Settings updated');
    }
    else
    {
        toast.error(`Error: ${res.error}`);
    }
}
const changePass = async () =>
{
    const res = await Cazzios.post('/user/updatePassword', { currentPassword:currentPass.value, newPassword:newPass.value });
    if (!res.isOk) toast.error(`Error: ${res.error}`)
    else toast.success('Password changed');
}
const logout = () =>
{
    preferences.logout();
    router.push('/hero/login');
}
</script>

<template>
    <Container>
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <div style="height:150px; aspect-ratio: 1/1; border-radius: 50%; overflow: hidden; text-align: center; background-color:black">
                <img :src="`data:image/jpeg;base64,${image}`" style="height: 100%;"/>
            </div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-wrap">
            <v-col cols="12">
                <v-label class="mr-2">Email: </v-label>
                <div class="px-4">
                    <TextInput v-model="email" density="compact" readonly variant="plain"/>
                    <small class="text-disabled text-caption">* To change email contact admin</small>
                </div>
            </v-col>
            <v-col cols="12" class="pt-5">
                <v-label class="mr-2">Name: </v-label>
                <TextInput v-model="name" density="compact"/>
            </v-col>
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="mr-2">Image: </v-label>
                <div class="pa-5">
                    <EmptyMessage :center="false" borders theme-color="surface" additional-class="justify-center">
                        <v-file-upload
                            v-model="savingFile"
                            density="compact"
                            :multiple="false"
                            scrim
                        />
                    </EmptyMessage>
                </div>
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="mr-2">Change Password: </v-label>
            <div class="pa-5">
                <EmptyMessage :center="false" borders theme-color="surface">
                    <TextInput v-model="currentPass" label="Current Password" class="w-100 mb-2" type="password"/>
                    <TextInput v-model="newPass" label="New Password" class="w-100 mb-2" type="password"/>
                    <div class="w-100 text-center">
                        <IconButton a-icon="mdi-pen" text="change" @on-click="changePass()" color="warning" block size="large"/>
                    </div>
                </EmptyMessage>
            </div>
        </v-col>
        <v-col cols="12">
            <v-btn text="SAVE" color="success" elevation="0" variant="outlined" block @click="savePreferences()"/>
        </v-col>
        <v-col cols="12">
            <v-btn text="LOGOUT" color="error" elevation="0" variant="outlined" block @click="logout()"/>
        </v-col>
    </Container>
</template>

<style lang="scss" scoped>
:deep(.v-file-upload-title) {
    padding-right: 0.6rem;
}
:deep(.v-file-upload-icon) {
    padding-left: 0.6rem;
}
</style>
