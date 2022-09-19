import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      notes: [
        {
          id: 0,
          name: 'Start Marathon Prep',
          todos: [
            {
              name: 'Set Up A Task Tracker',
              completed: false,
            },
            {
              name: 'Decide On What Days Am I Gonna Run',
              completed: false,
            },
            {
              name: 'Choose What Songs To Listen To',
              completed: false,
            },
          ],
        },
      ],
    };
  },
  getters: {
    getNotes: (state) => state.notes,
    getSpecificNoteById: (state) => {
      return (id) => state.notes.find((note) => note.id == id);
    },
    getTodosByName: () => {
      return (todos) => todos.map((todo) => todo.name);
    },
  },
  actions: {
    saveNotes() {
      const storageData = JSON.stringify(this.notes);
      localStorage.setItem('notes', storageData);
    },
    loadNotes() {
      if (localStorage.getItem('notes') !== null) {
        let usersNotes = JSON.parse(localStorage.getItem('notes'));
        usersNotes.length ? (this.notes = [...usersNotes]) : this.notes;
      }
    },
    addNote(newNote) {
      this.notes.push(newNote);
      this.saveNotes();
    },
    removeNote(noteIdToRemove) {
      this.notes = this.notes.filter((note) => note.id !== noteIdToRemove);
      this.saveNotes();
    },
    saveNote(noteToSave) {
      const currentNote = this.notes.find((note) => note.id == noteToSave.id);
      Object.assign(currentNote, noteToSave);
      this.saveNotes();
    },
  },
});
