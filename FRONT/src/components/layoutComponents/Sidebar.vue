<script setup lang="ts">
import BgImage from "@/assets/BgImage.jpg";
import { useUserStore } from "@/stores/useUserStore";
import { navigationLinks } from "@/utils/navigations.utils";
import { ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// const props = defineProps<{ isSidebarShown:boolean }>();
const isSidebarShown = ref(true);
const openedGroups:Ref<[]> = ref([]);


const preferences = useUserStore();

const isActive = (title:string, tId?:string) => !tId ? (route.name === title) : (route.name === tId);
</script>

<template>
	<v-navigation-drawer
		color="rgb(18,18,18)"
		v-model="isSidebarShown"
		:rail="true"
		expand-on-hover
		:image="BgImage"
		permanent
		id="sidebar"
	> <!-- https://bestwallpapers.in/wp-content/uploads/2021/07/abstract-fluid-art-colorful-4k-wallpaper-2560x1440.jpg -->

		<v-list class="d-flex justify-content-between">
			<v-list-item
				:subtitle="preferences.email ?? ''"
				:title="preferences.name ?? ''"
				class="w-100"
				:prepend-avatar="`data:image/jpeg;base64,${preferences.image}`"
				@click="router.push('/personalPage')"
			/>
		</v-list>

		<v-divider></v-divider>

		<v-list density="compact" nav :opened="openedGroups" class="flex-grow-1">
			<template v-for="(link, _i) of navigationLinks" :key="`${link.title}${_i}`">
				<v-list-item
					v-if="(link.subLinks?.length ?? 0) === 0"
					link
					:active="isActive(link.title, link.pathName)"
					:prepend-icon="link.icon"
					:title="link.title"
					@click.stop="() => $router.push(link.href!)"
				/>
				<v-list-group v-else :value="link.title"> <!-- :value="link.title" -->
					<template #activator="{ props:listGroupProps }">
						<v-list-item
							density="compact"
							v-bind="listGroupProps"
							:prepend-icon="link.icon"
							:title="link.title"
						/>
					</template>
					<template #default>
						<template v-for="(subLink, _i) of link.subLinks!" :key="`${subLink.title}${_i}`">
							<v-list-item
								v-if="(subLink.subLinks?.length ?? 0) === 0"
								link
								:active="isActive(subLink.title, subLink.pathName)"
								:prepend-icon="subLink.icon"
								:title="subLink.title"
								@click.stop="() => $router.push(subLink.href!)"
								density="compact"
							/>
							<v-list-group v-else :value="subLink.title"> <!-- :value="link.title" -->
								<template #activator="{ props:listGroupProps2 }">
									<v-list-item
										density="compact"
										v-bind="listGroupProps2"
										:prepend-icon="subLink.icon"
										:title="subLink.title"
									/>
								</template>
								<template v-for="(subSubLink, _i) of subLink.subLinks!" :key="`${subSubLink.title}${_i}`">
									<v-list-item
										style="padding-left: 3rem !important;"
										link
										:active="isActive(subSubLink.title, subSubLink.pathName)"

										:title="subSubLink.title"
										@click.stop="() => $router.push(subSubLink.href!)"
										density="compact"
									> <!-- :prepend-icon="subSubLink.icon" -->
										<template #prepend>
											<v-icon size="small" :icon="subSubLink.icon" />
										</template>
									</v-list-item>
								</template>
							</v-list-group>
						</template>
					</template>
				</v-list-group>
			</template>
		</v-list>
	</v-navigation-drawer>
</template>

<style lang="scss">
nav.v-navigation-drawer#sidebar {
	.v-navigation-drawer__img {
		opacity: 0.1 !important;
	}

	.v-navigation-drawer__content {
		display:flex;
		flex-direction: column;
	}

	.v-list-group__items .v-list-item {
		padding-inline-start: 1.5rem !important;
	}
}

</style>
