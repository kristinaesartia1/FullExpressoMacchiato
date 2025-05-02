<script setup lang="ts">
import BgImage from "@/assets/BgImage.jpg";
import Container from '@/components/Container.vue';

</script>

<template>
    <Container
      id="mainContainer"
      wrapper-min-height="100vh"
      wrapper-height="100vh"
      flex-min-height="100vh"
      flex-height="100vh"
      :flex-column="false"
      padding="0"
      :additional-flex-style="{ overflow: 'hidden' }"
    >
    <img :src="BgImage" class="bg-image">
      <div class="h-100 w-100 d-flex justify-center align-center" id="aboveLayer">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </div>
    </Container>
</template>

<style lang="scss">
#mainContainer { background-color: #505050;}
#aboveLayer { position: relative; z-index: 2 }
.bg-image {
  background-color: black;
  position: absolute;
  inset: 0;
  object-fit: cover;
  opacity: 0.2;
  z-index: 0;
  min-width: 100%;
  min-height: 100%;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
