<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="py-3 my-3 sm:container text-gray-700">
    <nav>
      <RouterLink
        to="/"
        class="text-sm sm:mr-6 md:text-lg font-semibold hover:text-gray-900"
        >Your Notes</RouterLink
      >
    </nav>
  </header>
</template>

<style></style>
