<script setup lang="ts">

import { UI } from "@/_CONFIGS";
import { VuetifyVariants } from "@/types/theme.types";
import { Ref, onMounted, ref } from "vue";

// --- PARAMETERS
const emits = defineEmits(["update"]);
const props = withDefaults(defineProps<{
  label: string
  value?: boolean
  disabled?: boolean
  density?: "compact" | "default" | "comfortable"
  hideDetails?: boolean
  variant?:VuetifyVariants
  inputClass?: string
  inputId?: string
}>(),
{
	density: UI.InputDensity,
	hideDetails: true,
	inputClass: "",
	inputId: null!,
	disabled: false,
	variant: UI.InputVariant
});

// --- DATA
const data: Ref<boolean> = ref(false);
onMounted(() => (data.value = props.value ?? false));


// --- EXPOSING
defineExpose({ data });
</script>

<template>
	<v-checkbox
		:id="props.inputId || props.label"
		v-model="data"
		:label="props.label"
		:density="props.density"
		:variant="variant"
		:class="`body-input ${props.inputClass}`"
		:hide-details="props.hideDetails"
		:disabled="props.disabled"
		style="flex: unset"
		@update:model-value="(val:unknown) => emits('update', val)"
	/>
</template>

<style lang="scss" scoped></style>
