<script setup lang="ts">
import { AddNewTask, TaskList } from '@/components'
import { AppPage } from '@/components/ui'
import { useCurrentUser } from 'vuefire'
</script>

<template>
  <AppPage>
    <div class="">
      <AddNewTask />
      <TaskList />
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
