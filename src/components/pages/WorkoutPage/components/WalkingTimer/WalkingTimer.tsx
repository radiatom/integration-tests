import React, { FC, useEffect, useRef, useState } from 'react'
import { WorkoutData } from '@/types/interfaces'
import LoaderLogo from '@/components/LoaderLogo/LoaderLogo'
import ModalExitWorkout from '@/components/ModalExitWorkout/ModalExitWorkout'
import Congratulations from '@/components/Congratulations/Congratulations'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer'
import { clsx } from 'clsx'
import CircularProgress from '@/components/pages/WorkoutPage/components/WalkingTimer/components/CircularProgress/CircularProgress'
import { getRemainingTime } from '@/components/pages/WorkoutPage/components/WalkingTimer/service'
import { useKeepAlive } from '@/hooks/useKeepAlive'

// interface
interface IExercisesInterface {
  workout: WorkoutData
  isOpen?: boolean
}

// component
const WalkingTimer: FC<Readonly<IExercisesInterface>> = ({ workout, isOpen }) => {
  const trainingIndex = localStorage.getItem('trainingIndex')

  const [isAudioReady, setAudioReady] = useState(false)
  const refsSpeak = useRef<HTMLAudioElement[]>([])
  const [activeExercise, setActiveExercise] = useState(0)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenCongratulations, setIsOpenCongratulations] = useState(false)

  const [isPlay, setIsPlay] = useState(true)
  const [dateStart, setDateStart] = useState<string | undefined>()
  const [timeActivity, setTimeActivity] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(getRemainingTime(0, workout))
  const [timeExerciseLeft, setTimeExerciseLeft] = useState(
    Number(workout.exercises[activeExercise].duration),
  )

  useKeepAlive(isPlay && isOpen, activeExercise)

  const pause = (index: number) => {
    refsSpeak.current[index]?.pause()
    setIsPlay(false)
  }

  const play = (index: number) => {
    refsSpeak.current[index]?.play().catch(() => {})
    setIsPlay(true)
  }

  const restart = (index: number) => {
    if (refsSpeak.current[index]) {
      refsSpeak.current[index].currentTime = 0
    }
  }

  const onClose = () => {
    pause(activeExercise)
    setIsOpenModal(true)
  }

  const onEnd = () => {
    pause(activeExercise)
    setIsOpenCongratulations(true)
  }

  const onChangeExercises = (index: number, exerciseLeft: number) => {
    pause(activeExercise)
    restart(index)
    play(index)
    setActiveExercise(index)
    if (exerciseLeft <= 0) {
      onEnd()
    } else {
      setTimeExerciseLeft(exerciseLeft)
    }
  }

  const onNextExercises = () => {
    const nextKey = activeExercise + 1
    if (nextKey > workout.exercises.length - 1) {
      onEnd()
    } else {
      onChangeExercises(nextKey, Number(workout.exercises[nextKey].duration))
      setSecondsLeft(getRemainingTime(nextKey, workout))
    }
  }

  useEffect(() => {
    if (isOpen && isAudioReady) {
      play(activeExercise)
    } else {
      pause(activeExercise)
      restart(activeExercise)
    }
  }, [isOpen, isAudioReady])

  useEffect(() => {
    if (isOpenCongratulations || !isOpen || !isAudioReady) return

    const now = new Date().toISOString()
    setDateStart(now)
  }, [isOpenCongratulations, isOpen, isAudioReady])

  useEffect(() => {
    if (secondsLeft <= 0) {
      onEnd()
    }
  }, [secondsLeft])

  // return
  return (
    <>
      <div
        className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  fixed top-0 right-0 h-full w-full z-40 bg-[#F9FAFB] border border-gray transition-all duration-300 flex flex-col`}
      >
        {!isAudioReady && <LoaderLogo />}
        <div
          className={
            'grid justify-items-center h-full grid-rows-[auto_auto_1fr_auto] max-w-content w-full px-4 pb-[34px] mx-auto overflow-y-auto overflow-x-hidden'
          }
        >
          {workout.exercises.map((exercise, key) => (
            <audio
              key={`${key}-${exercise.id}-${exercise.record}speak`}
              className={'absolute z-[-1]'}
              src={exercise.record}
              preload="auto"
              ref={(el) => (refsSpeak.current[key] = el!)}
              onCanPlayThrough={isAudioReady ? undefined : () => setAudioReady(true)}
            />
          ))}

          <div
            className={
              'grid w-full h-fit items-center grid-cols-[40px_1fr_40px] py-4 mb-[41px] shortHeight:mb-5'
            }
          >
            <div
              className="flex items-center justify-center w-[40px] h-[40px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#00000008] z-20"
              onClick={() => onClose()}
            >
              <IconSVG type={'CLOSE'} height={16} width={16} fill={'#B7BABE'} />
            </div>

            <p className={'text-center px-1'}>{workout.name}</p>
            <div />
          </div>

          <CircularProgress
            workout={workout}
            isPlay={isPlay}
            setSecondsLeft={setSecondsLeft}
            secondsLeft={secondsLeft}
            onChangeExercises={onChangeExercises}
            activeExercise={activeExercise}
            timeActivity={timeActivity}
            setTimeActivity={setTimeActivity}
          />

          <div
            className={
              'grid w-full h-fit grid-cols-[auto_1fr_auto] gap-[20px] items-center py-[25px] px-3 mt-8 mb-[30px] shortHeight:mt-4 shortHeight:mb-4 rounded-[32px] shadow-[0px_1px_2px_0px_#0000000A,0px_2px_4px_0px_#00000005] bg-white'
            }
          >
            <div
              className={clsx(
                'flex  rotate-180 items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20',
                {
                  'opacity-30 pointer-events-none': activeExercise === 0,
                },
              )}
              onClick={() => {
                onChangeExercises(
                  activeExercise - 1,
                  Number(workout.exercises[activeExercise - 1].duration),
                )
                setSecondsLeft(getRemainingTime(activeExercise - 1, workout))
              }}
            >
              <IconSVG type={'NEXT'} height={16} width={16} />
            </div>

            <div className={'w-full grid justify-items-center gap-1'}>
              <p className={'text-center px-1 text-wrap font-semibold'}>
                {workout.exercises[activeExercise].name}
              </p>

              <CountdownTimer
                initialSeconds={timeExerciseLeft}
                classNameWrapper={'text-base font-medium text-secondary'}
                isStop={!isPlay}
              />
            </div>

            <div
              className="flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
              onClick={() => onNextExercises()}
            >
              <IconSVG type={'NEXT'} height={16} width={16} />
            </div>
          </div>

          <div className={'grid h-full justify-items-center'}>
            <div
              className={clsx(
                ' flex items-center justify-center w-[96px] h-[96px] rounded-full transition active:scale-95 backdrop-blur-2xl  z-20',
                {
                  'bg-[#FF5858] shadow-[0px_6px_14px_0px_#D74D5B0F,0px_12px_24px_0px_#EC6E7B0D]':
                    isPlay,
                },
                {
                  'bg-[#13D16A] shadow-[0px_5px_10px_0px_#7AEC6E29,0px_10px_25px_0px_#7AEC6E29]':
                    !isPlay,
                },
              )}
              onClick={isPlay ? () => pause(activeExercise) : () => play(activeExercise)}
            >
              <IconSVG type={isPlay ? 'PAUSE' : 'PLAY'} height={40} width={40} />
            </div>
          </div>
        </div>
      </div>

      <ModalExitWorkout
        onClose={() => {
          play(activeExercise)
          setIsOpenModal(false)
        }}
        isOpenModal={isOpenModal}
      />

      {isOpenCongratulations && dateStart && (
        <Congratulations
          workout={workout}
          timeActivity={timeActivity}
          trainingIndex={trainingIndex}
        />
      )}
    </>
  )
}

export default WalkingTimer
