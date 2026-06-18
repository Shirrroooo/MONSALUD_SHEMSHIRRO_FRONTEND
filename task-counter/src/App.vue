<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade-slide" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
