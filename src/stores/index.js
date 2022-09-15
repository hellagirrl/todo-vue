import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      notes: [
        {
          id: '1',
          name: 'First',
          todos: ['SDASD', 'DASDS'],
          status: 'completed',
        },
        {
          id: '2',
          name: 'Second',
          todos: ['SDASD', 'DASDS'],
          status: 'completed',
        },
        {
          id: '3',
          name: 'Third',
          todos: ['SDASD', 'DASDS'],
          status: 'completed',
        },
        {
          id: '4',
          name: 'Fourth',
          todos: ['SDASD', 'DASDS'],
          status: 'completed',
        },
      ],
    };
  },
  getters: {
    doubleCount: (state) => state.count * 2,
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
