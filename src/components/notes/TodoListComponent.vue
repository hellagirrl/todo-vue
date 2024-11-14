<script setup>
import { computed, ref } from 'vue';
import { useNoteStore } from '@/stores/index.js';
import AddSVG from '@/assets/icons/add.svg';
import DeleteSVG from '@/assets/icons/delete.svg';

const store = useNoteStore();

const showTodoInput = ref(false);
const todoName = ref('');
const todoFilter = computed(() => store.getCurrentFilter);
const filteredTodos = computed(() => {
  switch (todoFilter.value) {
    case 'Active': return store.currentNote.todos.filter((todo) => !todo.completed);
    case 'Completed': return store.currentNote.todos.filter((todo) => todo.completed);

    default: return store.currentNote.todos;
  }
});

const removeTodo = async (todoToRemove) => {
  store.currentNote.todos.splice(todoToRemove, 1);
};

const addNewTodo = () => {
  if (todoName.value?.length) {
    store.currentNote.todos.push({ name: todoName.value, completed: false });
  }
  todoName.value = null;
  showTodoInput.value = false;
};

const markAsDone = (doneTodo) => {
  const todoToMark = store.currentNote.todos.find(
    (todo) => todo.name === doneTodo
  );
  todoToMark.completed = !todoToMark.completed;
};

const undoTodoAddition = () => {
  todoName.value = null;
  showTodoInput.value = false;
};
</script>

<template>
  <div class="mb-4">
    <div
      class="flex justify-between mb-4 mt-4 pt-2 border-b pb-4"
      v-for="(todo, id) in filteredTodos"
      :key="id"
    >
      <div class="flex flex-row items-center">
        <input
          id="bordered-checkbox-1"
          type="checkbox"
          v-model="todo.completed"
          name="bordered-checkbox"
          class="w-4 h-4 cursor-pointer"
          @input="markAsDone(todo.name)"
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
        <DeleteSVG
          class="svg-todo cursor-pointer opacity-50 hover:opacity-100"
          @click.prevent="removeTodo(id)"
        />
      </div>
    </div>

    <button
      type="button"
      v-if="!showTodoInput"
      @click.prevent="showTodoInput = true"
    >
      <AddSVG class="svg-todo cursor-pointer opacity-50 hover:opacity-100" />
    </button>

    <input
      class="shadow appearance-none border rounded w-full py-2 pl-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 mr-8"
      type="text"
      v-model="todoName"
      placeholder="Add new todo item"
      v-if="showTodoInput"
      @keyup.enter="addNewTodo"
      @blur="undoTodoAddition"
    />
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
