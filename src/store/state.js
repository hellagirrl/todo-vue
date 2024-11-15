export const state = () => ({
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
});
