<script setup lang="ts">
import { useHead } from 'unhead'
import { Layout } from './Layouts'

useHead({
  title: 'TaskDo',
  meta: [
    { name: 'description', content: 'TaskDo is a task manager' },
    { name: 'keywords', content: 'task manager, todo list' }
  ]
  //   link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
})

console.log('App.vue', import.meta.env)
</script>

<template>
  <Layout />
</template>
