import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      notes: [
        {
          name: 'Make A List',
          todos: [
            { name: 'Create', completed: false },
            { name: 'Edit', completed: false },
          ],
        },
        {
          name: 'Second',
          todos: [
            { name: 'Create', completed: false },
            { name: 'Edit', completed: false },
          ],
        },
        {
          name: 'Third',
          todos: [
            { name: 'Create', completed: false },
            { name: 'Edit', completed: false },
          ],
        },
        {
          name: 'Fourth',
          todos: [
            { name: 'Create', completed: false },
            { name: 'Edit', completed: false },
          ],
        },
      ],
    };
  },
  getters: {
    getNotes: (state) => state.notes,
    getSpecificNote: (state) => {
      return (noteName) =>
        state.notes.find((note) => note.name.toLowerCase() == noteName);
    },
    getTodosByName: () => {
      return (todos) => todos.map((todo) => todo.name);
    },
  },
  actions: {
    addNote(newNote) {
      this.notes.push(newNote);
    },
    removeNote(noteToRemove) {
      this.notes = this.notes.filter((note) => note !== noteToRemove);
    },
  },
});
