import React, { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { EffectCreative } from 'swiper/modules'
import { WorkoutData } from '@/types/interfaces'
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard'
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer'
import { Button } from '@/components/Button/Button'
import LoaderLogo from '@/components/LoaderLogo/LoaderLogo'
import ModalExitWorkout from '@/components/ModalExitWorkout/ModalExitWorkout'
import Congratulations from '@/components/Congratulations/Congratulations'
import NextUp from '@/components/pages/WorkoutPage/components/Exercises/components/NextUp'
import CountExercises from '@/components/pages/WorkoutPage/components/Exercises/components/CountExercises'
import Timer from '@/components/pages/WorkoutPage/components/Exercises/components/Timer'

// interface
interface IExercisesInterface {
  workout: WorkoutData
  isOpen?: boolean
}

const timeWait = 10

// component
const Exercises: FC<Readonly<IExercisesInterface>> = ({ workout, isOpen }) => {
  const { t } = useTranslation()
  const trainingIndex = localStorage.getItem('trainingIndex')
  const [isMusicReady, setMusicReady] = useState(false)
  const [isAiReady, setAiReady] = useState(false)
  const [isVideoReady, setVideoReady] = useState(false)

  const [swiper, setSwiper] = useState<SwiperRef['swiper'] | null>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenCongratulations, setIsOpenCongratulations] = useState(false)
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [indexActiveVideo, setIndexActiveVideo] = useState(0)
  const [duration, setDuration] = useState(
    timeWait + Number(workout.exercises[activeSlide].duration),
  )
  const [isOpenNextUp, setIsOpenNextUp] = useState(true)
  const [isPlay, setIsPlay] = useState(true)
  const [dateStart, setDateStart] = useState<string | undefined>()
  const refVideo = useRef<HTMLAudioElement | null>(null)
  const refsSpeak = useRef<HTMLAudioElement[]>([])
  const refMusic = useRef<HTMLAudioElement | null>(null)

  const pause = (exKey: number) => {
    refVideo.current?.pause()
    refsSpeak.current[exKey]?.pause()
    setIsPlay(false)
  }

  const play = (exKey: number) => {
    refVideo.current?.play().catch(() => {})
    refsSpeak.current[exKey]?.play().catch(() => {})
    setIsPlay(true)
  }

  const playAll = (exKey: number) => {
    play(exKey)
    refMusic.current?.play().catch(() => {})
  }

  const pauseAll = (exKey: number) => {
    pause(exKey)
    refMusic.current?.pause()
  }

  const restart = (exKey: number) => {
    if (refVideo.current) {
      refVideo.current.currentTime = 0
    }

    if (refsSpeak.current[exKey]) {
      refsSpeak.current[exKey].currentTime = 0
    }
  }

  const restartAll = (exKey: number) => {
    restart(exKey)

    if (refMusic.current) {
      refMusic.current.pause()
      refMusic.current.currentTime = 0
    }
  }

  const onNextSlide = () => {
    if (workout.exercises.length === activeSlide + 1) {
      setIsOpenCongratulations(true)
      pauseAll(activeSlide)
    } else {
      swiper?.slideNext()
    }
  }

  useEffect(() => {
    if (isOpen && isMusicReady && isAiReady && isVideoReady) {
      if (refMusic.current) {
        refMusic.current.volume = 0.3
      }
      playAll(activeSlide)
      setIsOpenNextUp(true)
    } else {
      setActiveSlide(0)
      restartAll(activeSlide)
      pauseAll(activeSlide)
      setIsOpenNextUp(false)
      setIsOpenControl(false)
    }
  }, [isOpen, isMusicReady, isAiReady, isVideoReady])

  useEffect(() => {
    if (!isOpenControl) return

    const timeout = setTimeout(() => setIsOpenControl(false), 3000)

    return () => clearTimeout(timeout)
  }, [isOpenControl])

  useEffect(() => {
    if (isOpenCongratulations || !isOpen || !isMusicReady || !isAiReady || !isVideoReady) return

    const now = new Date().toISOString()
    setDateStart(now)
  }, [isOpenCongratulations, isOpen, isMusicReady, isAiReady, isVideoReady])

  // return
  return (
    <>
      <div
        className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  fixed top-0 right-0 h-full w-full z-40 bg-white border border-gray transition-all duration-300 flex flex-col`}
      >
        {(!isAiReady || !isMusicReady || !isVideoReady) && <LoaderLogo />}
        <div
          className={
            'grid  grid-rows-[auto_1fr] shortHeight:grid-rows-[1fr_auto] h-full max-w-content mx-auto overflow-y-auto overflow-x-hidden'
          }
        >
          <audio
            className={'absolute z-[-1]'}
            src={workout.track}
            ref={refMusic}
            loop
            onCanPlayThrough={isMusicReady ? undefined : () => setMusicReady(true)}
          />

          <div
            className="absolute top-4 right-4  flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
            onClick={() => setIsOpenModal(true)}
          >
            <IconSVG type={'CLOSE'} height={24} width={24} />
          </div>

          <Swiper
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            modules={[EffectCreative]}
            className={'w-full h-[415px] shortHeight:h-full'}
            onSwiper={setSwiper}
            onSlideChange={(e) => {
              pause(activeSlide)
              setIndexActiveVideo(0)
              restart(e.activeIndex)
              playAll(e.activeIndex)
              setActiveSlide(e.activeIndex)
              setIsOpenNextUp(true)
              setIsPlay(true)
              setIsOpenControl(false)
              setDuration(timeWait + Number(workout.exercises[e.activeIndex].duration))
            }}
          >
            {workout.exercises.map((ex, key) => (
              <SwiperSlide key={`${key}-${ex.id}`} className={'relative h-full w-full'}>
                <audio
                  key={`${key}-${ex.id}-${ex.record}speak`}
                  className={'absolute z-[-1]'}
                  src={ex.record}
                  loop={false}
                  ref={(el) => (refsSpeak.current[key] = el!)}
                  onCanPlayThrough={isAiReady ? undefined : () => setAiReady(true)}
                />

                {activeSlide === key && (
                  <video
                    className={'w-full h-full object-cover'}
                    key={`${key}--video-${indexActiveVideo}`}
                    loop={ex.videos.length === 1}
                    autoPlay
                    muted
                    playsInline
                    preload={activeSlide === key ? 'auto' : 'none'}
                    ref={(el) => {
                      if (el) {
                        refVideo.current = el
                      }
                    }}
                    onEnded={() => {
                      setIndexActiveVideo(
                        ex.videos[indexActiveVideo + 1] ? indexActiveVideo + 1 : 0,
                      )
                    }}
                    onClick={() => setIsOpenControl(!isOpenControl)}
                    onCanPlayThrough={isVideoReady ? undefined : () => setVideoReady(true)}
                  >
                    <source src={ex.videos[indexActiveVideo]} type="video/mp4" />
                  </video>
                )}

                {isOpenNextUp && key === activeSlide && (
                  <NextUp
                    timeWait={timeWait}
                    onBlur={() => setIsOpenControl(!isOpenControl)}
                    onClose={() => setIsOpenNextUp(false)}
                    isStop={!isPlay}
                  />
                )}

                {isOpenControl && (
                  <div
                    className="absolute bottom-[97px] left-1/2 -translate-x-1/2 flex items-center justify-center w-[96px] h-[96px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
                    onClick={isPlay ? () => pauseAll(key) : () => playAll(key)}
                  >
                    <IconSVG type={isPlay ? 'PAUSE' : 'PLAY'} height={40} width={40} />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={'mt-[-40px] rounded-[32px_32px_0_0] bg-[#F9FAFB] p-4 z-10'}>
            <CountExercises count={workout.exercises.length} activeNumber={activeSlide} />

            <div
              className={
                ' mb-[23px] rounded-r16 shadow-[0px_1px_2px_0px_#0000000A,0px_2px_4px_0px_#00000005] bg-white'
              }
            >
              <div
                className={'grid grid-cols-[104px_1fr_104px] h-[88px] w-full border-b border-gray'}
              >
                <div className={'grid items-center justify-items-center border-r border-gray'}>
                  <div className={'grid justify-items-center '}>
                    {isOpen && (
                      <p className={'text-xl2 font-semibold'}>
                        <Timer
                          isRunning={
                            !isOpenCongratulations &&
                            isOpen &&
                            isMusicReady &&
                            isAiReady &&
                            isVideoReady
                          }
                        />
                      </p>
                    )}
                    <p className={'text-xs font-medium text-gray9'}>{t('elapsed')}</p>
                  </div>
                </div>

                <div className={'grid items-center justify-items-center '}>
                  {isOpen && (
                    <CountdownTimer
                      initialSeconds={duration}
                      isStop={!isPlay}
                      classNameWrapper={'font-semibold text-xl6'}
                      key={`${activeSlide}-timer`}
                      onEnd={() => onNextSlide()}
                    />
                  )}
                </div>

                <div className={'grid items-center justify-items-center border-l border-gray'}>
                  <div className={'grid justify-items-center '}>
                    <p className={'text-xl2 font-semibold'}>{activeSlide + 1}</p>
                    <p className={'text-xs font-medium text-gray9'}>
                      {t('of')} {workout.exercises.length}
                    </p>
                  </div>
                </div>
              </div>

              <ExerciseCard exercise={workout.exercises[activeSlide]} />
            </div>

            <div className={'grid grid-cols-[1fr_1fr] gap-[8px] '}>
              <Button
                variant={'outline'}
                onClick={() => swiper?.slidePrev()}
                disabled={swiper?.activeIndex === 0}
              >
                {t('prew')}
              </Button>

              <Button variant={'outline'} onClick={() => onNextSlide()}>
                {t('next')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ModalExitWorkout onClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal} />

      {isOpenCongratulations && dateStart && (
        <Congratulations workout={workout} dateStart={dateStart} trainingIndex={trainingIndex} />
      )}
    </>
  )
}

export default Exercises
