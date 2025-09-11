<script setup lang="ts">
defineProps<{ loading?: boolean }>()

defineEmits<{ 'load-more': [] }>()
</script>

<template>
  <div class="pagination">
    <button
      :disabled="loading"
      class="load-more-btn"
      @click="$emit('load-more')"
    >
      <span v-if="!loading">Показать ещё 20</span>
      <span v-else>Загрузка...</span>
    </button>
  </div>
</template>
