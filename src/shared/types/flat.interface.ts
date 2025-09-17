export interface IFlat {
  id: number
  title: string
  area: number
  floor: string
  price: number
  rooms: number
}

export interface IFilterState {
  rooms: number[]
  priceRange: TNumbNumb
  areaRange: TNumbNumb
}

export interface ISortOptions {
  field: 'price' | 'area' | 'floor'
  direction: 'asc' | 'desc'
}

export type TNumbNumb = [number, number]
