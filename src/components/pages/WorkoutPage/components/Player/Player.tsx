import React, { FC, useEffect, useRef, useState } from 'react'
import { IconSVG } from '@/components/IconSvg/IconSvg'
import { WorkoutData } from '@/types/interfaces'
import LoaderLogo from '@/components/LoaderLogo/LoaderLogo'
import ModalExitWorkout from '@/components/ModalExitWorkout/ModalExitWorkout'
import Congratulations from '@/components/Congratulations/Congratulations'
import { formatSeconds } from '@/helpers/formatSeconds'
import { toast } from 'sonner'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { Slider, SliderRange, SliderThumb, SliderTrack } from '@radix-ui/react-slider'
import KcalPlayer from '@/components/pages/WorkoutPage/components/Player/components/KcalPlayer'
import usePatchProgressPersonalTrainingQuery from '@/hooks/usePatchProgressPersonalTrainingQuery'

// interface
interface IExercisesInterface {
  workout: WorkoutData
  isOpen?: boolean
}

// component
const Player: FC<Readonly<IExercisesInterface>> = ({ workout, isOpen }) => {
  const [isCompletedWorkout, setIsCompletedWorkout] = useState(false)
  const trainingIndex = localStorage.getItem('trainingIndex')
  usePatchProgressPersonalTrainingQuery(isCompletedWorkout ? trainingIndex : '')

  const { isApple, isReady } = useDeviceDetect()

  const [isVideoReady, setVideoReady] = useState(false)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenCongratulations, setIsOpenCongratulations] = useState(false)
  const [isOpenControl, setIsOpenControl] = useState(false)

  const [isPlay, setIsPlay] = useState(true)
  const [isMute, setIsMute] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [dateStart, setDateStart] = useState<string | undefined>()

  const refVideo = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const pause = () => {
    refVideo.current?.pause()
    setIsPlay(false)
  }

  const play = () => {
    enterFullscreen()
    refVideo.current?.play().catch(() => {})
    setIsPlay(true)
  }

  const restart = () => {
    if (refVideo.current) {
      refVideo.current.currentTime = 0
    }
  }

  const onMute = () => {
    if (refVideo.current) {
      refVideo.current.volume = isMute ? 1 : 0
      setIsMute(!isMute)
    }
  }

  const rewind = () => {
    if (refVideo.current) {
      refVideo.current.currentTime -= 10
    }
  }

  const fastForward = () => {
    if (refVideo.current) {
      refVideo.current.currentTime += 10
    }
  }

  const handleTimeUpdate = () => {
    if (refVideo.current) {
      const current = refVideo.current.currentTime
      setCurrentTime(current)
      if (duration - current <= 60) {
        setIsCompletedWorkout(true)
      }
    }
  }

  const enterFullscreen = async () => {
    // const elem = isReady && isApple ? refVideo.current : containerRef.current

    if (isReady && isApple) {
      const videoElem = refVideo.current
      if (!videoElem) return

      try {
        if ((videoElem as any).webkitEnterFullscreen) {
          ;(videoElem as any).webkitEnterFullscreen()
        } else if (videoElem.requestFullscreen) {
          await videoElem.requestFullscreen()
        }
      } catch (err) {
        toast.error('Fullscreen failed')
      }
    } else {
      const elem = containerRef.current
      if (!elem) return

      try {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen()
        } else if ((elem as any).webkitRequestFullscreen) {
          await (elem as any).webkitRequestFullscreen()
        }

        if (screen.orientation && (screen.orientation as any).lock) {
          await (screen.orientation as any).lock('landscape').catch(() => {
            toast.error('Orientation lock failed')
          })
        }
      } catch (err) {
        toast.error('Fullscreen failed')
      }
    }
  }

  const exitFullscreen = async () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock()
      }
      await document.exitFullscreen()
    }
  }

  const onClose = () => {
    exitFullscreen()
    pause()
    setIsOpenModal(true)
  }

  const handleSliderChange = (value: number[]) => {
    const newTime = value[0]
    if (refVideo.current) {
      refVideo.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  useEffect(() => {
    if (isOpen && isVideoReady && isReady) {
      play()
    } else {
      pause()
      restart()
      setIsOpenControl(false)
    }
  }, [isOpen, isVideoReady])

  useEffect(() => {
    if (!isOpenControl) return

    const timeout = setTimeout(() => setIsOpenControl(false), 3000)

    return () => clearTimeout(timeout)
  }, [isOpenControl])

  useEffect(() => {
    if (isOpenCongratulations || !isOpen || !isVideoReady) return

    const now = new Date().toISOString()
    setDateStart(now)
  }, [isOpenCongratulations, isOpen, isVideoReady])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      if (!isFullscreen && isOpen && !isOpenCongratulations) {
        pause()
        setIsOpenModal(true)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [isOpen, isOpenCongratulations])

  // return
  return (
    <>
      <div
        className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  fixed top-0 right-0 h-full w-full z-40 bg-white border border-gray transition-all duration-300 flex flex-col`}
      >
        {!isVideoReady && !isReady && <LoaderLogo />}
        <div className={'h-full overflow-y-auto overflow-x-hidden'}>
          <div className={'relative h-full w-full'} ref={containerRef}>
            <video
              className={'w-full h-full object-contain bg-black'}
              autoPlay
              onEnded={() => {
                exitFullscreen()
                setIsOpenCongratulations(true)
              }}
              ref={(el) => {
                if (el) {
                  refVideo.current = el
                  el.addEventListener('webkitendfullscreen', () => {
                    if (isOpen && !isOpenCongratulations) {
                      pause()
                      setIsOpenModal(true)
                    }
                  })
                }
              }}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (refVideo.current) {
                  setDuration(refVideo.current.duration)
                }
              }}
              onClick={() => setIsOpenControl(!isOpenControl)}
              onCanPlayThrough={() => setVideoReady(true)}
            >
              <source src={workout.exercises[0].videos[0]} type="video/mp4" />
            </video>

            {isOpenControl && (
              <div className={'absolute top-0 left-0 w-full h-full z-20 bg-[#00000033]'}>
                <div
                  className="absolute top-7 left-[42px]  flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
                  onClick={() => onMute()}
                >
                  <IconSVG type={isMute ? 'SOUND_OFF' : 'SOUND_ON'} height={28} width={28} />
                </div>

                <div
                  className="absolute top-7 right-[42px]  flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
                  onClick={() => onClose()}
                >
                  <IconSVG type={'CLOSE'} height={24} width={24} />
                </div>

                <div
                  className={
                    'absolute grid grid-cols-[auto_auto_auto] gap-10 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
                  }
                >
                  <div
                    className="  flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
                    onClick={() => rewind()}
                  >
                    <IconSVG type={'REVIND'} height={24} width={24} />
                  </div>

                  <div
                    className=" flex items-center justify-center w-[96px] h-[96px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] "
                    onClick={isPlay ? () => pause() : () => play()}
                  >
                    <IconSVG type={isPlay ? 'PAUSE' : 'PLAY'} height={40} width={40} />
                  </div>

                  <div
                    className="  flex items-center justify-center w-[48px] h-[48px] rounded-full transition active:scale-95 backdrop-blur-2xl bg-[#0000003D] z-20"
                    onClick={() => fastForward()}
                  >
                    <IconSVG type={'FAST_FORWARD'} height={24} width={24} />
                  </div>
                </div>

                <div
                  className={
                    'absolute bottom-0 left-0 px-[50px] pb-[24px] w-full font-sans  select-none'
                  }
                >
                  <div className={'flex justify-between items-end mb-[5px] '}>
                    <div className={'flex gap-[4px] text-base font-medium '}>
                      <span className={'text-white'}>{formatSeconds(Math.round(currentTime))}</span>
                      <span className={'text-[#B7BABE] '}>/</span>
                      <span className={'text-[#B7BABE]'}>
                        {formatSeconds(Math.round(duration))}
                      </span>
                    </div>

                    <div className={'flex gap-[4px] text-base font-medium'}>
                      <span className={'text-white'}>
                        {dateStart && <KcalPlayer workout={workout} dateStart={dateStart} />}
                      </span>
                      <span className={'text-[#B7BABE]  '}>Kcal</span>
                    </div>
                  </div>

                  <Slider
                    className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                    value={[currentTime]}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={handleSliderChange}
                  >
                    <SliderTrack className="bg-[#B3B3B34F] relative grow rounded-full h-2">
                      <SliderRange className="absolute bg-[#13D16A] rounded-full h-full" />
                    </SliderTrack>
                    <SliderThumb
                      className="block w-[13px] h-[13px] bg-white rounded-full shadow-lg outline-none transition-transform active:scale-125"
                      aria-label="Seek video"
                    />
                  </Slider>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalExitWorkout
        onClose={() => {
          play()
          setIsOpenModal(false)
        }}
        isCompletedWorkout={isCompletedWorkout}
        isOpenModal={isOpenModal}
      />

      {isOpenCongratulations && dateStart && (
        <Congratulations workout={workout} dateStart={dateStart} trainingIndex={trainingIndex} />
      )}
    </>
  )
}

export default Player
