<script setup lang="ts">
import Container from '@/components/Container.vue';
import IconButton from '@/components/formComponents/IconButton.vue';
import Sidebar from '@/components/layoutComponents/Sidebar.vue';
import { CustomPathMeta } from '@/types/routes.types';
import { Cazzios } from '@/utils/axios.utils';
import { useRoute } from 'vue-router';


const route = useRoute();

</script>

<template>
    <Sidebar v-if="Cazzios.isAuth"/>
    <Container
      v-if="Cazzios.isAuth"
      :wrapper-min-height="(route.meta as CustomPathMeta).containerProps?.wrapperMinHeight ?? '100vh'"
      :wrapper-height="(route.meta as CustomPathMeta).containerProps?.wrapperHeight"
      :flex-min-height="(route.meta as CustomPathMeta).containerProps?.flexMinHeight"
      :flex-height="(route.meta as CustomPathMeta).containerProps?.flexHeight"
      :flex-column="(route.meta as CustomPathMeta).containerProps?.flexColumn"
      :additional-flex-style="(route.meta as CustomPathMeta).containerProps?.additionalFlexStyle"
      padding="1rem 1rem 1rem calc(56px + 1rem)"
    >
      <div class="d-flex justify-space-between flex-wrap w-100 align-center">
          <h1>{{ route.name }}</h1>
          <div v-if="((route.meta as CustomPathMeta)?.slotButtons?.length ?? 0) > 0" class="d-flex" style="gap: 10px;">
            <IconButton
              v-for="(btn, _i) in (route.meta as CustomPathMeta).slotButtons!"
              :a-icon="btn.aIcon"
              :p-icon="btn.pIcon"
              :icon="btn.icon"
              :text="btn.label"
              @on-click="btn.onClick"
            />
          </div>
      </div>
      <v-divider class="w-100"/>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </Container>
    <div v-if="!Cazzios.isAuth"> Unauthorizifooid </div>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
