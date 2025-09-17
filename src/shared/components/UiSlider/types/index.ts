import type { TNumbNumb } from '@/shared/types/flat.interface'

export interface ISliderProps {
  min?: number
  max?: number
  interval?: number
  tooltip?: TTooltipKeys
  tooltipFormatter?: (value: number) => string
  lazy?: boolean
  onChange?: (values: TNumbNumb) => void
}

type TTooltipKeys = 'none' | 'always' | 'focus' | 'hover' | 'active'
