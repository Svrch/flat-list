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
    <div class="flats-list__title">
      Квартиры
    </div>
    <div v-if="props.flats.length === 0" class="no-flats">
      <p class="no-flats__no-data">
        Квартиры не найдены
      </p>
      <p class="no-flats__subtitle">
        Попробуйте изменить параметры фильтрации
      </p>
    </div>
    <div v-else class="flats-list__list">
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
  display: flex;
  flex-direction: column;

  width: 100%;

  &__title {
    font-size: 54px;
    line-height: 55px;
    font-weight: 500;
  }

  &__list {
    display: flex;
    flex-direction: column;

    @media (max-width: 1024px) {
      gap: 6px;
    }
  }

}

.no-flats {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;

  &__no-data {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #333;
  }

  &__subtitle {
    font-size: 1.1rem;
    opacity: 0.8;
  }
}
</style>
