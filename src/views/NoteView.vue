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
const currentNoteTodos = store.getTodosByName(currentNote.todos);
const editTodo = () => {
  console.log('fgdgf');
};
</script>

<template>
  <div class="pr-4 container">
    <div class="h-full flex items-start bg-gray-100 p-8">
      <div class="flex-grow">
        <div class="flex flex-row justify-between border-b">
          <h1 class="text-3xl pl-2 font-medium text-gray-900 mb-6">
            {{ currentNote.name }}
          </h1>
          <div class="flex flex-row justify-between">
            <SaveSVG
              class="svg-title text-green-500 cursor-pointer mr-4 opacity-50 hover:opacity-100"
            />
            <UndoSVG
              class="svg-title cursor-pointer mr-4 opacity-50 hover:opacity-100"
            />
            <RemoveSVG
              class="svg-title text-red-500 cursor-pointer opacity-50 hover:opacity-100"
            />
          </div>
        </div>
        <div
          class="flex justify-between mb-4 mt-4 pt-2"
          v-for="(todo, id) in currentNoteTodos"
          :key="id"
        >
          <div>
            <p
              class="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
            >
              {{ todo }}
            </p>
          </div>
          <div class="flex flex-row">
            <ConfirmSVG
              class="svg-todo cursor-pointer mr-4 opacity-50 hover:opacity-100"
              @click.prevent="markAsDone(todo)"
            />
            <EditSVG
              class="svg-todo cursor-pointer mr-4 opacity-50 hover:opacity-100"
              @click.prevent="editTodo(todo)"
            />
            <DeleteSVG
              class="svg-todo cursor-pointer opacity-50 hover:opacity-100"
              @click.prevent="removeTodo(todo)"
            />
          </div>
        </div>
        <div class="flex flex-row justify-end">
          <button
            type="button"
            class="text-red-700 font-medium rounded-lg text-sm pt-2 mt-2"
          >
            Отменить редактирование
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.svg-todo {
  width: 20px;
  height: 20px;
}
.svg-title {
  width: 25px;
  height: 25px;
}
</style>
