import { defineStore } from 'pinia'
import type { IFlat } from '@/shared/types/flat.interface'

// Функция для создания задержки
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const useFlatsStore = defineStore('flats', () => {
  const allFlats = ref<IFlat[]>([])
  const isLoading = ref(false)

  const fetchFlats = async () => {
    isLoading.value = true

    try {
      // Имитируем задержку сети 500-1500ms
      await delay(500 + Math.random() * 1000)

      const data = await $fetch<{ flats: IFlat[] }>('/data/flats.json')
      allFlats.value = data.flats
    }
    catch (error) {
      console.error('Error fetching flats:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  // const loadMore = async () => {
  //   isLoading.value = true
  //   try {
  //     // Задержка для имитации подгрузки данных
  //     await delay(300 + Math.random() * 500)
  //
  //     const currentLength = displayedFlats.value.length
  //     const nextFlats = filteredFlats.value.slice(currentLength, currentLength + 20)
  //     displayedFlats.value = [...displayedFlats.value, ...nextFlats]
  //   }
  //   catch (err) {
  //     error.value = 'Ошибка загрузки дополнительных данных'
  //     console.error('Error loading more flats:', err)
  //   }
  //   finally {
  //     isLoading.value = false
  //   }
  // }

  return {
    allFlats,
    isLoading,
    fetchFlats,
  }
})
