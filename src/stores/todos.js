import { defineStore } from 'pinia';

export const useTodosStore = defineStore('TodosStore', {
  state: () => {
    return {
      todos: [],
      todo: [],
    };
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    addTodo(newTodo) {
      this.todos.push(newTodo);
    },
    removeNote(todoToRemove) {
      let index = this.todos.indexOf(todoToRemove);
      this.todos.splice(index, 1);
    },
  },
});
