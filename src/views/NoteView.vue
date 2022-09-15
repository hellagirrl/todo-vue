<script setup>
import { useUserStore } from '../stores/index.js';
import { useRoute } from 'vue-router';
import DeleteSVG from '../assets/icons/delete.svg';
import ConfirmSVG from '../assets/icons/confirm.svg';
import EditSVG from '../assets/icons/edit.svg';
import SaveSVG from '../assets/icons/save.svg';
import UndoSVG from '../assets/icons/undo.svg';
import RemoveSVG from '../assets/icons/remove.svg';

const store = useUserStore();

const route = useRoute();
const currentNote = store.getSpecificNote(route.params.name);
const editTodo = () => {
  console.log('fgdgf');
};
</script>

<template>
  <div class="pt-8 pr-4 container">
    <div class="h-full flex items-start bg-gray-100 p-8">
      <div class="flex-grow">
        <div class="flex flex-row justify-between">
          <h1 class="text-3xl pl-2 font-medium text-gray-900 mb-3 text-center">
            {{ currentNote.name }}
          </h1>
          <div class="flex flex-row justify-between">
            <SaveSVG class="mr-4" />
            <UndoSVG class="mr-4" />
            <RemoveSVG />
          </div>
        </div>
        <div
          class="flex justify-between mb-4"
          v-for="(todo, id) in currentNote.todos"
          :key="id"
        >
          <div>
            <p
              class="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              {{ todo.name }}
            </p>
          </div>
          <div class="flex flex-row">
            <ConfirmSVG
              class="cursor-pointer mr-2"
              @click.prevent="markAsDone(todo)"
            />
            <EditSVG
              class="cursor-pointer mr-2"
              @click.prevent="editTodo(todo)"
            />
            <DeleteSVG
              class="cursor-pointer"
              @click.prevent="removeTodo(todo)"
            />
          </div>
        </div>
        <div class="flex flex-row justify-end">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mt-2 mr-2 mb-2"
          >
            Сохранить
          </button>
          <button
            type="button"
            class="text-red-700 font-medium rounded-lg text-sm px-5 py-2 mt-2 mb-2"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
