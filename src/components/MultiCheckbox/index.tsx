import React, { useState, ChangeEvent } from 'react'

interface CheckboxOption {
  id: number
  label: string
  value: string
}

interface MultiCheckboxProps {
  options: CheckboxOption[]
  onChange: (selectedValues: string[]) => void
}

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({ options, onChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    let updatedValues = [...selectedValues]

    if (checked) {
      updatedValues.push(value)
    } else {
      updatedValues = updatedValues.filter((val) => val !== value)
    }

    setSelectedValues(updatedValues)
    onChange(updatedValues)
  }

  return (
    <div className="w-full">
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value)

        return (
          <label
            key={option.value}
            className={`
              w-full pr-14 flex bg-white items-center font-semibold relative mb-2 mt-0 rounded-2xl px-3 py-5 pl-6 cursor-pointer transition duration-300 before:absolute before:content-[''] before:top-1/2 before:w-5 before:h-5 before:border before:border-checkBorder before:bg-check before:right-5 before:rounded-md before:-translate-y-1/2 active:scale-95
              ${
                isChecked
                  ? 'outline outline-2 outline-green5 outline-offset-0 !bg-checked before:bg-green before:border-green before:bg-tick before:bg-center before:bg-no-repeat'
                  : 'shadow-card'
              }
            `}
          >
            {option.label}
            <input
              type="checkbox"
              name={option.value}
              value={option.value}
              checked={isChecked}
              onChange={handleChange}
              className="hidden"
            />
          </label>
        )
      })}
    </div>
  )
}

export default MultiCheckbox
