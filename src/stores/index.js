import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      notes: [
        {
          id: '1',
          name: 'Make A List',
          todos: [
            { name: 'Create', completed: false },
            { name: 'Edit', completed: false },
          ],
        },
        {
          id: '2',
          name: 'Second',
          todos: [
            { name: 'Todo1', completed: false },
            { name: 'Todo2', completed: false },
          ],
        },
        {
          id: '3',
          name: 'Third',
          todos: [
            { name: 'Todo1', completed: false },
            { name: 'Todo2', completed: false },
          ],
        },
        {
          id: '4',
          name: 'Fourth',
          todos: [
            { name: 'Todo1', completed: false },
            { name: 'Todo2', completed: false },
          ],
        },
      ],
    };
  },
  getters: {
    doubleCount: (state) => state.count * 2,
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
      let index = this.notes.indexOf(noteToRemove);
      this.notes.splice(index, 1);
    },
  },
});
