<script setup>
import NoteItem from './NoteItem.vue';
import { useNoteStore } from '@/store/index.js';
import { computed } from 'vue';

const store = useNoteStore();

const notes = computed(() => store.getNotes);
</script>

<template>
  <section class="lg:flex flex-row flex-wrap">
    <NoteItem v-for="(note, idx) in notes" :key="idx" :note="note" />
  </section>
</template>
