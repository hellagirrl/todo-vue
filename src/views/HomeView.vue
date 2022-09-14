<script setup>
import NoteListComponent from '../components/NoteListComponent.vue';
import { useUserStore } from '../stores/index.js';
const store = useUserStore();

const count = store.count;
</script>

<template>
  <main>
    <NoteListComponent />
    <div>{{ count }}</div>
  </main>
</template>
