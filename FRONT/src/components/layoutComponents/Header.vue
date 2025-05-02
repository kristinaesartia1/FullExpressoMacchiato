<script setup lang="ts">
import BgImage from "@/assets/BgImage.jpg";
import { useDisplay } from "vuetify";

const emits = defineEmits(["openSidebar"]);
const { mdAndDown } = useDisplay();

</script>


<template>
	<v-app-bar
		color="rgb(18,18,18)"
		:height="60"
		id="header"
		:image="BgImage"
	>
		<v-container class="d-flex align-center justify-space-between" fluid>
			<div class="d-flex align-center">
				<v-icon v-if="mdAndDown" icon="mdi-menu" class="me-3" style="cursor:pointer;" @click="emits('openSidebar')"/>
				<h1>Data extractor</h1>
			</div>
			<div>
				<!-- <v-menu>
					<template v-slot:activator="{ props }">
						<v-btn
							color="white"
							v-bind="props"
							icon="mdi-cog"
							size="small"
						/>
					</template>
					<v-list>
						<v-list-item :value="1" @click.stop="logout">
							<v-list-item-title> LOGOUT </v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu> -->
			</div>
		</v-container>
	</v-app-bar>
</template>

<style lang="scss">
.v-toolbar#header {
    /* position: fixed !important;
    box-shadow: none !important;
    transition: 500ms ease;
    transition-property: color background-color height; */

	.v-toolbar__image {
		opacity: 0.1;
	}
}
</style>
