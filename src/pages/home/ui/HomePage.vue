<script setup lang="ts">
import { FlatsList } from '@/widgets/FlatsList'
import { useFlatsStore } from '@/shared/store/flatsStore'
import { ScrollTop } from '@/features/ScrollTop'
import { Filter } from '@/features/Filter'
import type { IFilterState, IFlat, TNumbNumb } from '@/shared/types/flat.interface'

const filterModel = ref<IFilterState>({
  priceRange: [0, 30000000],
  areaRange: [0, 200],
  rooms: [1, 2, 3],
})

const store = useFlatsStore()
const { isLoading, allFlats } = storeToRefs(store)

const filteredFlats = computed<IFlat[]>(() => {
  if (!allFlats.value || !filterModel.value) {
    return []
  }

  let filtered = [...allFlats.value]

  // Фильтрация по комнатам
  if (filterModel.value.rooms.length > 0) {
    filtered = filtered.filter(flat =>
      filterModel.value!.rooms.includes(flat.rooms),
    )
  }

  // Фильтрация по цене
  filtered = filtered.filter(flat =>
    flat.price >= filterModel.value!.priceRange[0]
    && flat.price <= filterModel.value!.priceRange[1],
  )

  // Фильтрация по площади
  filtered = filtered.filter(flat =>
    flat.area >= filterModel.value!.areaRange[0]
    && flat.area <= filterModel.value!.areaRange[1],
  )

  return filtered
})

const priceRange = computed<TNumbNumb>(() => {
  const prices = allFlats.value.map(flat => flat.price)
  return [Math.min(...prices), Math.max(...prices)]
})
const areaRange = computed<TNumbNumb>(() => {
  const areas = allFlats.value.map(flat => flat.area)
  return [Math.min(...areas), Math.max(...areas)]
})

onMounted(() => {
  store.fetchFlats()
})
</script>

<template>
  <div class="flats-page">
    <div class="flats-container">
      <!-- Состояние загрузки -->
      <div v-if="isLoading && filteredFlats.length === 0" class="flats-loading">
        Загрузка квартир...
      </div>

      <!-- Данные загружены -->
      <template v-else>
        <FlatsList :flats="filteredFlats" />
      </template>
    </div>
    <div v-if="allFlats.length" class="flats-filter-block">
      <Filter
        v-model="filterModel"
        :rooms="[1, 2, 3, 4]"
        :price-range="priceRange"
        :area-range="areaRange"
      />
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
