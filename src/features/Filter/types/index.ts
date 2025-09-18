import type { TNumbNumb } from '@/shared/types/flat.interface'

export interface TFilterProps {
  priceRange?: TNumbNumb
  areaRange?: TNumbNumb
  rooms?: number[]
}
