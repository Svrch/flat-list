<script setup lang="ts">
import { FlatsList } from '@/widgets/FlatsList'
import { useFlatsStore } from '@/shared/store/flatsStore'
import FlatsPagination from '@/widgets/FlatsList/ui/FlatsPagination.vue'
import FlatsFilter from '@/widgets/FlatsList/ui/FlatsFilter.vue'

const store = useFlatsStore()
const { displayedFlats, isLoading, error, hasMoreFlats, sortOptions, filterState } = storeToRefs(store)

const { loadMore } = store

const isLoadingPagination = ref(false)

const handleLoadMore = async () => {
  isLoadingPagination.value = true
  try {
    await loadMore()
  }
  finally {
    isLoadingPagination.value = false
  }
}

onMounted(() => {
  store.fetchFlats()
})
</script>

<template>
  <div class="flats-page">
    <div class="flats-container">
      <!-- Состояние загрузки -->
      <div v-if="isLoading && displayedFlats.length === 0" class="loading">
        Загрузка квартир...
      </div>

      <!-- Состояние ошибки -->
      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <!-- Данные загружены -->
      <template v-else>
        <FlatsList
          :flats="displayedFlats"
          :sort-options="sortOptions"
        />

        <!-- Кнопка загрузки -->
        <FlatsPagination
          v-if="hasMoreFlats"
          :loading="isLoadingPagination"
          @load-more="handleLoadMore"
        />

        <!-- Сообщение когда больше нет данных -->
        <div v-else-if="displayedFlats.length > 0" class="no-more">
          Показаны все доступные квартиры
        </div>
      </template>
    </div>
    <FlatsFilter :filter-state="filterState" />
  </div>
  <BackToTop />
</template>

<style lang="scss" scoped>
.flats-page {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 48px;
}

.flats-container {
  flex: 1;
  max-width: 1440px;
}
</style>
