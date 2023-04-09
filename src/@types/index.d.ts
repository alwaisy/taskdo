export interface Task {
  id: string | number
  title: string
  completed: boolean
}

export interface TaskState {
  count: number
  tasks: Task[]
}
