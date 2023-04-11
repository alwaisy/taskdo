<script setup lang="ts">
import { AddNewTask, TaskList } from '@/components'
import { AppPage, AppLoading } from '@/components/ui'
import { withTaskStore } from '@/stores/task-store'
import { storeToRefs } from 'pinia'
import { useCurrentUser } from 'vuefire'

const { loading } = storeToRefs(withTaskStore())
</script>

<template>
  <AppPage>
    <!-- <template v-if="loading">
      <AppLoading />
    </template> -->
    <div>
      <AddNewTask />
      <Suspense>
        <TaskList />
        <template #fallback> <AppLoading /> </template>
      </Suspense>
    </div>
  </AppPage>
</template>

<style scoped>
.modal {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.25s ease, visibility 0.25s ease;
  pointer-events: auto;
}
</style>
