<script setup>
import NoteItemComponent from './NoteItemComponent.vue';
import { useUserStore } from '@/stores/index.js';
import { computed } from 'vue';
const store = useUserStore();

const notes = computed(() => store.getNotes);
</script>

<template>
  <section class="lg:flex flex-row flex-wrap">
    <NoteItemComponent v-for="(note, idx) in notes" :key="idx" :note="note" />
  </section>
</template>
