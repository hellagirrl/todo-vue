export default {
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
  clearCompletedTodos() {
    this.currentNote.todos = this.currentNote.todos.filter((todo) => !todo.completed);
  },
};
