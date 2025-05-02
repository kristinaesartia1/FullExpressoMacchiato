<script setup lang="ts">
import { ContainerProps } from '@/types/routes.types';
import { StyleValue } from 'vue';


const props = withDefaults(defineProps<ContainerProps>(), {
	padding: '0',
	flexColumn: false
});

const getFlexStyle = () =>
{
	const additionalStyle = props.additionalFlexStyle ?? {};

	return {
		...additionalStyle,
		display: 'flex',
		flexDirection: props.flexColumn ? 'column' : 'row',
		flexWrap: props.flexColumn ? 'nowrap' : 'wrap',
		position: 'relative',
		width: '100%',
		minHeight: props.flexMinHeight,
		height: props.flexHeight,
	} as StyleValue;
}
</script>

<template>
	<div :style="{
		padding: props.padding,
		minHeight: props.wrapperMinHeight,
		width: '100%',
		height: props.wrapperHeight
	}">
		<div :style="getFlexStyle()">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
