<script setup>
import { computed, ref } from 'vue';
import { useNoteStore } from '@/stores/index.js';
import { uuid } from 'vue-uuid';
import AddSVG from '@/assets/icons/add.svg';
import DeleteSVG from '@/assets/icons/delete.svg';

const store = useNoteStore();

const showTodoInput = ref(false);
const todoName = ref('');
const todoFilter = computed(() => store.getCurrentFilter);
const filteredTodos = computed(() => {
  switch (todoFilter.value) {
    case 'Active': return store.getActiveCurrentTodos;
    case 'Completed': return store.getCompletedCurrentTodos;

    default: return store.getAllCurrentTodos;
  }
});

const removeTodo = (id) => {
  store.removeTodo(id);
};

const addNewTodo = () => {
  if (!todoName.value.trim()) return;
  store.currentNote.todos.push({ id: uuid.v1(), name: todoName.value, completed: false });
  todoName.value = '';
  showTodoInput.value = false;
};

const markAsDone = (id) => {
  const todo = store.currentNote.todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const undoTodoAddition = () => {
  todoName.value = null;
  showTodoInput.value = false;
};

const handleTodoInput = (id, e) => {
  const newTodoName = e.target.textContent;
  store.updateEntityName(id, newTodoName, 'todo');
};
</script>

<template>
  <div class="mb-4">
    <div
      class="flex justify-between mb-4 mt-4 pt-2 border-b pb-4"
      v-for="todo in filteredTodos"
      :key="todo.id"
    >
      <div class="flex flex-row items-center">
        <input
          id="bordered-checkbox-1"
          type="checkbox"
          v-model="todo.completed"
          name="bordered-checkbox"
          class="w-4 h-4 cursor-pointer"
          @input="markAsDone(todo.id)"
        />
        <p
          contenteditable
          class="ml-2 text-md text-gray-900"
          @blur="handleTodoInput(todo.id, $event)"
          :class="[todo.completed ? 'line-through' : '']"
        >
          {{ todo.name }}
        </p>
      </div>
      <div class="flex flex-row">
        <DeleteSVG
          class="svg-todo cursor-pointer opacity-50 hover:opacity-100"
          @click="removeTodo(todo.id)"
        />
      </div>
    </div>

    <button
      type="button"
      class="my-2"
      v-if="!showTodoInput"
      @click="showTodoInput = true"
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
</style>
