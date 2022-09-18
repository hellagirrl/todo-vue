<script setup>
import { useUserStore } from '../stores/index.js';
import { useRoute } from 'vue-router';
import ConfirmModalComponent from '@/components/ConfirmModalComponent.vue';
import DeleteSVG from '../assets/icons/delete.svg';
import ConfirmSVG from '../assets/icons/confirm.svg';
import SaveSVG from '../assets/icons/save.svg';
import UndoSVG from '../assets/icons/undo.svg';
import RemoveSVG from '../assets/icons/remove.svg';
import RepeatSVG from '../assets/icons/repeat.svg';
import AddSVG from '../assets/icons/add.svg';
import { ref } from 'vue';
// import { computed } from 'vue';

const store = useUserStore();
const route = useRoute();

// current note to return to in case the user decides to undo all the changes
const currentNote = store.getSpecificNote(route.params.name);
// const currentNoteTodos = computed(() =>
//   store.getTodosByName(currentNote.todos)
// );

const getField = (e) => {
  let text = e.target.innerText;
  console.log(text);
};

function updateContent(e, contentType) {
  let newNoteName;
  let todo;
  const inputText = e.target.innerText;
  switch (contentType) {
    case 'noteName':
      newNoteName = inputText;
      console.log(newNoteName);
      break;
    case 'todo':
      todo = inputText;
      console.log(todo);
      break;
    default:
      break;
  }
}

const isModalOpen = ref(false);
const showTodoInput = ref(false);
const todoName = ref('');

const addNewTodo = () => {
  if (todoName.value?.length) {
    currentNote.todos.push({ name: todoName.value, completed: false });
  }
  todoName.value = null;
  showTodoInput.value = false;
};

const removeTodo = (todoToRemove) => {
  currentNote.todos = currentNote.todos.filter(
    (todo) => todo.name != todoToRemove.name
  );
};

const markAsDone = (doneTodo) => {
  const todoToMark = currentNote.todos.find((todo) => todo.name == doneTodo);
  todoToMark.completed = !todoToMark.completed;
};
</script>

<template>
  <div class="container">
    <div class="relative h-full rounded-md flex items-start bg-gray-100 p-8">
      <div class="flex-grow">
        <div class="flex flex-row justify-between border-b">
          <h1
            contenteditable
            @input="updateContent($event, 'noteName')"
            @click.prevent="getField"
            class="text-3xl pl-2 font-medium text-gray-900 mb-6"
          >
            {{ currentNote.name }}
          </h1>
          <div class="flex flex-row justify-between">
            <SaveSVG
              class="svg-title text-green-500 cursor-pointer mr-4 opacity-50 hover:opacity-100"
            />
            <UndoSVG
              class="svg-title cursor-pointer mr-4 opacity-50 hover:opacity-100"
            />
            <RepeatSVG
              class="svg-title cursor-pointer mr-4 opacity-50 hover:opacity-100"
            />
            <RemoveSVG
              class="svg-title text-red-500 cursor-pointer opacity-50 hover:opacity-100"
            />
          </div>
        </div>
        <div
          class="flex justify-between mb-4 mt-4 pt-2 border-b pb-4"
          v-for="(todo, id) in currentNote.todos"
          :key="id"
        >
          <div class="flex flex-row items-center">
            <input
              id="bordered-checkbox-1"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 cursor-pointer"
            />
            <p
              contenteditable
              @input="updateContent($event, 'todo')"
              @click.prevent="getField"
              class="ml-2 text-md text-gray-900"
              :class="[todo.completed ? 'line-through' : '']"
            >
              {{ todo.name }}
            </p>
          </div>
          <div class="flex flex-row">
            <ConfirmSVG
              class="svg-todo cursor-pointer mr-4 opacity-50 hover:opacity-100"
              @click.prevent="markAsDone(todo.name)"
            />
            <DeleteSVG
              class="svg-todo cursor-pointer opacity-50 hover:opacity-100"
              @click.prevent="removeTodo(todo)"
            />
          </div>
        </div>
        <button
          type="button"
          v-if="!showTodoInput"
          @click.prevent="showTodoInput = true"
        >
          <AddSVG
            class="svg-todo cursor-pointer opacity-50 hover:opacity-100"
          />
        </button>
        <input
          required
          class="shadow appearance-none border rounded w-full py-2 pl-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 mr-8"
          type="text"
          v-model="todoName"
          placeholder="Добавьте новую задачу"
          v-if="showTodoInput"
          @keyup.enter="addNewTodo"
        />
        <div class="flex flex-row justify-end">
          <button
            type="button"
            class="text-red-700 font-medium rounded-lg text-sm pt-2 mt-2"
            @click.prevent="isModalOpen = true"
          >
            Отменить редактирование
          </button>
        </div>
      </div>
    </div>
    <teleport to="body">
      <div v-if="isModalOpen">
        <ConfirmModalComponent @close="isModalOpen = false" />
      </div>
    </teleport>
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

<!--
  TODO: 
  - [] Add debounce on input el ?
-->
