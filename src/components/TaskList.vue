<script setup lang="ts">
import { AppText, AppBtn, AppLoading } from './ui'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { withTaskStore } from '@/stores/task-store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { notify } from 'notiwind'
import { PlusIcon } from '@heroicons/vue/24/solid'
import type { Task } from '@/@types'

const isLoading = ref<boolean>(false)
const task = ref<string>('')
const isShowInput = ref<boolean>(false)
const taskId = ref<string | number>('')

const { getTasks, editTask, removeTask, toggleTask } = withTaskStore()

await getTasks()
const { tasks, loading } = storeToRefs(withTaskStore())
const index = ref<number>(0)

const toggleInput = () => {
  isShowInput.value = !isShowInput.value
}

const openEditTaskModal = (singleTask: Task) => {
  if (singleTask.completed) return

  isShowInput.value = true
  task.value = singleTask.title
  taskId.value = singleTask.id as string
}

const onEditTask = async () => {
  isLoading.value = true

  if (task.value === '') {
    notify({
      group: 'error',
      text: 'Task cannot be empty',
      title: 'error'
    })

    isLoading.value = false

    return
  }

  // add task to store (edit task)
  await editTask(taskId.value, task.value)
  notify({
    group: 'success',
    text: 'Task edited successfully',
    title: 'success'
  })

  isLoading.value = false
  task.value = ''
  isShowInput.value = false
}

const onRemoveTask = async (id: string | number) => {
  index.value = id as number
  await removeTask(id)

  notify({
    group: 'error',
    text: 'Task removed successfully',
    title: 'error'
  })
}

const onToggleTask = async (task: Task) => {
  // index.value = id as number
  try {
    await toggleTask(task.id as string)
    if (task.completed) {
      notify({
        group: 'success',
        text: 'Win win! Task completed successfully',
        title: 'success'
      })
    } else {
      notify({
        group: 'error',
        text: 'Task status changed to incomplete',
        title: 'error'
      })
    }
  } catch (error) {
    notify({
      group: 'error',
      text: 'Status cannot be changed' + error,
      title: 'error'
    })
  }
}
</script>

<template>
  <div class="mt-3" v-auto-animate>
    <div
      class="flex gap-x-2 items-center"
      :class="[task.completed ? 'cursor-not-allowed' : 'cursor-pointer']"
      v-for="task in tasks"
      :key="task.id"
      @click="openEditTaskModal(task)"
    >
      <AppLoading size="w-4 h-4" v-if="task.id === index && loading" />
      <TrashIcon
        class="h-4 w-4 cursor-pointer text-red-400"
        @click.stop="onRemoveTask(task.id as string)"
        v-else
      />
      <input
        type="checkbox"
        class="task-checkbox"
        data-theme="dark"
        :checked="task.completed"
        @click.stop="onToggleTask(task)"
      />
      <AppText
        tag="p"
        :decor="task.completed ? 'line-through' : 'no-underline'"
        :color="task.completed ? 'neutral-200' : 'black'"
        size="lg"
      >
        {{ task.title }}
      </AppText>
    </div>
  </div>

  <div class="flex justify-center">
    <!-- Put this part before </body> tag -->
    <div class="modal" v-show="isShowInput" @click.stop="toggleInput">
      <div class="modal-box" @click.stop>
        <div class="flex items-center gap-x-2 my-4">
          <!-- <input type="checkbox" checked class="task-checkbox" data-theme="dark" /> -->
          <input
            type="text"
            placeholder="Add new task"
            v-model="task"
            :disabled="isLoading"
            class="edit-task__input"
          />
          <AppBtn
            text="Add Task"
            color="purple"
            size="sm"
            :loading="isLoading"
            rounded
            @click="onEditTask"
          >
            <PlusIcon class="h-4 w-4" v-show="!isLoading" />
          </AppBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/mixins/checkbox';

.task-checkbox {
  @apply checkbox bg-transparent w-4 h-4;
  @include custom-checkbox(203 83% 52%);
}
.edit-task__input {
  @apply input w-full focus:outline-none focus:outline-0 focus:border-0 focus:border-b focus:border-b-purple-400;
}
.modal {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.25s ease, visibility 0.25s ease;
  pointer-events: auto;
}
</style>
