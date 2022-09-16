<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/index.js';

const props = defineProps({
  note: Object,
});

const router = useRouter();
const store = useUserStore();

const openNote = (note) => {
  router.push({
    name: 'note',
    params: { name: note.name.toLowerCase() },
  });
};

function deleteNote(note) {
  store.removeNote(note);
}
</script>

<template>
  <div class="pt-8 pr-4 lg:w-1/3">
    <div class="h-full flex items-start bg-gray-100 p-8">
      <div class="flex-grow pl-6">
        <h1 class="title-font text-xl font-medium text-gray-900 mb-3">
          {{ props.note.name }}
        </h1>
        <p class="leading-relaxed mb-5">
          {{ props.note.todos.join(', ') }}
        </p>
        <div class="flex flex-row justify-between">
          <span
            @click="openNote(props.note)"
            class="text-blue-500 inline-flex items-center cursor-pointer"
            >Далее<svg
              class="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path></svg
          ></span>
          <button
            type="button"
            @click.prevent="deleteNote(props.note)"
            class="text-red-700 font-medium rounded-lg text-sm px-5"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
