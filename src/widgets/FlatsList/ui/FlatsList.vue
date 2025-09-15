<script setup lang="ts">
import type { IFlat, ISortOptions } from '@/shared/types/flat.interface'
import FlatSort from '@/widgets/FlatsList/ui/FlatSort.vue'
import FlatCard from '@/widgets/FlatsList/ui/FlatCard.vue'

const props = defineProps<{
  flats: IFlat[]
  sortOptions: ISortOptions
}>()
</script>

<template>
  <div class="flats-list">
    <!-- Состояние когда нет квартир -->
    <div v-if="props.flats.length === 0" class="no-flats">
      <p class="no-flats__title">
        Квартиры не найдены
      </p>
      <p class="no-flats__subtitle">
        Попробуйте изменить параметры фильтрации
      </p>
    </div>

    <!-- Список квартир -->
    <div v-else class="flats-list__grid">
      <FlatSort :sort-options="sortOptions" />
      <div
        v-for="flat in props.flats"
        :key="flat.id"
        class="flats-list__item"
      >
        <FlatCard :flat="flat" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flats-list {
  width: 100%;
  &__grid {
    display: flex;
    flex-direction: column;
  }
}

.no-flats {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.no-flats__title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
}

.no-flats__subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
}
</style>
