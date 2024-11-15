<script setup>
import { computed } from 'vue';
import { useNoteStore } from '@/store/index.js';

const store = useNoteStore();

const filters = ['All', 'Active', 'Completed'];
const todoFilter = computed(() => store.getCurrentFilter);
const unfinishedTodos = computed(() => store.getActiveCurrentTodos.length);
</script>

<template>
  <div>
    <button
      type="button"
      @click="store.clearCompletedTodos"
      class="px-4 py-2 ml-2 font-medium text-slate-500 rounded-lg transition duration-300 ease-in-out hover:shadow-lg"
    >
      Clear all completed
    </button>

    <button
      type="button"
      v-for="filterType in filters"
      :key="filterType"
      @click="store.setFilter(filterType)"
      :class="{
          'bg-[#7192BE] text-white': filterType === 'All' && todoFilter === 'All',
          'bg-[#32936F] text-white': filterType === 'Active' && todoFilter === 'Active',
          'bg-[#941C2F] text-white': filterType === 'Completed' && todoFilter === 'Completed',
      }"
      class="px-4 py-2 ml-2 font-medium rounded-lg transition duration-300 ease-in-out hover:shadow-lg"
    >
      {{ filterType }}

      <span v-if="filterType === 'Active' && !!unfinishedTodos">({{ unfinishedTodos }})</span>
    </button>
  </div>
</template>
