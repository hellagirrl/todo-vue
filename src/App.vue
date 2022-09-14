<script setup>
import { RouterView } from 'vue-router';
import TheHeaderComponent from './components/TheHeaderComponent.vue';
import TheFooterComponent from './components/TheFooterComponent.vue';
</script>

<template>
  <TheHeaderComponent />

  <RouterView />

  <TheFooterComponent />
</template>

<style scoped></style>
