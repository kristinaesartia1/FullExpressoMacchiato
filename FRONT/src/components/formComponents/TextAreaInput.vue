<script setup lang="ts">
import { UI } from "@/_CONFIGS";
import { VuetifyVariants } from "@/types/theme.types";
import { ref } from "vue";

// --- PARAMETERS
const emits = defineEmits(["change", "input", "update:modelValue", "enter"]);
const props = withDefaults(defineProps<{
  label?: string
  rows?: number
  disabled?: boolean
  density?: "compact" | "default" | "comfortable"
  hideDetails?: boolean
  variant?: VuetifyVariants
  inputClass?: string
  inputId?: string
}>(), {
	type: "text",
	density: UI.InputDensity,
	hideDetails: true,
	inputClass: "",
	inputId: null!,
	disabled: false,
	variant: UI.InputVariant
});



const mValue = ref("");
const getValue = () => mValue.value;
const setValue = (newVal:string) =>
{
	mValue.value = newVal;
}


defineExpose({ getValue, setValue });
</script>

<template>
	<v-textarea
		:id="props.inputId || props.label"
		:model-value="mValue"
		:class="`body-input ${props.inputClass}`"
		:rows="props.rows ?? 3"
		:label="props.label"
		:density="props.density"
		:hide-details="props.hideDetails"
		:disabled="props.disabled"
		:variant="variant"
		@update:model-value="(x: unknown) => { emits('update:modelValue', x); emits('change', x); mValue = x as string }"
		@change="(x: unknown) => emits('change', x)"
		@input="(x: unknown) => emits('input', x)"
		@keyup="(e:KeyboardEvent) => { if (e.key === 'Enter') emits('enter', mValue); }"
	/>
</template>

<style lang="scss" scoped>
:deep(textarea.v-field__input) {
	padding: 1.3rem !important;
}
</style>
