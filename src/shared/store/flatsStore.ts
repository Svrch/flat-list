import { defineStore } from 'pinia'
import type { IFilterState, IFlat, ISortOptions } from '@/shared/types/flat.interface'

// Функция для создания задержки
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const useFlatsStore = defineStore('flats', () => {
  const allFlats = ref<IFlat[]>([])
  const filteredFlats = ref<IFlat[]>([])
  const displayedFlats = ref<IFlat[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const filterState = ref<IFilterState>({
    rooms: [],
    priceRange: [0, 100000000],
    areaRange: [0, 200],
  })

  const sortOptions = ref<ISortOptions>({
    field: 'price',
    direction: 'asc',
  })

  const hasMoreFlats = computed(() =>
    displayedFlats.value.length < filteredFlats.value.length,
  )

  const fetchFlats = async () => {
    isLoading.value = true
    error.value = null

    try {
      // Имитируем задержку сети 500-1500ms
      await delay(500 + Math.random() * 1000)

      const data = await $fetch<{ flats: IFlat[] }>('/data/flats.json')
      allFlats.value = data.flats
      applyFilters()
    }
    catch (error) {
      console.error('Error fetching flats:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  const applyFilters = () => {
    let filtered = [...allFlats.value]

    // Фильтрация по комнатам
    if (filterState.value.rooms.length > 0) {
      filtered = filtered.filter(flat =>
        filterState.value.rooms.includes(flat.rooms),
      )
    }

    // Фильтрация по цене
    filtered = filtered.filter(flat =>
      flat.price >= filterState.value.priceRange[0]
      && flat.price <= filterState.value.priceRange[1],
    )

    // Фильтрация по площади
    filtered = filtered.filter(flat =>
      flat.area >= filterState.value.areaRange[0]
      && flat.area <= filterState.value.areaRange[1],
    )

    // Сортировка
    filtered = sortFlats(filtered)
    filteredFlats.value = filtered
    displayedFlats.value = filtered.slice(0, displayedFlats.value.length ? displayedFlats.value.length : 5)
  }

  const sortFlats = (flats: IFlat[]) => {
    return [...flats].sort((a, b) => {
      let aValue: number, bValue: number

      if (sortOptions.value.field === 'floor') {
        aValue = parseInt(a.floor.split(' из ')[0])
        bValue = parseInt(b.floor.split(' из ')[0])
      }
      else {
        aValue = a[sortOptions.value.field]
        bValue = b[sortOptions.value.field]
      }

      return sortOptions.value.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue
    })
  }

  const loadMore = async () => {
    isLoading.value = true
    try {
      // Задержка для имитации подгрузки данных
      await delay(300 + Math.random() * 500)

      const currentLength = displayedFlats.value.length
      const nextFlats = filteredFlats.value.slice(currentLength, currentLength + 20)
      displayedFlats.value = [...displayedFlats.value, ...nextFlats]
    }
    catch (err) {
      error.value = 'Ошибка загрузки дополнительных данных'
      console.error('Error loading more flats:', err)
    }
    finally {
      isLoading.value = false
    }
  }

  const updateFilter = (newFilter: Partial<IFilterState>) => {
    filterState.value = { ...filterState.value, ...newFilter }
    applyFilters()
  }

  const updateSort = (newSort: Partial<ISortOptions>) => {
    sortOptions.value = { ...sortOptions.value, ...newSort }
    applyFilters()
  }
  return {
    allFlats,
    filteredFlats,
    displayedFlats,
    isLoading,
    filterState,
    sortOptions,
    hasMoreFlats,
    error,
    fetchFlats,
    loadMore,
    updateFilter,
    updateSort,
    applyFilters,
  }
})
