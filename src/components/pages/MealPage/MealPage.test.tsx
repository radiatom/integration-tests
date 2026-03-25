import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/test-utils'
import MealPage from '@/components/pages/MealPage/MealPage'
import { RecipeData } from '@/types/interfaces'
import useMeal from '@/hooks/useMeal'

const meal = {
  id: '64f058286c722107f27bfdec',
  name: 'Poached Egg and Avocado Toasts',
  description:
    '1. Poach the egg. \n2. Cut two slices of bread of the desired weight. \n3. Cut the avocado and tomatoes. \n4. Place tomatoes, avocado, and poached eggs on the bread. \n5. Optionally, sprinkle the toasts with lemon juice.',
  cover:
    'https://dnaa3818zsk1p.cloudfront.net/meal/image/64f058286c722107f27bfdec?Expires=1774533927&Key-Pair-Id=K28RKBS7PXHUPB&Signature=ai~xG2t0nEImiJD95ZZggvmMYKjOLH-Giz0Ede1Ovbqntkie-x2KWdi6m5lLBKLNDuTabsypF~AXRdzq4ddcXfg5T9oyuZj9c~YoI74enwab0cAlnD8QVm~q-E3jEmCcmQ6fEkwXsS3sB1PaY3eVlyOiHQTXpicYth7BjqqThhTlCHIIzVA6DN7VoDnkRvN9gh6iWJjyHGX8RfTGVb8B0OsyOh2fzXfUSfPrtNjoAh~oPMQDQhHBrFof5LqU8ZWAQ0k0D5WnUySAMjEg8sppls7IAZEnSTzke7EfhTZ45pv3Lv4rLrrHMcSyxcsXDYo2OYBE1X-Pas1T776XynXa7g__',
  cookTime: '15 min',
  kCal: '410',
  proteins: {
    ounces: '0.6',
  },
  carbs: {
    ounces: '1.5',
  },
  fat: {
    ounces: '0.6',
  },
  ingredients: [
    {
      name: 'Whole-grain bread',
      weight: '2.8',
      metricType: 'ounces',
    },
    {
      name: 'Poached eggs - 2 pcs',
      metricType: 'ounces',
    },
    {
      name: 'Avocado',
      weight: '1.7',
      metricType: 'ounces',
    },
    {
      name: 'Tomatoes',
      weight: '1.7',
      metricType: 'ounces',
    },
  ],
  mealType: 'breakfast',
  mealCategory: '1',
  dietType: 'lactose-free',
}

jest.mock('@/hooks/useMeal')

const mockUseMeal = ({
  data,
  isLoading,
}: {
  data: { page: RecipeData } | undefined
  isLoading: boolean
}) =>
  (useMeal as jest.Mock).mockReturnValue({
    data,
    isLoading,
  })

describe('MealPage folder', () => {
  test('name test', () => {
    mockUseMeal({ data: { page: meal as RecipeData }, isLoading: false })
    render(<MealPage />)

    screen.debug()
  })
})
