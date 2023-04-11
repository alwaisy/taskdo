<script setup lang="ts">
import { ref } from 'vue'
import { AppText, AppBtn } from './ui'
import { PlusCircleIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { notify } from 'notiwind'
import { withTaskStore } from '@/stores/task-store'
import { nanoid } from 'nanoid'
import { storeToRefs } from 'pinia'

const isLoading = ref<boolean>(false)
const task = ref<string>('')
const isShowInput = ref<boolean>(false)

const { loading } = storeToRefs(withTaskStore())
const { addTask } = withTaskStore()

const toggleInput = () => {
  isShowInput.value = !isShowInput.value

  console.log(isShowInput.value, 'dialog was closed')
}

const onAddTask = async () => {
  if (task.value === '') {
    notify({
      group: 'error',
      text: 'Please enter a task',
      title: 'error'
    })

    return
  }

  try {
    await addTask({
      // taskId: nanoid(),
      title: task.value,
      completed: false
    })
    task.value = ''
    console.log('task added')
    notify({
      group: 'success',
      text: 'Task added successfully',
      title: 'success'
    })
    isShowInput.value = false
  } catch (error) {
    // task.value = ''
    isShowInput.value = true

    console.log(error)
  }
}
</script>

<template>
  <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleInput">
    <PlusCircleIcon class="h-6 w-6 text-purple-400" />
    <AppText tag="p" size="lg" weight="bold" color="purple-400"> Add New Task </AppText>
  </div>

  <!-- add task input -->

  <Teleport to="body">
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
              :disabled="loading"
              class="add-task__input"
            />
            <AppBtn
              text="Add Task"
              color="purple"
              size="sm"
              :loading="loading"
              rounded
              @click="onAddTask"
            >
              <PlusIcon class="h-4 w-4" v-show="!loading" />
            </AppBtn>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.add-task__input {
  @apply input w-full focus:outline-none focus:outline-0 focus:border-0 focus:border-b focus:border-b-purple-400;
}

.modal {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.25s ease, visibility 0.25s ease;
  pointer-events: auto;
}
</style>
