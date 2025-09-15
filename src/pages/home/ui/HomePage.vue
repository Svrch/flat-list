<script setup lang="ts">
import { FlatsList } from '@/widgets/FlatsList'
import { useFlatsStore } from '@/shared/store/flatsStore'
import FlatsPagination from '@/widgets/FlatsList/ui/FlatsPagination.vue'
import FlatsFilter from '@/widgets/FlatsList/ui/FlatsFilter.vue'
import { ScrollTop } from '@/features/ScrollTop'

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
      <div v-if="isLoading && displayedFlats.length === 0" class="flats-loading">
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
        <div v-else-if="displayedFlats.length > 0" class="flats-no-more">
          Показаны все доступные квартиры
        </div>
      </template>
    </div>
    <div class="flats-filter-block">
      <FlatsFilter v-if="store.allFlats.length" :filter-state="filterState" />
    </div>
    <div class="flats-page__scroll-top">
      <ScrollTop target=".flats-page" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flats-page {
  display: flex;
  gap: 48px;
  height: calc(100vh - 48px);
  justify-content: center;
  overflow-y: scroll;
  width: 100%;

  &__scroll-top {
    position: fixed;
    right: 55px;
    bottom: 55px;
  }

  @media (max-width: 1024px) {
    gap: 24px;
  }
}

.flats-container {
  width: 100%;
  max-width: 1000px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.flats-loading {
  font-size: 16px;
}

.flats-filter-block {
  max-width: 440px;
  min-width: 330px;
  padding: 12px;
  position: sticky;
  top: 0;
  flex: 0.5;
}

.flats-no-more {
  font-size: 16px;
}
</style>
