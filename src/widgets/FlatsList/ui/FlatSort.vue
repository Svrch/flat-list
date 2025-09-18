<script setup lang="ts">
import type { ISortOptions } from '@/shared/types/flat.interface'

const model = defineModel<ISortOptions>({
  default: {
    direction: 'asc',
    field: 'price',
  },
})

const handleSort = (field: 'price' | 'area' | 'floor') => {
  if (model.value.field === field) {
    // Если уже сортируем по этому полю, меняем направление
    model.value = { ...model.value, direction: model.value.direction === 'asc' ? 'desc' : 'asc' }
  }
  else {
    // Если новое поле, сортируем по возрастанию
    model.value = { field: field, direction: 'asc' }
  }
}

const getSortIcon = (field: 'price' | 'area' | 'floor') => {
  if (model.value.field !== field) return '↕'

  return model.value.direction === 'asc' ? '↑' : '↓'
}
</script>

<template>
  <article class="flat-sort">
    <div class="flat-sort__plan">
      Планировка
    </div>

    <div class="flat-sort__name">
      Квартира
    </div>

    <div
      class="flat-sort__area sortable"
      :class="{ 'sortable--active': model.field === 'area' }"
      @click="handleSort('area')"
    >
      <span class="flat-sort__detail-text">S, м²</span>
      <span class="sort-icon">{{ getSortIcon('area') }}</span>
    </div>

    <div
      class="flat-sort__floor sortable"
      :class="{ 'sortable--active': model.field === 'floor' }"
      @click="handleSort('floor')"
    >
      <span class="flat-sort__detail-text">Этаж</span>
      <span class="sort-icon">{{ getSortIcon('floor') }}</span>
    </div>

    <div
      class="flat-sort__price sortable"
      :class="{ 'sortable--active': model.field === 'price' }"
      @click="handleSort('price')"
    >
      <span class="flat-sort__detail-text">Цена, ₽</span>
      <span class="sort-icon">{{ getSortIcon('price') }}</span>
    </div>
  </article>
</template>

<style scoped lang="scss">
.flat-sort {
  display: flex;
  font-size: 16px;
  height: 36px;
  align-items: center;
  padding: 8px 0;

  &__plan {
    flex: 0.3;
    min-width: 0;
    font-weight: 500;
    color: #374151;
  }

  &__name {
    flex: 0.5;
    min-width: 0;
    font-weight: 500;
    color: #374151;
  }

  &__area, &__price, &__floor {
    flex: 0.4;
    min-width: 0;
    font-weight: 500;
    color: #374151;
  }

  @media (max-width: 1024px) {
    width: 300px;
    &__plan {
      display: none;
    }
    &__name {
      display: none;
    }
  }
}

.sortable {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: color 0.2s ease;
  user-select: none;

  &:hover {
    color: #3EB57C;
  }

  &--active {
    color: #3EB57C;
    font-weight: 600;
  }
}

.sort-icon {
  font-size: 12px;
  transition: transform 0.2s ease;
}
</style>
