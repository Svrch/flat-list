<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { UiButton } from '@/shared/components'

interface Props {
  target?: string
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 100,
})

const isVisible = ref(false)
let targetElement: HTMLElement | Window = window
let isCustomElement = false

const getTargetElement = (): HTMLElement | Window => {
  if (!props.target) return window

  // Поиск по ID или селектору
  const element = document.getElementById(props.target)
    || document.querySelector(props.target)
  return element || window
}

const checkScrollPosition = () => {
  if (isCustomElement && targetElement instanceof HTMLElement) {
    isVisible.value = targetElement.scrollTop > props.threshold
  }
  else {
    isVisible.value = window.scrollY > props.threshold
  }
}

const scrollToTop = () => {
  if (isCustomElement && targetElement instanceof HTMLElement) {
    if ('scrollBehavior' in targetElement.style) {
      targetElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    else {
      targetElement.scrollTop = 0
    }
  }
  else {
    // Прокрутка window
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    else {
      window.scrollTo(0, 0)
    }
  }
}

onMounted(() => {
  targetElement = getTargetElement()
  isCustomElement = targetElement !== window

  if (isCustomElement) {
    targetElement.addEventListener('scroll', checkScrollPosition)
  }
  else {
    window.addEventListener('scroll', checkScrollPosition)
  }

  checkScrollPosition()
})

onUnmounted(() => {
  if (isCustomElement && targetElement instanceof HTMLElement) {
    targetElement.removeEventListener('scroll', checkScrollPosition)
  }
  else {
    window.removeEventListener('scroll', checkScrollPosition)
  }
})
</script>

<template>
  <UiButton
    v-show="isVisible"
    only-icon="circle"
    variant="secondary"
    class="scroll-top"
    @click="scrollToTop"
  >
    <span class="scroll-top__icon">↑</span>
  </UiButton>
</template>

<style scoped lang="scss">
.scroll-top__icon {
  z-index: 10;
  font-size: 24px;
}
.scroll-top {
  background-color: #e8e8e8;
}
</style>
