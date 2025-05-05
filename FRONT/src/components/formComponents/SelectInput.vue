<script setup lang="ts" generic="OptionKey, OptionValue">
import { UI } from "@/_CONFIGS";
import { VuetifyVariants } from "@/types/theme.types";
import { SelectOption } from "utils-stuff";


// --- PARAMETERS
const emits = defineEmits(["change", "update:modelValue"]);
const props = withDefaults(defineProps<{
  modelValue: OptionKey
  allOptions: SelectOption<OptionKey, OptionValue>[]
  label?: string
  disabled?: boolean
  density?: "compact" | "default" | "comfortable"
  hideDetails?: boolean
  variant?: VuetifyVariants
  inputClass?: string
  inputId?: string
}>(), {
	density: UI.InputDensity,
	hideDetails: true,
	inputClass: "",
	inputId: null!,
	disabled: false,
	variant: UI.InputVariant
});

</script>

<template>
	<v-select
		:id="props.inputId"
		:model-value="modelValue"
		:class="`body-input-multiselect ${inputClass}`"
		:label="props.label"
		:density="props.density"
		:items="props.allOptions"
		item-title="text"
		item-value="id"
		:hide-details="props.hideDetails"
		:disabled="props.disabled"
		:variant="variant"
		@update:model-value="(x: unknown) => { emits('change', x); emits('update:modelValue', x); }"
	/>
</template>

<style lang="scss" scoped></style>
