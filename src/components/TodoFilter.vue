<script setup>
import { computed } from 'vue';
import { useNoteStore } from '@/stores/index.js';

const store = useNoteStore();

const filters = ['All', 'Active', 'Completed'];
const todoFilter = computed(() => store.getCurrentFilter);
const unfinishedTodos = computed(() => store.getActiveCurrentTodos.length);

const changeFilter = (filterType) => {
  store.setFilter(filterType);
};
</script>

<template>
  <div>
    <button
      type="button"
      v-for="filterType in filters"
      :key="filterType"
      @click="changeFilter(filterType)"
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
