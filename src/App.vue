<script setup>
import { RouterView } from 'vue-router';
import TheHeaderComponent from './components/layouts/TheHeaderComponent.vue';
import TheFooterComponent from './components/layouts/TheFooterComponent.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeaderComponent />

    <main class="flex-grow pb-8">
      <RouterView />
    </main>

    <TheFooterComponent />
  </div>
</template>

<style scoped></style>
