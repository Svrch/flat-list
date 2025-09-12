<script setup lang="ts">
import { UiButton } from '@/shared/components'

defineProps<{ loading?: boolean }>()

defineEmits<{ 'load-more': [] }>()
</script>

<template>
  <div class="pagination">
    <UiButton
      :disabled="loading"
      class="load-more-btn"
      @click="$emit('load-more')"
    >
      <span v-if="!loading">Показать ещё 20</span>
      <span v-else>Загрузка...</span>
    </UiButton>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  max-width: 250px;
}
</style>
