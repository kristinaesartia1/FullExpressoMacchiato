<script setup lang="ts">
import { UI } from "@/_CONFIGS";
import { VuetifyVariants } from "@/types/theme.types";
import { SelectOption } from "utils-stuff";
import { Ref, onMounted, ref } from "vue";

// --- PARAMETERS
const emits = defineEmits(["change", "input"]);
const props = withDefaults(defineProps<{
  label: string
  allOptions: SelectOption[]
  value?: SelectOption[]
  disabled?: boolean
  density?: "compact" | "default" | "comfortable"
  hideDetails?: boolean
  variant?:VuetifyVariants
  inputClass?: string
  inputId?: string
}>(), {
	density: UI.InputDensity,
	hideDetails: true,
	inputClass: "",
	variant: UI.InputVariant,
	inputId: null!,
	disabled: false
});


// --- DATA
const originalIds: Ref<string[]> = ref([]);
const data: Ref<string[]> = ref([]);


// --- LIFECYCLE
onMounted(() => {
	originalIds.value = props.value?.map((x) => x.id) ?? [];
	data.value = props.value?.map((x) => x.id) ?? [];
});



// --- EXPOSING
const getAddedRemovedDifference = (): { addedIds: string[]; removedIds: string[] } => {
	if (props.disabled) return { addedIds: [], removedIds: [] };

	const currentValuesIds = data.value ?? [];
	const addedIds = currentValuesIds.filter((x) => !originalIds.value.includes(x));
	const removedIds = originalIds.value.filter((x) => !currentValuesIds.includes(x));

	return { addedIds, removedIds };
};

const getCurrentValue = () => data.value;
const setInitialValue = (value: string[]) => {
	originalIds.value = data.value;
	data.value = value;
};
const resetValue = () => {
	data.value = originalIds.value;
};

defineExpose({ getAddedRemovedDifference, resetValue, getCurrentValue, setInitialValue });
</script>

<template>
	<v-select
		:id="props.inputId || props.label"
		v-model="data"
		:class="`body-input-multiselect ${inputClass}`"
		:variant="props.variant"
		:label="props.label"
		:density="props.density"
		:items="props.allOptions"
		item-title="text"
		item-value="id"
		:hide-details="props.hideDetails"
		:disabled="props.disabled"
		multiple
		@change="(x: unknown) => emits('change', x)"
		@input="(x: unknown) => emits('input', x)"
	/>
</template>

<style lang="scss" scoped></style>
