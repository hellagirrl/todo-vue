<script setup>
import { onMounted, ref } from 'vue';
import { useNoteStore } from '@/store/index.js';
import { useRouter, useRoute } from 'vue-router';
import ConfirmModal from '@/components/ConfirmModal.vue';
import TodoList from '@/components/TodoList.vue';
import TodoFilter from '@/components/TodoFilter.vue';
import SaveSVG from '@/assets/icons/save.svg';
import RemoveSVG from '@/assets/icons/remove.svg';

const store = useNoteStore();
const router = useRouter();
const route = useRoute();

store.loadNotes();
store.setCurrentNote(route.params.id);

const isModalOpen = ref(false);
const isConfirmed = ref(null);
const modalData = ref(null);

onMounted(() => {
  document.title = store.currentNote.name;
});

const confirmation = () => {
  isModalOpen.value = true;
  return new Promise((resolve) => {
    isConfirmed.value = resolve;
  });
};

const removeNote = async (noteToRemove) => {
  modalData.value = 'note';
  await confirmation().then(() => {
    store.removeNote(noteToRemove.id);
    isModalOpen.value = false;
  });
  router.push('/');
};

const saveNote = (noteToSave) => {
  store.saveNote(noteToSave);
  router.push('/');
};

const undoEditing = async () => {
  modalData.value = null;
  await confirmation();
  isModalOpen.value = false;
  router.push('/');
};

const handleNoteInput = (id, e) => {
  const newNoteName = e.target.textContent;
  store.updateEntityName(id, newNoteName);
};
</script>

<template>
  <div class="px-4 md:container">
    <div class="relative h-full rounded-md flex items-start bg-gray-100 p-8">
      <div class="flex-grow">
        <div class="flex flex-row justify-between border-b">
          <h1
            contenteditable
            @blur="handleNoteInput(store.currentNote.id, $event)"
            class="text-3xl pl-2 font-medium text-gray-900 mb-6"
          >
            {{ store.currentNote.name }}
          </h1>
          <div class="flex flex-row justify-between">
            <SaveSVG
              class="svg-title text-green-500 cursor-pointer mr-4 opacity-50 hover:opacity-100"
              @click="saveNote(store.currentNote)"
            />
            <RemoveSVG
              @click="removeNote(store.currentNote)"
              class="svg-title text-red-500 cursor-pointer opacity-50 hover:opacity-100"
            />
          </div>
        </div>

        <TodoList />

        <div class="flex flex-row justify-end">
          <TodoFilter />

          <button
            type="button"
            class="px-4 py-2 ml-2 font-medium rounded-lg text-[#941C2F]"
            @click="undoEditing"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <teleport to="body">
      <div v-if="isModalOpen">
        <ConfirmModal
          :modalData="modalData"
          @close="isModalOpen = false"
          :onConfirm="isConfirmed"
        />
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.svg-title {
  width: 25px;
  height: 25px;
}
</style>
