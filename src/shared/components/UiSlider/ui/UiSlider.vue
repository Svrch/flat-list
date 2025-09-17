<script setup lang="ts">
import VueSlider from 'vue-3-slider-component'
import type { ISliderProps } from '@/shared/components/UiSlider/types'
import type { TNumbNumb } from '@/shared/types/flat.interface'

const model = defineModel<TNumbNumb>()

const props = withDefaults(defineProps<ISliderProps>(), {
  min: 0,
  max: 100,
  interval: 1,
  lazy: true,
  tooltip: 'active',
  tooltipFormatter: value => value,
})
</script>

<template>
  <VueSlider
    v-model="model"
    :min="props.min"
    :max="props.max"
    :interval="props.interval"
    :tooltip="props.tooltip"
    :tooltip-formatter="props.tooltipFormatter"
    :lazy="props.lazy"
    @change="props.onChange"
  />
</template>

<style scoped lang="scss">
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
