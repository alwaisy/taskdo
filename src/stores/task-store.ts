// stores/counter.js
import type { Task, TaskState } from '@/@types'
import axios from 'axios'
import { defineStore } from 'pinia'

const api =
  import.meta.env.MODE === 'development'
    ? import.meta.env.APP_API_DEV_SERVER + '/tasks'
    : import.meta.env.APP_API_SERVER + '/tasks'

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
      ],
      loading: false,
      dialog: false // for dialog, but not used
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

    async getTasks(): Promise<Task[]> {
      this.loading = true

      try {
        const { data } = await axios.get(`${api}`)
        this.tasks = data

        // sort tasks by title
        this.tasks.sort((a, b) => {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        })

        this.loading = false
        console.log(this.tasks, data)
      } catch (error) {
        console.log('error from getTasks', error)
        this.loading = false
      }

      return this.tasks
    },

    /* async getTask(id: string | number): Promise<Task | undefined> {
      // const { data } = await axios.get(`${api}/${id}`)

      const task = this.tasks.find((task) => task.id === id)
      const { data } = await axios.get(`${api}/${task?.id}`)

      return data
    }, */

    async addTask(task: Task): Promise<void> {
      this.loading = true
      try {
        console.log('task', task)

        await axios.post(`${api}/new`, task)
        await this.getTasks()

        this.loading = false
        // this.tasks.unshift(task as Task)
      } catch (error) {
        console.log('error, could add task', error)
        this.loading = false
      }
      // this.tasks.unshift(task)
    },

    async editTask(id: string | number, title: string): Promise<void> {
      this.loading = true
      const task = await this.tasks.find((task) => task.id === id)

      try {
        if (task && !task.completed) {
          await axios.put(`${api}/${id}/edit`, { title })
          console.log('task is not completed')
          await this.getTasks()
          this.loading = false
        } else {
          console.log('task is completed')
          this.loading = false
        }
      } catch (error) {
        console.log(error, 'error from editTask')
        this.loading = false
      }
    },

    async removeTask(id: string | number) {
      // this.tasks = this.tasks.filter((task) => task.id !== id)
      console.log('from store -> id', id)
      this.loading = true

      try {
        await axios.delete(`${api}/${id}/delete`)
        this.tasks = this.tasks.filter((task) => task.id !== id)

        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },

    async toggleTask(id: string | number) {
      this.loading = true
      const task = await this.tasks.find((task) => task.id === id)
      if (task) {
        task.completed = !task.completed
      }

      try {
        await axios.put(`${api}/${id}/edit`, { completed: task?.completed })
        this.loading = false
        await this.getTasks()
      } catch (error) {
        console.log(error, 'error from toggleTask')
        this.loading = false
      }
    }
  }

  // persist: true
})
