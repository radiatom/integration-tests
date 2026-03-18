import React, { useEffect, useRef } from 'react'

type DepthTier = {
  name: string
  durationThreshold: number | 'default'
  blurMin: number
  blurMax: number
  opacityMin: number
  opacityMax: number
  zIndex: string
}

const FloatingStars = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const config = {
      numStars: 240,
      defaultBgColor: '#17C85E',
      defaultStarColor: '#D4F715',
      size: {
        smallChance: 0.7,
        smallMin: 1,
        smallMax: 2.5,
        largeMin: 2,
        largeMax: 4,
      },
      duration: {
        min: 8,
        max: 30,
      },
      depthTiers: [
        {
          name: 'close',
          durationThreshold: 12,
          blurMin: 0,
          blurMax: 0.5,
          opacityMin: 0.8,
          opacityMax: 1,
          zIndex: '2',
        },
        {
          name: 'mid',
          durationThreshold: 20,
          blurMin: 0.5,
          blurMax: 2,
          opacityMin: 0.5,
          opacityMax: 0.8,
          zIndex: '1',
        },
        {
          name: 'far',
          durationThreshold: 'default',
          blurMin: 1.5,
          blurMax: 3.5,
          opacityMin: 0.2,
          opacityMax: 0.5,
          zIndex: '0',
        },
      ] as DepthTier[],
    }

    const container = containerRef.current!
    if (!container) return

    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min

    const setBackgroundColor = (color: string) => {
      container.style.backgroundColor = color
    }

    const setStarColor = (color: string) => {
      container.style.setProperty('--star-color', color)
    }

    const createStars = () => {
      container.innerHTML = ''

      for (let i = 0; i < config.numStars; i++) {
        const star = document.createElement('div')
        star.className = 'star'

        // SIZE
        const isSmall = Math.random() < config.size.smallChance
        const size = isSmall
          ? randomRange(config.size.smallMin, config.size.smallMax)
          : randomRange(config.size.largeMin, config.size.largeMax)

        star.style.width = `${size}px`
        star.style.height = `${size}px`

        // POSITION
        star.style.left = `${Math.random() * 100}%`

        // ANIMATION
        const duration = randomRange(config.duration.min, config.duration.max)
        star.style.animationDuration = `${duration}s`
        star.style.animationDelay = `${Math.random() * (duration / 2)}s`

        // DEPTH
        let tier =
          config.depthTiers.find((t) => t.durationThreshold === 'default') || config.depthTiers[0]

        for (const t of config.depthTiers) {
          if (t.durationThreshold !== 'default' && duration < t.durationThreshold) {
            tier = t
            break
          }
        }

        const blur = randomRange(tier.blurMin, tier.blurMax)
        const opacity = randomRange(tier.opacityMin, tier.opacityMax)

        star.style.filter = `blur(${blur}px)`
        star.style.opacity = opacity.toString()
        star.style.zIndex = tier.zIndex

        container.appendChild(star)
      }
    }

    // INIT
    setBackgroundColor(config.defaultBgColor)
    setStarColor(config.defaultStarColor)
    createStars()

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return (
    <>
      <style>{`
        .stars-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: -1;
          --star-color: #ffffff;
        }

        .star {
          position: absolute;
          background-color: var(--star-color);
          border-radius: 50%;
          animation: float-star linear infinite;
          will-change: transform, opacity, filter;
        }

        @keyframes float-star {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh);
            opacity: 0;
          }
        }
      `}</style>

      <div ref={containerRef} className="stars-container" />
    </>
  )
}

export default FloatingStars
