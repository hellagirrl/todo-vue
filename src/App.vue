<script setup>
import { RouterView } from 'vue-router';
import TheHeaderComponent from './components/TheHeaderComponent.vue';
import TheFooterComponent from './components/TheFooterComponent.vue';
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
