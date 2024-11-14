<script setup>
import { useRouter } from 'vue-router';
import { useNoteStore } from '@/stores/index.js';
import ConfirmModalComponent from '@/components/ConfirmModalComponent.vue';
import { ref, onUnmounted } from 'vue';

const props = defineProps({
  note: Object,
});

const router = useRouter();
const store = useNoteStore();

onUnmounted(() => store.saveNotes());

const openNote = (note) => {
  router.push({
    name: 'note',
    params: { id: note.id },
  });
};
const getTodos = (todos) => store.getTodosByName(todos).join(', ');

const isModalOpen = ref(false);
const isConfirmed = ref(null);
const modalData = ref(null);

const deleteNote = async (note) => {
  modalData.value = 'note';
  isModalOpen.value = true;
  await new Promise((resolve) => {
    isConfirmed.value = resolve;
  });
  store.removeNote(note);
  isModalOpen.value = false;
  isConfirmed.value = null;
};
</script>

<template>
  <div class="pt-8 pr-4 lg:w-1/3">
    <div class="h-full rounded-md flex flex-grow flex-col items-start bg-gray-100 p-8">
      <h1 class="title-font text-xl font-medium text-gray-900 mb-3">
        {{ props.note.name }}
      </h1>
      <p class="leading-relaxed mb-5 opacity-50 flex-grow">
        {{ getTodos(props.note.todos) }}
      </p>

      <div class="flex flex-row w-full justify-between">
        <button
          @click="openNote(props.note)"
          class="text-blue-500 inline-flex items-center cursor-pointer"
        >
          Check the note
          <svg
            class="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>

        <button
          type="button"
          @click.prevent="deleteNote(props.note.id)"
          class="text-red-700 font-medium rounded-lg text-sm px-5"
        >
          Delete
        </button>
      </div>
    </div>

    <teleport to="body">
      <div v-if="isModalOpen">
        <ConfirmModalComponent
          :modalData="modalData"
          @close="isModalOpen = false"
          :onConfirm="isConfirmed"
        />
      </div>
    </teleport>
  </div>
</template>
