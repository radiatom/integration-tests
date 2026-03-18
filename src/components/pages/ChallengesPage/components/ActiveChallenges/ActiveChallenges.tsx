import React, { FC, useEffect, useState } from 'react'
import { Challenge, ChallengeCategory } from '@/types/interfaces'
import { Button } from '@/components/Button/Button'
import { useTranslation } from 'react-i18next'
import ChallengeCard from '@/components/pages/ChallengesPage/components/ActiveChallenges/components/ChallengeCard'

// interface
interface IActiveChallengesProps {
  challengesData: Challenge[]
}

// component
const ActiveChallenges: FC<Readonly<IActiveChallengesProps>> = ({ challengesData }) => {
  const { t } = useTranslation()
  const [challenges, setChallenges] = useState(challengesData)
  const [category, setCategory] = useState<ChallengeCategory | null>(null)

  const categories = challengesData
    .map((el) => el.challengeId.categoryId)
    .filter((value, index, self) => index === self.findIndex((t) => t._id === value._id))

  const onChangeCategory = (cat: ChallengeCategory | null) => {
    if (cat) {
      if (cat.slug !== category?.slug) {
        setCategory(cat)
        setChallenges(challengesData.filter((el) => el.challengeId.categoryId.slug === cat.slug))
      }
    } else {
      if (cat !== category) setCategory(null)
      setChallenges(challengesData)
    }
  }

  useEffect(() => {
    setChallenges(challengesData)
  }, [challengesData])

  // return
  return (
    <div>
      <h3 className={'font-medium mb-3 pl-2'}>
        {t('activeChallenges')} ({challengesData.length})
      </h3>

      <div className={'flex gap-2 w-[calc(100%_+32px)] overflow-x-auto -mx-4 px-6 pb-5'}>
        <Button
          variant={category === null ? 'green-small' : 'white-small'}
          onClick={() => onChangeCategory(null)}
        >
          {t('all')}
        </Button>

        {categories.map((cat, key) => (
          <Button
            variant={category?.slug === cat.slug ? 'green-small' : 'white-small'}
            onClick={() => onChangeCategory(cat)}
            key={`${cat.slug}-${key}`}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <div className={'grid gap-2'}>
        {challenges.map((ch, key) => (
          <ChallengeCard key={`${ch._id}-${key}-active`} challenge={ch} />
        ))}
      </div>
    </div>
  )
}

export default ActiveChallenges
