import React, { FC, useRef } from 'react'

interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  inputClassName?: string
}

export const OtpInput: FC<OtpInputProps> = ({ length = 5, value, onChange, inputClassName }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return // Allow only digits

    const newValue = value.substring(0, index) + val + value.substring(index + 1, value.length)
    onChange(newValue)

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasteData) return

    const newValue = pasteData.slice(0, length).padEnd(length, ' ')
    onChange(newValue)

    const lastIndex = Math.min(pasteData.length, length - 1)
    inputsRef.current[lastIndex]?.focus()
  }

  return (
    <div className="flex items-center justify-center gap-2 max-w-[307px] mx-auto">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value?.[i] || ''}
          placeholder="."
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`text-center peer text-xl2 bg-inputBg shadow-input rounded-2xl p-5 h-[72px] w-full focus:placeholder-transparent focus-visible:outline-none font-outfit font-semibold leading-[150%] ${inputClassName}`}
        />
      ))}
    </div>
  )
}
