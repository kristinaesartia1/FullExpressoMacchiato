<script lang="ts" setup>
import { VuetifyThemeVariables } from '@/types/theme.types';
import { utils } from '@/utils/renderer.utils';

interface Props { themeColor?:VuetifyThemeVariables, borders?: boolean, padding?:number, center?:boolean, additionalClass?:string }
const props = withDefaults(defineProps<Props>(), { borders:true, padding:5, center:true });

const getStyle = () =>
{
	let finalString = "";
	if (props.themeColor) finalString += `background-color: rgb(${utils.vueRgbStyle(props.themeColor)});`;
	if (props.borders) finalString += ` border: 1px solid rgb(${utils.vueRgbStyle((props.themeColor ?? 'background') + '-light')})`

	return finalString;
}
</script>

<template>
	<div
		v-if="props.center"
		:class="`w-100 d-flex justify-center pa-${padding} rounded`"
		:style="getStyle()"
	>
		<p class="lead text-disabled"><slot>No data found</slot></p>
	</div>
	<div
		v-else
		:class="`w-100 d-flex flex-wrap pa-${padding} ${props.additionalClass} rounded`"
		:style="getStyle()"
	>
		<slot>No data found</slot>
	</div>
</template>

<style scoped lang="scss"></style>
