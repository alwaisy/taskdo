<script setup lang="ts">
import { AppPage } from '@/components/ui'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>
  <AppPage>
    <div class="flex flex-col items-center justify-center h-full">
      <div class="flex flex-col items-center justify-center">
        <AppText tag="h1" size="4xl" weight="bold" class="mb-4"> Welcome to the app </AppText>
        <AppText tag="p" size="lg" class="mb-4"> You are logged in as {{ user?.email }} </AppText>
        <!-- <AppButton class="w-full" @click="signOut"> Sign out </AppButton> -->
      </div>
    </div>
  </AppPage>
</template>

<style scoped></style>
