<script setup lang="ts">
import { ref } from 'vue';
import Container from './Container.vue';

const emit = defineEmits<{ confirm:[boolean] }>();
const props = withDefaults(defineProps<{
    maxWidth?:string,
    minWidth?:string,
    width?:string,
    okButton?:string,
    okButtonColor?:string
    hideOkBtn?:boolean,
    autoclose?:boolean,
    additionalStyle?:string
}>(), {
    maxWidth: "50vw",
    minWidth:"250px",
    okButton: 'Save',
    width: 'auto',
    okButtonColor:'success',
    hideOkBtn:false,
    autoclose:true
});



const dialog = ref(false);
const dialogName = ref("");
const dialogIcon = ref("");


const openDialog = (name:string = "", icon:string = "mdi-info") =>
{
    dialogName.value = name;
    dialogIcon.value = icon;

    dialog.value = true;
}

const closeDialog = () =>
{
    dialogName.value = null!;
    dialogIcon.value = null!;

    dialog.value = false;
}

const clickButtons = (val:boolean) =>
{
    emit('confirm', val);
    if (props.autoclose) dialog.value = false;
}

defineExpose({ openDialog, closeDialog });
</script>

<template>
    <v-dialog v-model="dialog" :max-width="props.maxWidth" :style="props.additionalStyle">
      <v-card
        :min-width="props.minWidth"
        :width="props.width"
        :prepend-icon="dialogIcon"
        :title="dialogName"
      >
      <Container padding="1rem">
        <slot />
      </Container>
        <template v-slot:actions>
          <div class="d-flex justify-space-between">
            <v-btn
                class="ms-auto"
                text="Close"
                @click="clickButtons(false)"
            />
            <v-btn
                v-if="!hideOkBtn"
                class="ms-auto"
                :text="okButton"
                :color="props.okButtonColor"
                @click="clickButtons(true)"
            />
            <slot name="actions" />
          </div>
        </template>
      </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
</style>
