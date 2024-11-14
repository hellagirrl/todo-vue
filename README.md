## About

A simple To-Do App made with Vue 3 Composition Api, Pinia, Vite and Tailwind.
LocalStorage is used as databse.

## What you can do with it:

- Add a Note with To-Dos
- Delete Note from The Main Page ('Delete' button) or Note View Page (the 'Trash' icon)
- Add New To-Dos to The Note
- Mark To-Dos as done / not done
- Save Changes on The Note (green 'check' button)
  If you just leave / refresh the page changes won't be saved.

## What to add:

- Debounce on Input (for contenteditable implementation)
- Undo / redo (https://vuejs-course.com/blog/immutability-implementing-undo-and-redo)

! **GitHub doesn't support SPA so that's why on page refresh (in NoteView) app crashes. It doesn't happen if you run the project locally, but it's fixable as well** !

## Installation

To check The Project Yourself, follow these steps:

1. Clone The Repo
1.1. Optionally create `nodeenv` environment to not install all of this globally
2. Open Cloned Folder in Your IDE and Type In The Terminal `npm install`
3. Run `npm run dev`
