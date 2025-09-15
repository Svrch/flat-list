<script setup lang="ts">
import { computed } from 'vue'

export interface IButtonProps {
  flat?: boolean
  loading?: boolean
  outline?: boolean
  disabled?: boolean
  onlyIcon?: '' | 'circle' | 'square'
  onlyText?: boolean
  width?: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

const props = withDefaults(defineProps<IButtonProps>(), {
  flat: false,
  loading: false,
  outline: false,
  disabled: false,
  onlyIcon: '',
  onlyText: false,
  width: '100%',
  size: 'm',
})

const buttonClass = computed(() => {
  return [
    { 'ui-button--disabled': props.disabled },
    { 'ui-button--loading': props.loading },
    { 'ui-button--flat': props.flat },
    { 'ui-button--only-text': props.onlyText },
    { 'ui-button--outline': props.outline },
    `ui-button--only-icon-${props.onlyIcon}`,
    'ui-button--primary',
    `ui-button--size-${props.size}`,
  ]
})

const buttonStyle = computed(() => {
  return {
    '--width': props.width,
  }
})
</script>

<template>
  <button
    class="ui-button"
    :class="buttonClass"
    :style="buttonStyle"
    :tabindex="0"
    type="button"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  position: relative;
  width: var(--width);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  user-select: none;
  border: 0 solid transparent;
  border-radius: 24px;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;

  &__spinner {
    position: absolute;
  }

  &--size-s {
    height: 40px;
    padding: 12px 24px;
    font-size: 16px;

    &.ui-button--only-icon-circle, &.ui-button--only-icon-square {
      height: 40px;
      width: 40px;
      padding: 8px;
    }

    &.ui-button--only-text {
      padding: 0;
      height: min-content;
      width: min-content;
    }
  }

  &--size-m {
    height: 44px;
    padding: 12px 24px;
    font-size: 16px;

    &.ui-button--only-icon-circle, &.ui-button--only-icon-square {
      height: 44px;
      width: 44px;
      padding: 8px;
    }

    &.ui-button--only-text {
      padding: 4px 0;
      height: min-content;
      width: min-content;
    }
  }

  &--only-icon-circle, &--only-icon-square {
    width: min-content;
    height: min-content;
    border: none;
    background-color: transparent;
    box-shadow: none;
  }

  &.ui-button--only-icon-square {
    border-radius: 4px;
  }

  &.ui-button--only-icon-circle {
    border-radius: 50px;
  }

  &:active {
    transform: translate3d(0, 1px, 0);
    box-shadow: none;
  }

  &--primary {
    color: #0B1739;
    background-color: white;

    &:hover {
      background-color: #e8e8e8;
    }

    &:active {
      background-color: #3EB57C;
    }
  }

  &--flat {
    background-color: transparent;
    box-shadow: none;
    &.ui-button--disabled {
      background-color: transparent;
    }
  }

  &--outline {
    border: 2px solid #C0C5C9;
  }

  &--only-text {
    background-color: transparent;
    color: #0B1739;
    box-shadow: none;

    &:hover {
      background-color: transparent;
      color: #0B1739;
    }

    &:active {
      background-color: transparent;
      color: #0B1739;
    }
    &.ui-button--disabled {
      background-color: transparent;
    }
  }

  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none;
    background-color: #C0C5C9;
    color: #0B1739;
  }

  &--loading {
    pointer-events: none;
  }
}
</style>
