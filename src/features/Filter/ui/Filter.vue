<script setup lang="ts">
import { UiButton } from '@/shared/components/UiButton'
import { UiSlider } from '@/shared/components/UiSlider'
import type { IFilterState, TNumbNumb } from '@/shared/types/flat.interface'
import type { TFilterProps } from '@/features/Filter/types'

const props = withDefaults(defineProps<TFilterProps>(), {
  priceRange: (): TNumbNumb => [0, 300000],
  areaRange: (): TNumbNumb => [0, 100],
  rooms: (): number[] => [1, 2, 3],
})

const model = defineModel<IFilterState>({
  default: () => ({
    priceRange: [0, 300000],
    areaRange: [0, 100],
    rooms: [1, 2, 3],
  }),
})

const currentPriceRange = ref<TNumbNumb>(props.priceRange)
const currentAreaRange = ref<TNumbNumb>(props.areaRange)

const updateModel = (newModel: Partial<IFilterState>) => {
  model.value = { ...model.value, ...newModel }
}

// Обработчики для слайдеров
const handlePriceChange = (values: TNumbNumb) => {
  updateModel({ priceRange: values })
}
const handleAreaChange = (values: TNumbNumb) => {
  updateModel({ areaRange: values })
}

const toggleRoom = (room: number) => {
  const currentRooms = model.value.rooms || []
  const newRooms = currentRooms.includes(room)
    ? currentRooms.filter(r => r !== room)
    : [...currentRooms, room]

  updateModel({ rooms: newRooms })
}

const resetFilters = () => {
  currentPriceRange.value = props.priceRange
  currentAreaRange.value = props.areaRange
  updateModel({ rooms: [], areaRange: props.areaRange, priceRange: props.priceRange })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(price) + ' ₽'
}
const formatArea = (v: number) => v.toFixed(1) + ' м²'

const hasActiveFilters = computed(() => {
  const [minPrice, maxPrice] = props.priceRange
  const [minArea, maxArea] = props.areaRange

  return (
    model.value.rooms.length > 0
    || model.value.priceRange[0] !== minPrice
    || model.value.priceRange[1] !== maxPrice
    || model.value.areaRange[0] !== minArea
    || model.value.areaRange[1] !== maxArea
  )
})

onMounted(() => {
  updateModel({ rooms: [], areaRange: props.areaRange, priceRange: props.priceRange })
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
          v-for="room in props.rooms"
          :key="room"
          only-icon="circle"
          :class="{ 'flats-filter__room-btn--active': model.rooms.includes(room) }"
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
        <UiSlider
          v-model="currentPriceRange"
          :min="priceRange[0]"
          :max="priceRange[1]"
          :interval="100000"
          :tooltip-formatter="formatPrice"
          :on-change="handlePriceChange"
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
        <UiSlider
          v-model="currentAreaRange"
          :min="areaRange[0]"
          :max="areaRange[1]"
          :interval="0.1"
          :tooltip-formatter="formatArea"
          :on-change="handleAreaChange"
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
</style>
