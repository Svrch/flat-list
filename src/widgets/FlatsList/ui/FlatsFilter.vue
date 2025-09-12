<script setup lang="ts">
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
import type { IFilterState } from '@/shared/types/flat.interface'
import { useFlatsStore } from '@/shared/store/flatsStore'

const props = defineProps<{
  filterState: IFilterState
}>()

const store = useFlatsStore()

const roomOptions = [1, 2, 3, 4] as const
const priceSlider = ref<HTMLElement>()
const areaSlider = ref<HTMLElement>()

// Вычисляем реальные min/max значения из всех квартир (без округлений)
const priceRange = computed(() => {
  if (store.allFlats.length === 0) return [0, 25000000]

  const prices = store.allFlats.map(flat => flat.price)
  return [
    Math.min(...prices), // самая маленькая цена
    Math.max(...prices), // самая большая цена
  ]
})

const areaRange = computed(() => {
  if (store.allFlats.length === 0) return [0, 200]

  const areas = store.allFlats.map(flat => flat.area)
  return [
    Math.min(...areas), // самая маленькая площадь
    Math.max(...areas), // самая большая площадь
  ]
})

const hasActiveFilters = computed(() => {
  const [minPrice, maxPrice] = priceRange.value
  const [minArea, maxArea] = areaRange.value

  return (
    props.filterState.rooms.length > 0
    || props.filterState.priceRange[0] !== minPrice
    || props.filterState.priceRange[1] !== maxPrice
    || props.filterState.areaRange[0] !== minArea
    || props.filterState.areaRange[1] !== maxArea
  )
})

const toggleRoom = (room: number) => {
  const newRooms = props.filterState.rooms.includes(room)
    ? props.filterState.rooms.filter(r => r !== room)
    : [...props.filterState.rooms, room]

  store.updateFilter({ rooms: newRooms })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(price) + ' ₽'
}

// Функция инициализации слайдеров
const initSliders = () => {
  // Уничтожаем старые слайдеры если есть
  if (priceSlider.value?.noUiSlider) {
    priceSlider.value.noUiSlider.destroy()
  }
  if (areaSlider.value?.noUiSlider) {
    areaSlider.value.noUiSlider.destroy()
  }

  // Инициализируем слайдер цены
  if (priceSlider.value && priceRange.value[1] > 0) {
    noUiSlider.create(priceSlider.value, {
      start: [
        Math.max(props.filterState.priceRange[0], priceRange.value[0]),
        Math.min(props.filterState.priceRange[1], priceRange.value[1]),
      ],
      connect: true,
      range: {
        min: priceRange.value[0],
        max: priceRange.value[1],
      },
      step: 1,
      format: {
        to: value => Math.round(value),
        from: value => Number(value),
      },
    })

    priceSlider.value.noUiSlider?.on('change', (values) => {
      const [min, max] = values.map(Number)
      store.updateFilter({ priceRange: [min, max] })
    })
  }

  // Инициализируем слайдер площади
  if (areaSlider.value && areaRange.value[1] > 0) {
    noUiSlider.create(areaSlider.value, {
      start: [
        Math.max(props.filterState.areaRange[0], areaRange.value[0]),
        Math.min(props.filterState.areaRange[1], areaRange.value[1]),
      ],
      connect: true,
      range: {
        min: areaRange.value[0],
        max: areaRange.value[1],
      },
      step: 0.1,
      format: {
        to: value => Math.round(value * 10) / 10,
        from: value => Number(value),
      },
    })

    areaSlider.value.noUiSlider?.on('change', (values) => {
      const [min, max] = values.map(Number)
      store.updateFilter({ areaRange: [min, max] })
    })
  }
}

// Инициализируем слайдеры при монтировании если данные уже есть
onMounted(() => {
  if (store.allFlats.length > 0) {
    nextTick(initSliders)
  }
})

// Инициализируем слайдеры когда данные загружаются
watch(() => store.allFlats.length, (length) => {
  if (length > 0) {
    nextTick(initSliders)
  }
})

// Переинициализируем слайдеры при изменении диапазонов
watch([priceRange, areaRange], () => {
  if (store.allFlats.length > 0) {
    nextTick(initSliders)
  }
})

watch(() => props.filterState, (newState) => {
  if (priceSlider.value?.noUiSlider) {
    priceSlider.value.noUiSlider.set(newState.priceRange)
  }
  if (areaSlider.value?.noUiSlider) {
    areaSlider.value.noUiSlider.set(newState.areaRange)
  }
}, { deep: true })

// Уничтожаем слайдеры при размонтировании
onUnmounted(() => {
  if (priceSlider.value?.noUiSlider) {
    priceSlider.value.noUiSlider.destroy()
  }
  if (areaSlider.value?.noUiSlider) {
    areaSlider.value.noUiSlider.destroy()
  }
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
            'flats-filter__room-btn--active': filterState.rooms.includes(room),
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
        <div ref="priceSlider" class="slider-container" />
        <div class="flats-filter__slider-values">
          <span>{{ formatPrice(filterState.priceRange[0]) }}</span>
          <span>{{ formatPrice(filterState.priceRange[1]) }}</span>
        </div>
      </div>
    </div>

    <div class="flats-filter__section">
      <h3 class="flats-filter__title">
        Площадь, м²
      </h3>
      <div class="flats-filter__slider">
        <div ref="areaSlider" class="slider-container" />
        <div class="flats-filter__slider-values">
          <span>{{ filterState.areaRange[0] }} м²</span>
          <span>{{ filterState.areaRange[1] }} м²</span>
        </div>
      </div>
    </div>

    <button
      class="flats-filter__reset"
      :disabled="!hasActiveFilters"
      @click="store.resetFilters"
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
    border-color: #2563eb;
    color: #2563eb;
  }

  &--active {
    background: #2563eb;
    border-color: #2563eb;
    color: white;

    &:hover {
      background: #1d4ed8;
      border-color: #1d4ed8;
    }
  }
}

.flats-filter__slider {
  margin-top: 16px;
}

.slider-container {
  margin: 16px 0;
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

// Стили для nouislider
:deep(.noUi-target) {
  background: #f3f4f6;
  border: none;
  box-shadow: none;
  height: 6px;
}

:deep(.noUi-connect) {
  background: #2563eb;
}

:deep(.noUi-handle) {
  width: 20px;
  height: 20px;
  top: -7px;
  right: -10px;
  border: 2px solid #2563eb;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &::before, &::after {
    display: none;
  }
}

:deep(.noUi-handle):hover {
  background: #2563eb;
}
</style>
