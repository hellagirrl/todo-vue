import { defineStore } from 'pinia';

export const useNoteStore = defineStore('noteStore', {
  state: () => {
    return {
      notes: [
        {
          id: 0,
          name: 'Start Marathon Prep',
          todos: [
            {
              id: 0,
              name: 'Set Up A Task Tracker',
              completed: false,
            },
            {
              id: 1,
              name: 'Decide On What Days Am I Gonna Run',
              completed: false,
            },
            {
              id: 2,
              name: 'Choose What Songs To Listen To',
              completed: false,
            },
          ],
        },
      ],
      currentNote: null,
      currentFilter: 'All',
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
    getAllCurrentTodos(state) {
      return state.currentNote ? state.currentNote.todos : [];
    },
    getActiveCurrentTodos: (state) => {
      return state.currentNote ? state.currentNote.todos.filter((todo) => !todo.completed) : [];
    },
    getCompletedCurrentTodos: (state) => {
      return state.currentNote ? state.currentNote.todos.filter((todo) => todo.completed) : [];
    },
    getCurrentFilter: (state) => state.currentFilter,
  },
  actions: {
    setCurrentNote(noteId) {
      this.currentNote = this.notes.find((note) => note.id == noteId);
    },
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
    setFilter(filter) {
      this.currentFilter = filter;
    },
    removeTodo(id) {
      this.currentNote.todos = this.currentNote.todos.filter((todo) => todo.id !== id);
    },
    updateEntityName(id, name, type = 'note') {
      if (type === 'note' && this.currentNote.id === id) {
        this.currentNote.name = name;
        return;
      }

      if (type === 'todo') {
        const todo = this.currentNote.todos.find((todo) => todo.id === id);
        if (todo) {
          todo.name = name;
        }
      }
    },
  },
});
