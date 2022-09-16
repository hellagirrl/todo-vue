<script setup>
import NoteItemComponent from '../components/NoteItemComponent.vue';
import { useUserStore } from '../stores/index.js';
const store = useUserStore();

const notes = store.notes;
</script>

<template>
  <section class="lg:flex flex-row flex-wrap">
    <NoteItemComponent v-for="(note, idx) in notes" :key="idx" :note="note" />
  </section>
</template>
