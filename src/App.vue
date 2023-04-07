<script setup lang="ts">
import { RouterView } from 'vue-router'
import { BeakerIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <!-- <RouterView /> -->
  <div>
    <h1>App::TaskDo</h1>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <BeakerIcon class="h-6 w-6 text-blue-500" />
    <button class="btn btn-success">Success</button>

    <RouterView />
  </div>
</template>

<style scoped lang="postcss"></style>
