import React, { useEffect, useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import { useTranslation } from 'react-i18next'
import useWorkoutsGroups from '@/hooks/useWorkoutsGroups'
import { Loader } from '@/components/Loader/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard'
import { Button } from '@/components/Button/Button'
import { WorkoutData } from '@/types/interfaces'
import Header from '@/components/Header/Header'

// component
const WorkoutsPage = () => {
  const { t } = useTranslation()
  const typesLevels = { NEWBIE: t('newbie'), MEDIUM: t('medium'), ADVANCED: t('advanced') }
  const { idWorkoutsGroups } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useWorkoutsGroups()
  const [workouts, setWorkouts] = useState<WorkoutData[] | undefined>()
  const [activeTab, setActiveTab] = useState<string>()

  const group = useMemo(
    () => data?.find((el: { id: string }) => el.id === idWorkoutsGroups),
    [data, idWorkoutsGroups],
  )

  const levels = useMemo(() => {
    const arr = data
      ?.find((el: { id: string }) => el.id === idWorkoutsGroups)
      ?.workouts.map((el) => {
        return el.difficultyLevel
      })

    return Array.from(new Set(arr))
  }, [data])

  useEffect(() => {
    if (data) {
      setWorkouts(data?.find((el: { id: string }) => el.id === idWorkoutsGroups)?.workouts)
    }
  }, [data])

  useEffect(() => {
    if (activeTab) {
      setWorkouts(
        data
          ?.find((el: { id: string }) => el.id === idWorkoutsGroups)
          ?.workouts.filter((el) => el.difficultyLevel === activeTab),
      )
    } else {
      setWorkouts(data?.find((el: { id: string }) => el.id === idWorkoutsGroups)?.workouts)
    }
  }, [activeTab])

  return (
    <Layout>
      {group && (
        <div className="overflow-y-auto min-h-full overflow-x-hidden pb-[70px]">
          <Header
            fixed
            title={group.name}
            showBtn={true}
            withShadow={true}
            onBackClick={() => navigate(-1)}
          />
          <div className={' px-4 pt-8 '}>
            {isLoading ? (
              <Loader />
            ) : (
              <div className={'grid gap-2'}>
                <div className={'w-full overflow-x-auto'}>
                  <div className={'flex gap-2 w-fit mb-3'}>
                    <Button
                      onClick={() => setActiveTab(undefined)}
                      variant={!activeTab ? 'green-small' : 'white-small'}
                    >
                      {t('all')}
                    </Button>

                    {levels?.map((level, key) => (
                      <Button
                        onClick={() => setActiveTab(level)}
                        key={`${key}-${level}`}
                        variant={level === activeTab ? 'green-small' : 'white-small'}
                      >
                        {typesLevels[level]}
                      </Button>
                    ))}
                  </div>
                </div>

                <h4 className={'font-medium'}>
                  {t('workouts')} ({workouts?.length})
                </h4>

                {workouts?.map((item, key) => (
                  <WorkoutCard key={`${key}-${item?.id}`} workout={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default WorkoutsPage
