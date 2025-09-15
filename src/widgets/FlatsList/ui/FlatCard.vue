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

    <div class="flat-card__info">
      <div class="flat-card__title">
        {{ flat.title }}
      </div>

      <div class="flat-card__values">
        <div class="flat-card__detail">
          <span class="flat-card__detail-text">{{ flat.area }} м²</span>
        </div>

        <div class="flat-card__detail">
          <span class="flat-card__detail-text">{{ flat.floor }}</span>
        </div>

        <div class="flat-card__price">
          {{ formattedPrice }}
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.flat-card {
  display: flex;
  justify-content: space-between;
  height: 100px;
  border-top: 2px solid #e5e7eb;
  padding-top: 24px;
  font-size: 16px;

  &__info {
    display: flex;
    flex: 1.7;
  }

  &__values {
    display: flex;
    flex: 1.2;
  }

  &__image-container {
    display: flex;
    flex: 0.3;
    min-width: 0;
  }

  &__title {
    flex: 0.5;
    min-width: 0;
    line-height: 24px;
    font-weight: 500;
  }

  &__detail, &__price {
    flex: 0.4;
    min-width: 0;
    font-weight: 400;
  }

  @media (max-width: 1024px) {
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    flex-direction: row-reverse;
    padding-top: 18px;

    &__info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-left: 16px;
      flex: 1;
    }

    &__image-container {
      flex: 0.8;
      min-width: 0;
      display: flex;
      flex-direction: row-reverse;
      padding-right: 16px;
    }

  }
}
</style>
