<script setup lang="ts">
import type { IFlat } from '@/shared/types/flat.interface'

const props = defineProps<{ flat: IFlat }>()

// Форматирование цены с пробелами
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(props.flat.price).replace('RUB', '₽')
})
</script>

<template>
  <article class="flat-card">
    <div class="flat-card__image-container">
      <img
        src="/src/shared/assets/img/test.svg"
        :alt="flat.title"
        class="flat-card__image"
        loading="lazy"
      />
    </div>

    <div class="flat-card__title">
      {{ flat.title }}
    </div>

    <div class="flat-card__detail">
      <span class="flat-card__detail-text">{{ flat.area }} м²</span>
    </div>

    <div class="flat-card__detail">
      <span class="flat-card__detail-text">{{ flat.floor }}</span>
    </div>

    <div class="flat-card__price">
      {{ formattedPrice }}
    </div>
  </article>
</template>

<style lang="scss" scoped>
.flat-card {
  display: flex;
  justify-content: space-between;
  height: 100px;
  gap: 24px;
  border-top: 2px solid #e5e7eb;
  padding-top: 24px;
  font-size: 16px;

  &__image-container {
    flex: 0.3;
    min-width: 0;
  }

  &__title {
    flex: 1;
    min-width: 0;
    line-height: 24px;
    font-weight: 500;
  }

  &__detail, &__price {
    flex: 0.4;
    min-width: 0;
    font-weight: 400;
  }
}
</style>
