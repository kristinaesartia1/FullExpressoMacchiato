<script setup lang="ts" generic="OptionKey, OptionValue">
import { UI } from "@/_CONFIGS";
import { VuetifyVariants } from "@/types/theme.types";
import { SelectOption } from "utils-stuff";
import { ref, Ref } from "vue";


// --- PARAMETERS
const emits = defineEmits(["change", "input"]);
const props = withDefaults(defineProps<{
  value: OptionKey
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

// --- DATA
const currentValue: Ref = ref(props.value);
</script>

<template>
	<v-select
		:id="props.inputId"
		:model-value="currentValue"
		:class="`body-input-multiselect ${inputClass}`"
		:label="props.label"
		:density="props.density"
		:items="props.allOptions"
		item-title="text"
		item-value="id"
		:hide-details="props.hideDetails"
		:disabled="props.disabled"
		:variant="variant"
		@update:model-value="
			(x: OptionKey) => {
				emits('change', x)
				currentValue = x
			}
		"
		@input="(x: unknown) => emits('input', x)"
	/>
</template>

<style lang="scss" scoped></style>
