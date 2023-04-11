<script setup lang="ts">
import { AppPage, AppText } from '@/components/ui'
import { RouterLink } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>
  <AppPage>
    <article class="text-center">
      <AppText tag="h1" color="zinc-600" size="6xl" weight="bold"> TaskDo </AppText>

      <AppText tag="p" color="zinc-600" size="lg" weight="bold" custom-class="mt-2">
        Manage You Task Checklist Easily
      </AppText>

      <RouterLink
        :to="user ? '/app' : '/login'"
        class="btn bg-purple-400 border-purple-400 hover:bg-purple-600 hover:border-purple-600 normal-case mt-8"
      >
        Lets Start
      </RouterLink>
    </article>
  </AppPage>
</template>

<style scoped lang="scss"></style>
