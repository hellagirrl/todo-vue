<script setup>
import { onMounted, ref } from 'vue';
import { useNoteStore } from '@/stores/index.js';
import { useRouter, useRoute } from 'vue-router';
import ConfirmModalComponent from '@/components/ConfirmModalComponent.vue';
import TodoListComponent from '@/components/notes/TodoListComponent.vue';
import TodoFilterComponent from '@/components/notes/TodoFilterComponent.vue';
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

// TODO: all the code below is for undo & redo [not done yet]

// Creating Deep Copy Object to avoid Reactive changes
// const initialNoteState = JSON.parse(
//   JSON.stringify(store.getSpecificNoteById(route.params.id))
// );

const getField = (e) => {
  let text = e.target.innerText;
  console.log(text, 'text');
};

function updateContent(e, contentType) {
  let newNoteName;
  let todo;
  const inputText = e.target.innerText;
  switch (contentType) {
    case 'noteName':
      newNoteName = inputText;
      console.log(newNoteName, 'inputchange');
      break;
    case 'todo':
      todo = inputText;
      console.log(todo, 'inputchange');
      break;
    default:
      break;
  }
}
</script>

<template>
  <div class="px-4 md:container">
    <div class="relative h-full rounded-md flex items-start bg-gray-100 p-8">
      <div class="flex-grow">
        <div class="flex flex-row justify-between border-b">
          <h1
            contenteditable
            @input="updateContent($event, 'noteName')"
            @click.prevent="getField"
            class="text-3xl pl-2 font-medium text-gray-900 mb-6"
          >
            {{ store.currentNote.name }}
          </h1>
          <div class="flex flex-row justify-between">
            <SaveSVG
              class="svg-title text-green-500 cursor-pointer mr-4 opacity-50 hover:opacity-100"
              @click.prevent="saveNote(store.currentNote)"
            />
            <RemoveSVG
              @click.prevent="removeNote(store.currentNote)"
              class="svg-title text-red-500 cursor-pointer opacity-50 hover:opacity-100"
            />
          </div>
        </div>

        <TodoListComponent />

        <div class="flex flex-row justify-end">
          <TodoFilterComponent />

          <button
            type="button"
            class="px-4 py-2 ml-2 font-medium rounded-lg text-[#941C2F]"
            @click.prevent="undoEditing"
          >
            Cancel
          </button>
        </div>
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

<style scoped>
.svg-title {
  width: 25px;
  height: 25px;
}
</style>
