export default {
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
};
