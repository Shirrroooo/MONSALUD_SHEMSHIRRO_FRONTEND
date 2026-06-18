import { defineStore } from 'pinia'
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, name: 'Day 1 - Front-end Training', done: true, dueDate: '2026-06-15' },
      { id: 2, name: 'Day 2 - Front-end Training', done: true, dueDate: '2026-06-16' },
      { id: 3, name: 'Day 3 - Front-end Training', done: false, dueDate: '2026-06-17' },
    ]
  })
})