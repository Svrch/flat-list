<script setup lang="ts">
import VueSlider from 'vue-3-slider-component'

import { useFlatsStore } from '@/shared/store/flatsStore'
import { UiButton } from '@/shared/components'

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
        <UiButton
          v-for="room in roomOptions"
          :key="room"
          only-icon="circle"
          :class="{ 'flats-filter__room-btn--active': store.filterState.rooms.includes(room) }"
          @click="toggleRoom(room)"
        >
          <div class="flats-filter__rooms-text">
            {{ room }}к
          </div>
        </UiButton>
      </div>
    </div>
    <div class="flats-filter__section">
      <h3 class="flats-filter__title">
        Стоимость квартиры, ₽
      </h3>
      <div class="flats-filter__slider">
        <div class="flats-filter__slider-values">
          <span>
            от
            <span class="flats-filter__slider-values-text">
              {{ formatPrice(currentPriceRange[0]) }}
            </span>
          </span>
          <span>
            до
            <span class="flats-filter__slider-values-text">
              {{ formatPrice(currentPriceRange[1]) }}
            </span>
          </span>
        </div>
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
      </div>
    </div>

    <div class="flats-filter__section">
      <h3 class="flats-filter__title">
        Площадь, м²
      </h3>
      <div class="flats-filter__slider">
        <div class="flats-filter__slider-values">
          <span>
            от
            <span class="flats-filter__slider-values-text">
              {{ currentAreaRange[0] }} м²
            </span>
          </span>
          <span>
            до
            <span class="flats-filter__slider-values-text">
              {{ currentAreaRange[1] }} м²
            </span>
          </span>
        </div>
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
      </div>
    </div>

    <UiButton
      :disabled="!hasActiveFilters"
      only-text
      @click="resetFilters"
    >
      <div class="flats-filter__reset">
        Сбросить параметры ✖
      </div>
    </UiButton>
  </div>
</template>

<style scoped lang="scss">
.flats-filter {
  background-color: rgba(197, 232, 198, 0.5);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;

  &__title {
    color: #333;
  }

  &__rooms {
    display: flex;
    gap: 12px;
  }

  &__room-btn--active {
    background-color: #3EB57C;
    color: white;
  }

  &__rooms-text {
    font-weight: 400;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__slider {
    width: 95%;
  }

  &__slider-values {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #6b7280;
    margin-top: 8px;
  }

  &__slider-values-text {
    color: #333;
    font-weight: 500;
  }

  &__reset {
    font-size: 14px;
    font-weight: 400;

    &:hover {
      color: #3EB57C;
    }
  }
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
