<script setup lang="ts">
import { FlatsList } from '@/widgets/FlatsList'
import { useFlatsStore } from '@/shared/store/flatsStore'
import FlatsPagination from '@/widgets/FlatsList/ui/FlatsPagination.vue'
import type { IFlat, ISortOptions } from '@/shared/types/flat.interface'

const store = useFlatsStore()
const { displayedFlats, isLoading, error, hasMoreFlats, sortOptions } = storeToRefs(store)

const { loadMore, updateSort } = store

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

const handleFlatClick = (flat: IFlat) => {
  console.log('Квартира clicked:', flat)
}

const handleSortUpdate = (options: Partial<ISortOptions>) => {
  updateSort(options)
}

onMounted(() => {
  store.fetchFlats()
})
</script>

<template>
  <div class="flats-page">
    <FlatsFilter />
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
          @flat-click="handleFlatClick"
          @update-sort="handleSortUpdate"
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
    <BackToTop />
  </div>
</template>

<style lang="scss" scoped>
.flats-page {
  display: flex;
  justify-content: center;
  padding: 48px;
}

.flats-container {
  flex: 1;
  max-width: 1440px;
}
</style>
