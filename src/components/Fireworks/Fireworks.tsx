import React, { useEffect, useRef } from 'react'

const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const fireworks: any[] = []
    const particles: any[] = []

    const colors = [
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 0 },
    ]

    const random = (min: number, max: number) => Math.random() * (max - min) + min

    class Firework {
      x: number
      y: number
      startX: number
      startY: number
      targetX: number
      targetY: number
      distanceToTarget: number
      distanceTraveled: number
      coordinates: number[][]
      coordinateCount: number
      angle: number
      speed: number
      acceleration: number
      brightness: number
      color: any

      constructor(x: number, y: number, targetX: number, targetY: number, color: any) {
        this.x = x
        this.y = y
        this.startX = x
        this.startY = y
        this.targetX = targetX
        this.targetY = targetY

        this.distanceToTarget = Math.hypot(targetX - x, targetY - y)
        this.distanceTraveled = 0

        this.coordinates = []
        this.coordinateCount = 3

        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y])
        }

        this.angle = Math.atan2(targetY - y, targetX - x)
        this.speed = 2
        this.acceleration = 1.05
        this.brightness = random(50, 70)
        this.color = color
      }

      update(index: number) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])

        this.speed *= this.acceleration

        const vx = Math.cos(this.angle) * this.speed
        const vy = Math.sin(this.angle) * this.speed

        this.distanceTraveled = Math.hypot(this.startX - this.x, this.startY - this.y)

        if (this.distanceTraveled >= this.distanceToTarget) {
          createParticles(this.targetX, this.targetY, this.color)
          fireworks.splice(index, 1)
        } else {
          this.x += vx
          this.y += vy
        }
      }

      draw() {
        ctx.beginPath()
        ctx.moveTo(
          this.coordinates[this.coordinates.length - 1][0],
          this.coordinates[this.coordinates.length - 1][1],
        )
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${
          this.brightness / 100
        })`
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    class Particle {
      x: number
      y: number
      coordinates: number[][]
      coordinateCount: number
      angle: number
      speed: number
      friction: number
      gravity: number
      size: number
      alpha: number
      decay: number
      color: any

      constructor(x: number, y: number, color: any) {
        this.x = x
        this.y = y

        this.coordinates = []
        this.coordinateCount = 5

        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y])
        }

        this.angle = random(0, Math.PI * 2)
        this.speed = random(1, 10)

        this.friction = 0.95
        this.gravity = 0.98
        this.size = random(2, 4)
        this.alpha = 1
        this.decay = random(0.015, 0.03)

        this.color = {
          r: color.r + random(-20, 20),
          g: color.g + random(-20, 20),
          b: color.b + random(-20, 20),
        }
      }

      update(index: number) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])

        this.speed *= this.friction
        this.y += this.gravity

        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        this.alpha -= this.decay

        if (this.alpha <= this.decay) {
          particles.splice(index, 1)
        }
      }

      draw() {
        ctx.beginPath()
        ctx.moveTo(
          this.coordinates[this.coordinates.length - 1][0],
          this.coordinates[this.coordinates.length - 1][1],
        )
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`
        ctx.lineWidth = this.size
        ctx.stroke()
      }
    }

    function createParticles(x: number, y: number, color: any) {
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, color))
      }
    }

    function launchFirework() {
      const x = canvas.width * random(0.1, 0.9)
      const y = canvas.height * random(0.1, 0.5)
      const startX = canvas.width * random(0.2, 0.8)
      const startY = canvas.height
      const color = colors[Math.floor(random(0, colors.length))]

      fireworks.push(new Firework(startX, startY, x, y, color))
    }

    let animationFrame: number

    function loop() {
      animationFrame = requestAnimationFrame(loop)

      ctx.fillStyle = 'rgba(26, 199, 96, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (fireworks.length < 5 && Math.random() < 0.05) {
        launchFirework()
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw()
        fireworks[i].update(i)
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw()
        particles[i].update(i)
      }
    }

    launchFirework()
    loop()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        background: '#1AC760',
      }}
    />
  )
}

export default Fireworks
