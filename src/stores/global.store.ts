import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { FastingModel } from '@/components/pages/FastingPage/types/index.types'

interface completedFasting {
  dateStart: string
  fastingModel: FastingModel
  fastingMinutes: number
  progress: number
}

interface IState {
  dateStartFasting: string | null
  completedFastings: completedFasting[] | null
}

interface IStore extends IState {
  handleChangeGlobalStore: (value: Partial<IState>) => void
}

const nameStore = 'fit4me'

// global store
export const useGlobalStore = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        dateStartFasting: null,
        completedFastings: null,
        handleChangeGlobalStore: (value) => set((state) => ({ ...state, ...value })),
      }),
      {
        name: nameStore,
        version: 1,
      },
    ),
    {
      enabled: typeof window !== 'undefined' && process.env.NODE_ENV !== 'production',
    },
  ),
)
