<script setup lang="ts">
import { UI } from "@/_CONFIGS";
import { VuetifyVariantsBtns } from '@/types/theme.types';

const emits = defineEmits(["onClick"]);

const props = withDefaults(defineProps<{
  pIcon?: string
  aIcon?: string
  size?: "x-small" | "small" | undefined | "large" | "x-large"
  variant?:VuetifyVariantsBtns
  color?: string
  disabled?: boolean
  density?: "comfortable" | "default" | "compact"
  buttonClass?: string
  text?: string,
  fullIcon?:string
  fixedStyle:string
}>(), {
	size: undefined,
	variant: UI.ButtonsVariant,
	color: "success",
	disabled: false,
	density: "comfortable"
});
</script>

<template>
	<v-btn
		:size="props.size"
		:density="props.density"
		:variant="props.variant"
		:color="props.color"
		:class="props.buttonClass"
		:text="props.text"
		:prepend-icon="props.pIcon"
		:append-icon="props.aIcon"
		:icon="props.fullIcon"
        :style="`position: fixed; z-index: 100000; ${props.fixedStyle}`"
		@click="emits('onClick')"
	/>
</template>

<style lang="scss" scoped></style>
