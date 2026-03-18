import React, { createContext, useState, useContext, ReactNode } from 'react'
import { Button } from '@/components/Button/Button'

import logoPopupSvg from '@/assets/images/svg/logo-mini.svg'

interface PopupContentType {
  title: string
  description: string
  buttonText: string
  onButtonClick: () => void
}

interface PopupContextType {
  isOpen: boolean
  setOpen: (open: boolean) => void
  setPopupContent: (content: PopupContentType) => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export const usePopup = () => {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const [popupContent, setPopupContent] = useState<PopupContentType>({
    title: '',
    description: '',
    buttonText: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onButtonClick: () => {},
  })

  return (
    <PopupContext.Provider value={{ isOpen, setOpen, setPopupContent }}>
      {children}
      {isOpen && (
        <Popup
          title={popupContent.title}
          description={popupContent.description}
          buttonText={popupContent.buttonText}
          onButtonClick={popupContent.onButtonClick}
          setOpen={setOpen}
        />
      )}
    </PopupContext.Provider>
  )
}

const Popup: React.FC<PopupContentType & { setOpen: (open: boolean) => void }> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  setOpen,
}) => {
  return (
    <div className="fixed py-5 px-5 inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-full bg-white p-6 pb-10 rounded-lg shadow-lg text-center">
        <img src={logoPopupSvg} alt={'logo'} className={'mx-auto my-0'} />
        <h2 className="text-xl2 font-bold mb-4" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="mb-10 text-grayA1" dangerouslySetInnerHTML={{ __html: description }} />
        <Button
          onClick={() => {
            onButtonClick()
            setOpen(false)
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
