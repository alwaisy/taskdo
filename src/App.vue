<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from 'unhead'

useHead({
  title: 'TaskDo',
  meta: [
    { name: 'description', content: 'TaskDo is a task manager' },
    { name: 'keywords', content: 'task manager, todo list' }
  ]
  //   link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
})
</script>

<template>
  <RouterView />
</template>
