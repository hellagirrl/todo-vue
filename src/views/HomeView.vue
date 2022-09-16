<script setup>
import { reactive, ref } from 'vue';
import NoteListComponent from '../components/notes/NoteListComponent.vue';
import { useUserStore } from '../stores';
const store = useUserStore();

const noteName = ref('');
const listOfTodos = ref('');

function addNewNote() {
  if (noteName.value.trim().length && listOfTodos.value.trim().length) {
    const noteToAdd = reactive({
      name: noteName.value,
      todos: listOfTodos.value.split(', '),
    });
    store.addNote(noteToAdd);
  }

  noteName.value = '';
  listOfTodos.value = '';
}
</script>

<template>
  <div class="container">
    <form
      @submit.prevent="addNewNote()"
      class="flex flex-row justify-between mr-4"
    >
      <input
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-8"
        id="note"
        type="text"
        v-model="noteName"
        placeholder="Название заметки"
      />
      <input
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-8"
        id="todos"
        type="text"
        v-model="listOfTodos"
        @keyup.enter="addNewNote()"
        placeholder="Задачи"
      />
      <button
        class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        @click="addNewNote()"
      >
        Добавить
      </button>
    </form>
    <NoteListComponent />
  </div>
</template>
