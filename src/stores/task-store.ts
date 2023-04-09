// stores/counter.js
import type { Task, TaskState } from '@/@types'
import { defineStore } from 'pinia'

export const withTaskStore = defineStore('task', {
  state: () =>
    ({
      count: 0,
      tasks: [
        {
          id: '1',
          title: 'This task is completed',
          completed: true
        },
        {
          id: '2',
          title: 'This is another task',
          completed: false
        },
        {
          id: '3',
          title: 'This is a task. I am just testing it',
          completed: false
        },
        {
          id: '4',
          title: 'This is a task',
          completed: false
        }
      ]
    } as TaskState),

  getters: {
    numberOfTaskNotCompleted(): number {
      return this.tasks.filter((task) => !task.completed).length
    }
  },

  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },

    addTask(task: Task) {
      this.tasks.unshift(task)
    },

    editTask(id: string | number, title: string) {
      const task = this.tasks.find((task) => task.id === id)
      if (task && !task.completed) {
        console.log('task', task)
        task.title = title
      } else {
        console.log('task is completed')
      }
    },

    removeTask(id: string | number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },

    toggleTask(id: string | number) {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.completed = !task.completed
      }
    }
  },

  persist: true
})
