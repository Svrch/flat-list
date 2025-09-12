<script setup lang="ts">
import type { ISortOptions } from '@/shared/types/flat.interface'
import { useFlatsStore } from '@/shared/store/flatsStore'

const store = useFlatsStore()

const props = defineProps<{
  sortOptions: ISortOptions
}>()

const handleSort = (field: 'price' | 'area' | 'floor') => {
  if (props.sortOptions.field === field) {
    // Если уже сортируем по этому полю, меняем направление
    store.updateSort({
      direction: props.sortOptions.direction === 'asc' ? 'desc' : 'asc',
    })
  }
  else {
    // Если новое поле, сортируем по возрастанию
    store.updateSort({
      field,
      direction: 'asc',
    })
  }
}

const getSortIcon = (field: 'price' | 'area' | 'floor') => {
  if (props.sortOptions.field !== field) return '↕'

  return props.sortOptions.direction === 'asc' ? '↑' : '↓'
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
      :class="{ 'sortable--active': sortOptions.field === 'area' }"
      @click="handleSort('area')"
    >
      <span class="flat-sort__detail-text">S, м²</span>
      <span class="sort-icon">{{ getSortIcon('area') }}</span>
    </div>

    <div
      class="flat-sort__floor sortable"
      :class="{ 'sortable--active': sortOptions.field === 'floor' }"
      @click="handleSort('floor')"
    >
      <span class="flat-sort__detail-text">Этаж</span>
      <span class="sort-icon">{{ getSortIcon('floor') }}</span>
    </div>

    <div
      class="flat-sort__price sortable"
      :class="{ 'sortable--active': sortOptions.field === 'price' }"
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
  gap: 24px;
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
    flex: 1;
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
