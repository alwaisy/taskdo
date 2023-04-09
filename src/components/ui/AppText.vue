<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

/*
colors
red-400
neutral-200
zinc-600
purple-400
sky-500

*/

type Tag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type Color =
  | 'red-400'
  | 'neutral-200'
  | 'zinc-600'
  | 'purple-400'
  | 'sky-500'
  | 'default'
  | 'black'
  | 'white'
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
type Align = 'left' | 'center' | 'right' | 'justify'
type Weight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
type Decor = 'underline' | 'overline' | 'line-through' | 'no-underline'

const props = defineProps<{
  tag: Tag
  color?: Color
  size?: Size
  align?: Align
  weight?: Weight
  decor?: Decor
  customClass?: string
  customStyle?: StyleValue
}>()

const colorVariants = {
  'neutral-200': 'text-neutral-200',
  'purple-400': 'text-purple-400',
  'red-400': 'text-red-400',
  'sky-500': 'text-sky-500',
  'zinc-600': 'text-zinc-600',
  default: 'text-inherit',
  black: 'text-black',
  white: 'text-white'
}

const sizeVariants = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl'
}

const alignVariants = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
}

const weightVariants = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold'
}

const decorVariants = {
  underline: 'underline',
  overline: 'overline',
  'line-through': 'line-through',
  'no-underline': 'no-underline'
}

const classes = computed(() => {
  return [
    colorVariants[props.color as Color],
    sizeVariants[props.size as Size],
    alignVariants[props.align as Align],
    weightVariants[props.weight as Weight],
    decorVariants[props.decor as Decor],
    props.customClass
  ]
})
</script>

<template>
  <Component
    :is="props.tag"
    class="app-text"
    :class="classes"
    :style="props.customStyle as StyleValue"
  >
    <slot></slot>
  </Component>
</template>

<style scoped></style>
