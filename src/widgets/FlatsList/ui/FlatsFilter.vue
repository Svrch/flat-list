<script setup lang="ts">
import VueSlider from 'vue-3-slider-component'

import { useFlatsStore } from '@/shared/store/flatsStore'

const store = useFlatsStore()
const { allFlats, filterState } = storeToRefs(store)

const roomOptions = [1, 2, 3, 4]

const priceRange = computed<[number, number]>(() => {
  const prices = allFlats.value.map(flat => flat.price)
  return [Math.min(...prices), Math.max(...prices)]
})
const areaRange = computed<[number, number]>(() => {
  const areas = allFlats.value.map(flat => flat.area)
  return [Math.min(...areas), Math.max(...areas)]
})

const currentPriceRange = ref(priceRange.value)
const currentAreaRange = ref(areaRange.value)

// Обработчики для слайдеров
const handlePriceChange = (values: [number, number]) => {
  store.updateFilter({ priceRange: values })
}
const handleAreaChange = (values: [number, number]) => {
  store.updateFilter({ areaRange: values })
}

const toggleRoom = (room: number) => {
  const newRooms = filterState.value.rooms.includes(room)
    ? filterState.value.rooms.filter(r => r !== room)
    : [...filterState.value.rooms, room]
  store.updateFilter({ rooms: newRooms })
}

const resetFilters = () => {
  currentPriceRange.value = priceRange.value
  currentAreaRange.value = areaRange.value
  store.updateFilter({ rooms: [], areaRange: areaRange.value, priceRange: priceRange.value })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(price) + ' ₽'
}
const formatArea = (v: number) => v.toFixed(1) + ' м²'

const hasActiveFilters = computed(() => {
  const [minPrice, maxPrice] = priceRange.value
  const [minArea, maxArea] = areaRange.value

  return (
    filterState.value.rooms.length > 0
    || filterState.value.priceRange[0] !== minPrice
    || filterState.value.priceRange[1] !== maxPrice
    || filterState.value.areaRange[0] !== minArea
    || filterState.value.areaRange[1] !== maxArea
  )
})

onMounted(() => {
  store.updateFilter({ rooms: [], areaRange: areaRange.value, priceRange: priceRange.value })
})
</script>

<template>
  <div class="flats-filter">
    <div class="flats-filter__section">
      <h3 class="flats-filter__title">
        Количество комнат
      </h3>
      <div class="flats-filter__rooms">
        <button
          v-for="room in roomOptions"
          :key="room"
          class="flats-filter__room-btn"
          :class="{
            'flats-filter__room-btn--active': store.filterState.rooms.includes(room),
          }"
          @click="toggleRoom(room)"
        >
          {{ room }}к
        </button>
      </div>
    </div>
    <div class="flats-filter__section">
      <h3 class="flats-filter__title">
        Стоимость квартиры, ₽
      </h3>
      <div class="flats-filter__slider">
        <VueSlider
          v-model="currentPriceRange"
          :min="priceRange[0]"
          :max="priceRange[1]"
          :interval="100000"
          :tooltip="'active'"
          :tooltip-formatter="formatPrice"
          :lazy="true"
          @change="handlePriceChange"
        />
        <div class="flats-filter__slider-values">
          <span>{{ formatPrice(currentPriceRange[0]) }}</span>
          <span>{{ formatPrice(currentPriceRange[1]) }}</span>
        </div>
      </div>
    </div>

    <div class="flats-filter__section">
      <h3 class="flats-filter__title">
        Площадь, м²
      </h3>
      <div class="flats-filter__slider">
        <VueSlider
          v-model="currentAreaRange"
          :min="areaRange[0]"
          :max="areaRange[1]"
          :interval="0.1"
          :tooltip="'active'"
          :tooltip-formatter="formatArea"
          :lazy="true"
          @change="handleAreaChange"
        />
        <div class="flats-filter__slider-values">
          <span>{{ currentAreaRange[0] }} м²</span>
          <span>{{ currentAreaRange[1] }} м²</span>
        </div>
      </div>
    </div>

    <button
      class="flats-filter__reset"
      :disabled="!hasActiveFilters"
      @click="resetFilters"
    >
      Сбросить параметры
    </button>
  </div>
</template>

<style scoped lang="scss">
.flats-filter {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.flats-filter__section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.flats-filter__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.flats-filter__rooms {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.flats-filter__room-btn {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3EB57C;
    color: #3EB57C;
  }

  &--active {
    background: #3EB57C;
    border-color: #3EB57C;
    color: white;

    &:hover {
      background: #3EB57C;
      color: #374151;
    }
  }
}

.flats-filter__slider {
  margin-top: 16px;
}

.flats-filter__slider-values {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 8px;
}

.flats-filter__reset {
  width: 100%;
  padding: 12px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;

  &:hover:not(:disabled) {
    background: #e5e7eb;
    color: #111827;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

:deep(.vue-slider) {
  margin: 16px 0;
}

:deep(.vue-slider-rail) {
  background-color: #f3f4f6;
  border-radius: 4px;
}

:deep(.vue-slider-process) {
  background-color: #3EB57C;
  border-radius: 4px;
}

:deep(.vue-slider-dot-tooltip-inner) {
  border: 2px solid #3EB57C;
  background: #3EB57C;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #3EB57C;
  }
}

:deep(.vue-slider-tooltip) {
  background-color: #3EB57C;
  border-color: #3EB57C;

  &::before {
    border-top-color: #3EB57C;
  }
}

:deep(.vue-slider-dot-handle-focus) {
  box-shadow: 0 0 1px 2px #3EB57C
}
</style>
