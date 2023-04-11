<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: string
    color?: string
  }>(),
  {
    size: 'w-12 h-12',
    color: 'border-purple-500'
  }
)

const classes = computed(() => {
  return ['app-loading', props.size, props.color]
})
</script>

<template>
  <div :class="classes" />
</template>

<style scoped>
.app-loading {
  @apply rounded-full animate-spin border-2 border-solid border-t-transparent;
}
</style>
