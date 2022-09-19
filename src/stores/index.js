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
        // {
        //   name: 'Check If A Bag Is Packed',
        //   todos: [
        //     { name: 'Ask Mom To Pack Her Stuff', completed: false },
        //     {
        //       name: 'Check If I Packed All I Needed In My List',
        //       completed: false,
        //     },
        //   ],
        // },
        // {
        //   name: 'Read 2 Books This Month',
        //   todos: [
        //     { name: 'Set Up A Task Tracker', completed: false },
        //     { name: 'Decide On What Days Am I Gonna Read', completed: false },
        //     { name: 'Choose What Books To Read', completed: false },
        //   ],
        // },
        // {
        //   name: 'Make A Course Paper By The End of The Month',
        //   todos: [
        //     { name: 'Text My Supervisor', completed: false },
        //     { name: 'Ask For A Task', completed: false },
        //     { name: 'Write an Intro', completed: false },
        //     { name: 'Check cyberlenika resources', completed: false },
        //   ],
        // },
      ],
    };
  },
  getters: {
    loadNotes: (state) => {
      if (localStorage.getItem('notes')) {
        let usersNotes = JSON.parse(localStorage.getItem('notes'));
        return usersNotes.length
          ? (state.notes = [...usersNotes])
          : state.notes;
      }
    },
    getSpecificNoteById: (state) => {
      return (id) => state.notes.find((note) => note.id == id);
    },
    getSpecificNote: (state) => {
      return (noteName) =>
        state.notes.find((note) => note.name.toLowerCase() == noteName);
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
      console.log(currentNote);
      console.log(noteToSave);

      Object.assign(currentNote, noteToSave);
    },
  },
});
