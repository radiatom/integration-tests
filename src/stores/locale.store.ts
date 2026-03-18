import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Modals = 'error' | 'success' | null

export interface ILocalState {
  isOpenModal: boolean
  modalComponent: Modals | null
}

interface ILocalStore extends ILocalState {
  handleChangeLocaleStore: (value: Partial<ILocalState>) => void
  handleOpenModal: (name: Modals) => void
}

export const useLocalStore = create<ILocalStore>()(
  devtools(
    (set) => ({
      isOpenModal: false,
      modalComponent: null,
      handleChangeLocaleStore: (value: any) => set((state: any) => ({ ...state, ...value })),
      handleOpenModal: (name: Modals) =>
        set((state: any) =>
          name
            ? { ...state, modalComponent: name, isOpenModal: true }
            : { ...state, isOpenModal: false },
        ),
    }),
    { enabled: typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' },
  ),
)
