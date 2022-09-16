import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      notes: [
        {
          name: 'Make A List',
          todos: ['Create', 'Edit'],
        },
        {
          name: 'Second',
          todos: ['Create', 'Edit'],
        },
        {
          name: 'Third',
          todos: ['Create', 'Edit'],
        },
        {
          name: 'Fourth',
          todos: ['Create', 'Edit'],
        },
      ],
    };
  },
  getters: {
    getSpecificNote: (state) => {
      return (noteName) =>
        state.notes.find((note) => note.name.toLowerCase() == noteName);
    },
  },
  actions: {
    addNote(newNote) {
      this.notes.push(newNote);
    },
    removeNote(noteToRemove) {
      this.notes = this.notes.filter((note) => note != noteToRemove);
    },
  },
});
