"use client"
import { useEffect, useState, useRef } from "react"

const STEPS = [
  { at: 10,  text: "Initializing environment..." },
  { at: 30,  text: "Loading components..." },
  { at: 55,  text: "Compiling styles..." },
  { at: 75,  text: "Connecting services..." },
  { at: 95,  text: "Finalizing portfolio..." },
]

/* ── tiny canvas: animated green particle plexus ── */
const LoaderCanvas = () => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    const pts = Array.from({ length: 38 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(40,200,100,0.55)'; ctx.fill()
      })
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 90) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(34,139,34,${0.12 * (1 - d / 90)})`
          ctx.lineWidth = 0.6; ctx.stroke()
        }
      }))
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf, start
    const duration = 1800
    const tick = (ts) => {
      if (!start) start = ts
      const p = Math.min(100, Math.round(((ts - start) / duration) * 100))
      setProgress(p)
      if (p < 100) { raf = requestAnimationFrame(tick) }
      else { setTimeout(() => onFinish?.(), 300) }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onFinish])

  const logs = STEPS.filter(s => progress >= s.at)

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center select-none overflow-hidden"
      style={{ background: '#020704', fontFamily: "'Courier New', monospace" }}>

      {/* ── animated canvas background ── */}
      <LoaderCanvas />

      {/* ── slow drifting radial glow ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(34,139,34,0.13) 0%, transparent 70%)',
          animation: 'glowPulse 4s ease-in-out infinite' }} />

      {/* ── card ── */}
      <div className="relative z-10 w-[92%] max-w-[480px] rounded-2xl p-7"
        style={{
          background: 'rgba(4,12,6,0.92)',
          border: '1px solid rgba(40,200,100,0.25)',
          boxShadow: '0 0 40px rgba(34,139,34,0.12), inset 0 0 30px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(14px)',
        }}>

        {/* window chrome */}
        <div className="flex items-center gap-1.5 mb-5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#eab308' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
          <span className="ml-auto" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'rgba(40,200,100,0.55)' }}>
            imran@portfolio · v2.0
          </span>
        </div>

        {/* progress header */}
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.22em', color: '#28c864', fontWeight: 700 }}>
            LOADING&nbsp;
            <span style={{ animation: 'blink 1s step-end infinite' }}>▋</span>
          </span>
          <span style={{ fontSize: '0.82rem', color: '#28c864', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {progress}%
          </span>
        </div>

        {/* progress bar */}
        <div className="w-full rounded-full mb-5" style={{ height: 5, background: 'rgba(34,139,34,0.12)' }}>
          <div className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #1b5e20, #28c864)',
              boxShadow: '0 0 10px rgba(40,200,100,0.6)',
              transition: 'width 0.15s linear',
            }} />
        </div>

        {/* terminal log */}
        <div className="rounded-xl p-4" style={{
          minHeight: 130,
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(40,200,100,0.12)',
        }}>
          <div className="space-y-2">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-2" style={{ fontSize: '0.75rem' }}>
                <span style={{ color: '#28c864' }}>$</span>
                <span style={{ color: i === logs.length - 1 ? '#81c784' : 'rgba(129,199,132,0.55)' }}>
                  {log.text}
                </span>
                {i < logs.length - 1 && (
                  <span style={{ color: '#22c55e', fontSize: '0.6rem', marginLeft: 'auto' }}>✓</span>
                )}
              </div>
            ))}
            {/* blinking cursor line */}
            <div className="flex items-center gap-2" style={{ fontSize: '0.75rem', marginTop: 4 }}>
              <span style={{ color: '#28c864' }}>›</span>
              <span style={{ display: 'inline-block', width: 7, height: 13, background: '#28c864',
                animation: 'blink 1s step-end infinite', borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="mt-4 text-center" style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(40,200,100,0.3)' }}>
          IMRAN SHAIKH · FULL STACK DEVELOPER
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes glowPulse { 0%,100%{opacity:0.8} 50%{opacity:1.4} }
      `}</style>
    </div>
  )
}

export default Loader