export interface Task {
  id?: string | number
  title: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

export interface TaskState {
  count: number
  tasks: Task[]
  loading: boolean
  dialog: boolean
}
