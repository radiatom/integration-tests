import React from 'react'
import Layout from '@/components/Layout'
import { useTranslation } from 'react-i18next'
import useWorkoutsGroups from '@/hooks/useWorkoutsGroups'
import { Loader } from '@/components/Loader/Loader'
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard'

// component
const WorkoutsGroupsPage = () => {
  const { t } = useTranslation()
  const { data: workoutsGroups, isLoading } = useWorkoutsGroups()

  return (
    <Layout>
      <div className="overflow-y-auto min-h-full overflow-x-hidden pb-[70px]">
        <h3
          className={
            'text-xl4 font-semibold text-dark py-[14px] px-[16px] shadow-header sticky top-0 left-0 bg-white z-10'
          }
        >
          {t('workouts')}
        </h3>

        {isLoading ? (
          <Loader />
        ) : (
          <div className={'grid gap-2 p-4'}>
            {workoutsGroups?.map((item, key) => (
              <WorkoutCard key={`${key}-${item.id}`} workoutsGroup={item} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default WorkoutsGroupsPage
