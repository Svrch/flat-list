<script setup lang="ts">
import { UiButton } from '@/shared/components'

defineProps<{ loading?: boolean }>()

defineEmits<{ 'load-more': [] }>()
</script>

<template>
  <UiButton
    :disabled="loading"
    width="200px"
    @click="$emit('load-more')"
  >
    <span v-if="!loading">Показать ещё 20</span>
    <span v-else>Загрузка...</span>
  </UiButton>
</template>

<style scoped lang="scss">
</style>
