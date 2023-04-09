<script setup lang="ts">
import type { StyleValue } from 'vue'

const props = defineProps<{
  customClass?: string
  customStyle?: StyleValue
}>()
</script>

<template>
  <div class="app-page" :class="props.customClass" :style="props.customStyle as StyleValue">
    <slot></slot>
  </div>
</template>

<style scoped>
.app-page {
  @apply flex flex-col justify-center items-center;
  height: calc(100vh - 4rem);
}
</style>
