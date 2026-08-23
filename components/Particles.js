"use client"
import React, { useEffect, useRef } from 'react'

const Particles = ({ enabled = true }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return

    // willReadFrequently = false since we only write; avoids GPU readback stall
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false })

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    // Fewer particles = dramatically less O(n²) connection work
    const COUNT = 45
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.2,
    }))

    let mouse = { x: null, y: null }
    const MOUSE_DIST = 130   // connection radius from cursor
    const LINK_DIST  = 90    // connection radius between particles

    // passive: true so scroll is NEVER blocked by mouse handlers
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }

    const onClick = (e) => {
      for (let k = 0; k < 7; k++) {
        particles.push({
          x: e.clientX, y: e.clientY,
          r: Math.random() * 2 + 0.6,
          vx: (Math.random() - 0.5) * 2.6,
          vy: (Math.random() - 0.5) * 2.6,
          a: 0.95,
          isTemp: true,
        })
      }
      // Cap burst particles
      if (particles.length > COUNT + 50) particles.splice(COUNT, particles.length - COUNT)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })
    window.addEventListener('click', onClick, { passive: true })

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // ── update & draw dots ────────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.isTemp) {
          p.a -= 0.02
          if (p.a <= 0) { particles.splice(i, 1); continue }
        } else {
          if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,139,34,${p.a})`
        ctx.fill()
      }

      // ── draw links (batched for speed) ───────────────────────
      const len = particles.length
      ctx.lineWidth = 0.5

      for (let i = 0; i < len; i++) {
        const a = particles[i]

        // particle → particle (only forward pairs)
        for (let j = i + 1; j < len; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = 0.09 * (1 - Math.sqrt(d2) / LINK_DIST)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(34,139,34,${alpha})`
            ctx.stroke()
          }
        }

        // particle → mouse
        if (mouse.x !== null) {
          const dx = a.x - mouse.x
          const dy = a.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_DIST * MOUSE_DIST) {
            const dist = Math.sqrt(d2)
            // subtle attraction
            a.x += (mouse.x - a.x) * 0.012
            a.y += (mouse.y - a.y) * 0.012
            const alpha = 0.15 * (1 - dist / MOUSE_DIST)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(34,139,34,${alpha})`
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('click', onClick)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <canvas
      ref={canvasRef}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}

export default Particles
