<script setup lang="ts">
import { computed, type ButtonHTMLAttributes, type StyleValue } from 'vue'

type Size = 'xs' | 'sm' | 'lg'
type TextCase = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'

interface IProps extends ButtonHTMLAttributes {
  customClass?: string
  customStyle?: StyleValue
  btnWide?: boolean
  btnBlock?: boolean
  size?: Size
  alert?: boolean
  textCase?: TextCase
  loading?: boolean
  rounded?: boolean
}

const sizeVariants = {
  xs: '!btn-xs',
  sm: '!btn-sm',
  lg: '!btn-lg'
}

const textCaseVariants = {
  uppercase: '!uppercase',
  lowercase: '!lowercase',
  capitalize: '!capitalize',
  'normal-case': '!normal-case'
}
// const loading = computed(() => 'loading')

const props = defineProps<IProps>()

const classes = computed(() => [
  props.btnWide && 'btn-wide',
  props.btnBlock && 'btn-block',
  sizeVariants[props.size as Size],
  props.alert ? 'app-btn__alert' : 'app-btn',
  textCaseVariants[props.textCase as TextCase],
  props.loading && 'loading',
  props.rounded && 'btn-circle',
  props.customClass && `!${props.customClass}`
])
</script>

<template>
  <button type="submit" v-bind="props" :class="classes">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.app-btn {
  @apply btn bg-purple-400 border-purple-400 hover:bg-purple-600 hover:border-purple-600;
}
.app-btn__alert {
  @apply btn bg-red-400 border-red-400 hover:bg-red-600 hover:border-red-600;
}
</style>
