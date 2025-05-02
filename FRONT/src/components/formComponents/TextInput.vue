<script setup lang="ts">
import { UI } from "@/_CONFIGS";
import { VuetifyVariants } from "@/types/theme.types";

const emits = defineEmits(["change", "update:modelValue"]);

interface Props {
  label?: string
  modelValue?: string | number | null
  disabled?: boolean
  type?: string
  density?: "compact" | "default" | "comfortable"
  hideDetails?: boolean
  variant?: VuetifyVariants
  inputClass?: string
  inputId?: string,
  color?:string,
  readonly?:boolean
}
const props = withDefaults(defineProps<Props>(), {
	type: "text",
	density: UI.InputDensity,
	hideDetails: true,
	inputClass: "",
	inputId: null!,
	disabled: false,
	variant: UI.InputVariant
});

</script>

<template>
	<v-text-field
		:id="props.inputId || props.label"
		:model-value="modelValue"
		:class="`body-input ${props.inputClass}`"
		:type="props.type"
		:label="props.label"
		:density="props.density"
		:hide-details="props.hideDetails"
		:disabled="props.disabled"
		:variant="variant"
		:color="props.color"
		:readonly="props.readonly"
		@update:model-value="(x: unknown) => { emits('change', x); emits('update:modelValue', x); }"
	/>
</template>

<style lang="scss" scoped></style>
