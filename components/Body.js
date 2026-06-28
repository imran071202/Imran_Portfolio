"use client"
import React, { useState, useEffect, useRef } from 'react'
import { ReactTyped } from "react-typed";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react"
import { FaFileDownload } from "react-icons/fa";

/* ─── Particle field ─────────────────────────────────────────── */
const Particles = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = canvas.parentElement?.offsetHeight || 700
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.6 + 0.2,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${p.a})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(212,175,55,${0.08 * (1 - d / 120)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = canvas.parentElement?.offsetHeight || 700
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
}

/* ─── Matrix Rain ─────────────────────────────────────────────── */
const MatrixRain = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = canvas.parentElement?.offsetHeight || 700
    const chars = ['const','let','var','=>','{}','[]','fn','01','10','//','&&','||','!=','==','</>','null','true','#']
    const colW = window.innerWidth < 640 ? 28 : 22
    const cols = Math.floor(w / colW)
    const colColors = Array(cols).fill(0).map(() => {
      const r = Math.random()
      if (r < 0.72) return 'gold'
      if (r < 0.86) return 'green'
      if (r < 0.95) return 'blue'
      return 'red'
    })
    const drops = Array(cols).fill(0).map(() => -(Math.random() * 30))
    let raf
    const getColor = (type, alpha) => {
      if (type === 'gold')  return `rgba(212,175,55,${alpha})`
      if (type === 'green') return `rgba(40,200,100,${alpha * 0.8})`
      if (type === 'blue')  return `rgba(80,160,255,${alpha * 0.7})`
      return `rgba(255,60,60,${alpha * 0.7})`
    }
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.055)'; ctx.fillRect(0, 0, w, h)
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const alpha = 0.18 + Math.random() * 0.28
        ctx.fillStyle = getColor(colColors[i], alpha)
        ctx.font = `${window.innerWidth < 640 ? 9 : 10}px "Courier New"`
        ctx.fillText(char, i * colW, y * 14)
        if (y * 14 > h && Math.random() > 0.97) drops[i] = 0
        drops[i] += 0.38
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = canvas.parentElement?.offsetHeight || 700
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, opacity: 0.5 }} />
}

/* ─── Circuit Board ───────────────────────────────────────────── */
const CircuitBoard = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2, opacity: 0.18 }} viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="glow-gold"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="glow-green"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g stroke="#d4af37" strokeWidth="1" fill="none" filter="url(#glow-gold)">
      <path d="M0,100 L200,100 L230,70 L420,70"/><path d="M0,260 L140,260 L170,290 L340,290 L370,260 L650,260"/>
      <path d="M1000,260 L1180,260 L1210,230 L1400,230"/><path d="M0,520 L110,520 L140,490 L280,490 L310,520 L500,520"/>
      <path d="M800,680 L950,680 L980,650 L1100,650 L1130,680 L1400,680"/>
      <path d="M340,0 L340,70 L370,100 L370,200"/><path d="M840,800 L840,520 L870,490 L870,260"/>
      <path d="M1100,0 L1100,140 L1130,170 L1130,260"/><path d="M560,800 L560,680 L590,650 L590,520"/>
      <path d="M230,70 L230,30"/><path d="M370,260 L370,220"/>
      <circle cx="230" cy="70" r="4" fill="#d4af37"/><circle cx="170" cy="290" r="4" fill="#d4af37"/>
      <circle cx="370" cy="260" r="4" fill="#d4af37"/><circle cx="1130" cy="170" r="4" fill="#d4af37"/>
      <circle cx="140" cy="490" r="4" fill="#d4af37"/><circle cx="1210" cy="230" r="4" fill="#d4af37"/>
      <circle cx="980" cy="650" r="4" fill="#d4af37"/>
      <circle cx="230" cy="30" r="3" fill="none" stroke="#d4af37" strokeWidth="1"/>
      <circle cx="370" cy="220" r="3" fill="none" stroke="#d4af37" strokeWidth="1"/>
    </g>
    <g stroke="#28c864" strokeWidth="0.8" fill="none" filter="url(#glow-green)" opacity="0.7">
      <path d="M0,400 L80,400 L110,370 L250,370"/><path d="M1200,400 L1320,400 L1350,430 L1400,430"/>
      <path d="M700,0 L700,60 L730,90 L730,180"/>
      <circle cx="110" cy="370" r="3" fill="#28c864"/><circle cx="730" cy="90" r="3" fill="#28c864"/>
    </g>
    <g stroke="#50a0ff" strokeWidth="0.8" fill="none" opacity="0.5">
      <path d="M400,800 L400,720 L430,690 L430,600"/><path d="M1050,0 L1050,80 L1020,110 L1020,200"/>
      <circle cx="430" cy="690" r="3" fill="#50a0ff"/><circle cx="1020" cy="110" r="3" fill="#50a0ff"/>
    </g>
  </svg>
)

/* ─── CENTER VERTICAL LINE + DATA STREAM (new) ────────────────── */
const CenterDivider = () => (
  <div className="center-divider" style={{
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    transform: 'translateX(-50%)',
    width: '1px',
    zIndex: 3,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    {/* static faint gold line */}
    <div style={{
      position: 'absolute',
      top: 0, bottom: 0, left: 0,
      width: '1px',
      background: 'linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.15) 20%, rgba(212,175,55,0.25) 50%, rgba(212,175,55,0.15) 80%, transparent 100%)',
    }} />

    {/* animated sweep beam — gold */}
    <div style={{
      position: 'absolute',
      left: 0,
      width: '1px',
      height: '120px',
      background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.9), transparent)',
      boxShadow: '0 0 8px 2px rgba(212,175,55,0.5)',
      animation: 'lineBeam 4s ease-in-out infinite',
    }} />

    {/* animated sweep beam — blue (offset) */}
    <div style={{
      position: 'absolute',
      left: 0,
      width: '1px',
      height: '80px',
      background: 'linear-gradient(to bottom, transparent, rgba(80,160,255,0.7), transparent)',
      boxShadow: '0 0 6px 2px rgba(80,160,255,0.4)',
      animation: 'lineBeam 4s ease-in-out infinite',
      animationDelay: '2s',
    }} />

    {/* data packets — small colored pills sliding down */}
    {/* {[
      { color: '#d4af37', delay: '0s',   dur: '3s'  },
      { color: '#28c864', delay: '1s',   dur: '3.5s'},
      { color: '#50a0ff', delay: '2s',   dur: '2.8s'},
      { color: '#ff5f57', delay: '1.5s', dur: '4s'  },
      { color: '#d4af37', delay: '2.5s', dur: '3.2s'},
      { color: '#28c864', delay: '0.5s', dur: '4.5s'},
    ].map((p, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: '-2px',
        width: '5px',
        height: '14px',
        borderRadius: '3px',
        background: p.color,
        boxShadow: `0 0 8px ${p.color}`,
        opacity: 0.85,
        animation: `packetSlide ${p.dur} linear infinite`,
        animationDelay: p.delay,
      }} />
    ))} */}

    {/* center node diamond */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%) rotate(45deg)',
      width: '10px',
      height: '10px',
      border: '1px solid #d4af37',
      background: 'rgba(212,175,55,0.15)',
      boxShadow: '0 0 12px rgba(212,175,55,0.5)',
      animation: 'diamondPulse 2.5s ease-in-out infinite',
    }} />

    {/* top node */}
    <div style={{
      position: 'absolute',
      top: '18%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: '#28c864',
      boxShadow: '0 0 10px #28c864',
      animation: 'nodePulse 2s ease-in-out infinite',
    }} />

    {/* bottom node */}
    <div style={{
      position: 'absolute',
      bottom: '18%',
      left: '50%',
      transform: 'translate(-50%,50%)',
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: '#50a0ff',
      boxShadow: '0 0 10px #50a0ff',
      animation: 'nodePulse 2s ease-in-out infinite',
      animationDelay: '1s',
    }} />

    {/* side tick marks */}
    {[15, 30, 45, 55, 70, 85].map((pct, i) => (
      <div key={i} style={{
        position: 'absolute',
        top: `${pct}%`,
        left: i % 2 === 0 ? '-6px' : '2px',
        width: '5px',
        height: '1px',
        background: i % 3 === 0 ? '#28c864' : i % 3 === 1 ? '#50a0ff' : 'rgba(212,175,55,0.5)',
        opacity: 0.6,
      }} />
    ))}
  </div>
)

/* ─── Floating Terminal ───────────────────────────────────────── */
const TermWindow = ({ children, style, delay = 0, duration = 9, title = 'terminal' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.9, ease: 'easeOut' }}
    style={{
      position: 'absolute', background: 'rgba(5,5,8,0.92)',
      border: '1px solid rgba(212,175,55,0.25)', borderTop: '1px solid rgba(212,175,55,0.5)',
      borderRadius: '10px', fontFamily: '"Courier New", monospace', fontSize: '11px',
      color: 'rgba(212,175,55,0.65)', zIndex: 3, pointerEvents: 'none',
      backdropFilter: 'blur(12px)', whiteSpace: 'pre', lineHeight: 1.75,
      boxShadow: '0 0 40px rgba(212,175,55,0.08), 0 12px 40px rgba(0,0,0,0.7)',
      overflow: 'hidden', animation: `termFloat ${duration}s ease-in-out infinite`,
      animationDelay: `${delay * 0.25}s`, minWidth: 210, ...style,
    }}
  >
    <div style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 12px', background:'rgba(212,175,55,0.06)', borderBottom:'1px solid rgba(212,175,55,0.12)' }}>
      <div style={{ width:9, height:9, borderRadius:'50%', background:'#ff5f57', boxShadow:'0 0 6px #ff5f57bb' }}/>
      <div style={{ width:9, height:9, borderRadius:'50%', background:'#febc2e', boxShadow:'0 0 6px #febc2ebb' }}/>
      <div style={{ width:9, height:9, borderRadius:'50%', background:'#28c840', boxShadow:'0 0 6px #28c840bb' }}/>
      <span style={{ marginLeft:8, fontSize:9, color:'rgba(212,175,55,0.38)', letterSpacing:'0.1em' }}>~ {title}</span>
    </div>
    <div style={{ padding:'10px 14px' }}>{children}</div>
  </motion.div>
)

/* ─── Scan Sweep ──────────────────────────────────────────────── */
const ScanSweep = () => (
  <div style={{ position:'absolute', inset:0, zIndex:5, pointerEvents:'none', overflow:'hidden', borderRadius:'inherit' }}>
    <div style={{
      position:'absolute', left:0, right:0, height:'2px',
      background:'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), rgba(80,160,255,0.5), transparent)',
      animation:'scanSweep 3.5s ease-in-out infinite', boxShadow:'0 0 10px rgba(212,175,55,0.6)',
    }}/>
  </div>
)

/* ─── 3D Tilt Card ────────────────────────────────────────────── */
const TiltCard = ({ children }) => {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 })
  const onMove = e => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle:'preserve-3d', perspective:800 }}
      className="cursor-pointer">
      {children}
    </motion.div>
  )
}

const Badge = ({ label, delay }) => (
  <motion.span initial={{ opacity:0, scale:0.7 }} whileInView={{ opacity:1, scale:1 }}
    transition={{ delay, duration:0.4 }} viewport={{ once:true }} whileHover={{ scale:1.1, y:-3 }}
    className="badge px-3 py-1 text-xs font-semibold rounded-full border border-yellow-500/40 text-yellow-300 bg-yellow-500/10 backdrop-blur-sm hover:bg-yellow-500/20 transition-colors duration-200">
    {label}
  </motion.span>
)

const Stat = ({ value, label, delay, isDark }) => (
  <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
    transition={{ delay, duration:0.5 }} viewport={{ once:true }} className="text-center">
    <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">{value}</div>
    <div className={`text-[10px] md:text-xs uppercase tracking-widest mt-0.5 ${isDark ? 'text-gray-400' : 'text-yellow-800/70'}`}>{label}</div>
  </motion.div>
)

/* ─── Main ────────────────────────────────────────────────────── */
const Body = () => {
  const [isOpen, setIsOpen] = useState()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const check = () => { const t = document.documentElement.getAttribute('data-theme'); setIsDark(t !== 'light') }
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const handleDownloadPdf = () => {
    const link = document.createElement('a'); link.href = './photo/Imran_Shaikh_cv.pdf'
    link.download = './photo/Imran_Shaikh_cv.pdf'; link.click()
  }

  const D = isDark
  const sectionBg  = D ? '#000000' : '#faf6e8'
  const gridColor  = D ? 'rgba(212,175,55,0.04)' : 'rgba(160,110,10,0.06)'
  const glowColor  = D ? 'rgba(212,175,55,0.07)' : 'rgba(180,130,10,0.07)'
  const greetColor = D ? '#d1d5db' : '#3d1f04'
  const statBorder = D ? 'rgba(212,175,55,0.15)' : 'rgba(160,110,10,0.22)'
  const statBg     = D ? 'rgba(212,175,55,0.05)' : 'rgba(180,130,10,0.07)'
  const dividerBg  = D
    ? 'linear-gradient(90deg, transparent, #d4af37, transparent)'
    : 'linear-gradient(90deg, transparent, #b8860b, transparent)'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        #Body {
          font-family: 'Rajdhani', sans-serif;
          position: relative; overflow: hidden; overflow-x: clip;
          width: 100%; max-width: 100vw; transition: background 0.4s;
        }
        #Body::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px);
          background-size: 60px 60px; z-index: 0;
        }
        #Body::after {
          content: ''; position: absolute; top: -20%; left: -10%; width: 70%; height: 80%;
          background: radial-gradient(ellipse, ${glowColor} 0%, transparent 70%); z-index: 0; pointer-events: none;
        }

        .gold-title {
          font-family: 'Cinzel Decorative', serif;
          background: linear-gradient(135deg, #f5d060 0%, #d4af37 30%, #fff8dc 55%, #d4af37 75%, #b8860b 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 20px rgba(212,175,55,0.5));
        }
        .gold-title:hover { animation: glitchTitle 0.35s steps(2) forwards; }
        @keyframes glitchTitle {
          0%   { filter: drop-shadow(0 0 20px rgba(212,175,55,0.5)) drop-shadow(3px 0 rgba(80,160,255,0.55)); }
          50%  { filter: drop-shadow(0 0 26px rgba(212,175,55,0.8)) drop-shadow(-3px 0 rgba(255,60,60,0.45)); }
          100% { filter: drop-shadow(0 0 20px rgba(212,175,55,0.5)); }
        }

        .hero-copy, .hero-media, .hero-stats { max-width: 100%; min-width: 0; }

        .avatar-ring {
          background: conic-gradient(from 0deg, #d4af37, #fff8dc, #b8860b, #d4af37, #fff8dc, #d4af37);
          animation: spin-ring 6s linear infinite;
        }
        @keyframes spin-ring { to { transform: rotate(360deg); } }
        .avatar-inner { transform: translateZ(30px); }

        .glow-btn { background: linear-gradient(135deg, #d4af37, #b8860b); box-shadow: 0 0 20px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.2); transition: all 0.3s ease; }
        .glow-btn:hover { box-shadow: 0 0 35px rgba(212,175,55,0.7), inset 0 1px 0 rgba(255,255,255,0.3); transform: translateY(-2px) scale(1.03); }

        .social-btn { width:44px; height:44px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:1px solid rgba(212,175,55,0.3); background:rgba(212,175,55,0.05); backdrop-filter:blur(8px); transition:all 0.3s ease; color:#d4af37; font-size:1.2rem; }
        .social-btn:hover { border-color:#d4af37; background:rgba(212,175,55,0.15); box-shadow:0 0 16px rgba(212,175,55,0.5); transform:translateY(-4px) scale(1.1); }

        .status-dot { width:8px; height:8px; background:#22c55e; border-radius:50%; box-shadow:0 0 8px #22c55e; animation:pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100% { box-shadow:0 0 6px #22c55e; } 50% { box-shadow:0 0 14px #22c55e, 0 0 24px #22c55e55; } }

        .corner-bracket::before, .corner-bracket::after,
        .corner-bracket > span::before, .corner-bracket > span::after {
          content:''; position:absolute; width:22px; height:22px; border-color:#d4af37; border-style:solid;
        }
        .corner-bracket::before { top:-2px; left:-2px; border-width:2px 0 0 2px; }
        .corner-bracket::after  { top:-2px; right:-2px; border-width:2px 2px 0 0; }
        .corner-bracket > span::before { bottom:-2px; left:-2px; border-width:0 0 2px 2px; }
        .corner-bracket > span::after  { bottom:-2px; right:-2px; border-width:0 2px 2px 0; }

        .scanlines-overlay { position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px); z-index:2; pointer-events:none; }

        @keyframes termFloat { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }

        @keyframes scanSweep {
          0%   { top:-2px; opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { top:100%; opacity:0; }
        }

        /* center divider animations */
        @keyframes lineBeam {
          0%   { top:-120px; opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { top:100%; opacity:0; }
        }
        @keyframes packetSlide {
          0%   { top:-20px; opacity:0; }
          5%   { opacity:1; }
          95%  { opacity:1; }
          100% { top:100%; opacity:0; }
        }
        @keyframes diamondPulse {
          0%,100% { box-shadow:0 0 12px rgba(212,175,55,0.5); transform:translate(-50%,-50%) rotate(45deg) scale(1); }
          50%      { box-shadow:0 0 24px rgba(212,175,55,0.9); transform:translate(-50%,-50%) rotate(45deg) scale(1.3); }
        }
        @keyframes nodePulse {
          0%,100% { transform:translate(-50%,-50%) scale(1); }
          50%      { transform:translate(-50%,-50%) scale(1.5); }
        }

        @keyframes pipBlink { 0%,100% { opacity:1; } 50% { opacity:0.15; } }

        .bracket-bg {
          position:absolute; font-family:'Courier New',monospace; font-weight:900; z-index:2;
          user-select:none; pointer-events:none; animation:bracketPulse 5s ease-in-out infinite; line-height:1;
        }
        @keyframes bracketPulse { 0%,100% { opacity:0.05; } 50% { opacity:0.14; } }

        .hacker-badge {
          display:inline-flex; align-items:center; gap:8px; padding:6px 16px;
          border-radius:30px; font-family:'Courier New',monospace; font-size:11px;
          font-weight:700; letter-spacing:0.07em;
          border:1px solid rgba(40,200,100,0.4); background:rgba(40,200,100,0.07);
          color:rgba(40,200,100,0.9); margin-bottom:16px;
          animation:badgePulse 3s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%,100% { border-color:rgba(40,200,100,0.4); box-shadow:none; }
          50%      { border-color:rgba(40,200,100,0.75); box-shadow:0 0 16px rgba(40,200,100,0.22); }
        }
        .ping-dot { width:8px; height:8px; border-radius:50%; display:inline-block; animation:pingAnim 1.8s ease-in-out infinite; }
        @keyframes pingAnim { 0%,100% { box-shadow:0 0 0 0 rgba(40,200,100,0.7); } 50% { box-shadow:0 0 0 6px rgba(40,200,100,0); } }

        .hud-pip { position:absolute; width:6px; height:6px; border-radius:50%; background:#d4af37; animation:pipBlink 2s ease-in-out infinite; z-index:10; }

        .data-label {
          position:absolute; font-family:'Courier New',monospace; font-size:9px;
          letter-spacing:0.12em; color:rgba(212,175,55,0.38);
          writing-mode:vertical-rl; text-orientation:mixed;
          pointer-events:none; user-select:none; z-index:4;
        }

        .sys-strip { display:flex; gap:18px; margin-bottom:14px; font-family:'Courier New',monospace; font-size:10px; color:rgba(212,175,55,0.45); flex-wrap:wrap; }
        .sys-strip span { display:flex; align-items:center; gap:5px; }

        /* center divider hidden on mobile/tablet */
        .center-divider { display:block; }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          #Body { padding-top:86px; width:100vw; max-width:100vw; align-items:center; overflow-x:hidden; }
          .hero-copy { width:100% !important; max-width:calc(100vw - 32px) !important; overflow:hidden; }
          .hero-media { width:100% !important; max-width:calc(100vw - 32px) !important; overflow:hidden; }
          .gold-title { width:100%; max-width:100%; font-size:clamp(2rem,10vw,3rem) !important; line-height:1.12 !important; text-align:center; overflow-wrap:anywhere; }
          .hero-role { max-width:100%; overflow-wrap:anywhere; }
          .hero-stats { width:100% !important; max-width:100% !important; }
          .hero-avatar { width:min(220px,calc(100vw - 80px)) !important; height:min(240px,calc((100vw - 80px)*1.08)) !important; }
          .hero-glow { width:min(280px,calc(100vw - 44px)) !important; height:min(280px,calc(100vw - 44px)) !important; }
          .hero-float-left { left:0 !important; bottom:-18px !important; }
          .hero-float-right { right:0 !important; top:-14px !important; }
          .term-desktop { display:none !important; }
          .bracket-bg { display:none !important; }
          .data-label { display:none !important; }
          .sys-strip { justify-content:center; }
          .hacker-badge { font-size:10px; padding:5px 12px; }
          .term-mobile-strip { display:flex !important; }
          .center-divider { display:none !important; }
        }
        @media (min-width:641px) { .term-mobile-strip { display:none !important; } }

        /* ── TABLET ── */
        @media (min-width:641px) and (max-width:1023px) {
          .term-desktop { display:none !important; }
          .bracket-bg { font-size:90px !important; }
          .data-label { display:none !important; }
          .center-divider { display:none !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        id='Body' name="Home"
        className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 px-5 md:px-16 lg:px-28 py-16 md:py-0"
        style={{ background: sectionBg, color: D ? '#ffffff' : '#180e03' }}
      >
        <Particles />
        <MatrixRain />
        <CircuitBoard />
        <div className="scanlines-overlay" />

        {/* ── CENTER VERTICAL DIVIDER with data stream ── */}
        <CenterDivider />

        {/* side data labels */}
        <div className="data-label" style={{ left: 14, top: '22%' }}>SYS::ONLINE ■ v2.0.4</div>
        <div className="data-label" style={{ right: 14, bottom: '22%' }}>STACK::REACT · NODE · MONGO</div>

        {/* bracket decorators */}
        <div className="bracket-bg" style={{ fontSize:200, top:'-30px', right:'0.5%', color:'#d4af37', animationDelay:'0s' }}>{'{'}</div>
        <div className="bracket-bg" style={{ fontSize:200, bottom:'-40px', left:'0.5%', color:'#d4af37', animationDelay:'2.5s' }}>{'}'}</div>
        <div className="bracket-bg" style={{ fontSize:88, top:'44%', right:'30%', color:'#28c864', animationDelay:'1.5s' }}>{'</>'}</div>
        <div className="bracket-bg" style={{ fontSize:66, bottom:'14%', left:'22%', color:'#50a0ff', animationDelay:'3s' }}>{'[ ]'}</div>

        {/* ── DESKTOP TERMINALS – all 4 corners, no overlap ── */}
        <TermWindow className="term-desktop" title="ping.sh"
          style={{ top:'4%', left:'0.8%' }} delay={3.0} duration={11}>
          <span style={{ color:'#50a0ff' }}>$ </span><span style={{ color:'rgba(212,175,55,0.65)' }}>ping imran.dev</span>{'\n'}
          <span style={{ color:'#28c864' }}>64 bytes </span><span style={{ color:'rgba(212,175,55,0.45)' }}>ttl=64 time=</span><span style={{ color:'#d4af37' }}>1.2ms</span>{'\n'}
          <span style={{ color:'rgba(212,175,55,0.3)' }}>STATUS: </span><span style={{ color:'#28c864' }}>ONLINE ●</span>
        </TermWindow>

        <TermWindow className="term-desktop" title="dev.js"
          style={{ bottom:'5%', left:'0.8%' }} delay={1.2} duration={10}>
          <span style={{ color:'#50a0ff' }}>const </span>
          <span style={{ color:'#d4af37' }}>developer</span>
          <span style={{ color:'rgba(212,175,55,0.45)' }}> = {'{'}</span>{'\n'}
          <span style={{ color:'rgba(212,175,55,0.35)' }}>  name  </span><span style={{ color:'rgba(212,175,55,0.45)' }}>: </span><span style={{ color:'#88ffaa' }}>"Imran Shaikh"</span>{'\n'}
          <span style={{ color:'rgba(212,175,55,0.35)' }}>  stack </span><span style={{ color:'rgba(212,175,55,0.45)' }}>: </span><span style={{ color:'#88ffaa' }}>"Full Stack"</span>{'\n'}
          <span style={{ color:'rgba(212,175,55,0.35)' }}>  open  </span><span style={{ color:'rgba(212,175,55,0.45)' }}>: </span><span style={{ color:'#28c864' }}>true</span><span style={{ color:'rgba(212,175,55,0.45)' }}>,{'\n'}{'}'}</span>
        </TermWindow>

        <TermWindow className="term-desktop" title="index.jsx"
          style={{ top:'4%', right:'0.8%' }} delay={2.4} duration={8}>
          <span style={{ color:'#ff5f57' }}>import </span><span style={{ color:'#d4af37' }}>React </span><span style={{ color:'rgba(212,175,55,0.45)' }}>from </span><span style={{ color:'#88ffaa' }}>'react'</span>{'\n'}
          <span style={{ color:'#ff5f57' }}>import </span><span style={{ color:'#d4af37' }}>{'{ motion }'} </span><span style={{ color:'rgba(212,175,55,0.45)' }}>from </span><span style={{ color:'#88ffaa' }}>'framer'</span>{'\n'}
          <span style={{ color:'rgba(212,175,55,0.3)' }}>// building pixel-perfect</span>{'\n'}
          <span style={{ color:'rgba(212,175,55,0.3)' }}>// experiences ✦</span>
        </TermWindow>

        <TermWindow className="term-desktop" title="deploy.sh"
          style={{ bottom:'5%', right:'0.8%' }} delay={1.8} duration={13}>
          <span style={{ color:'#50a0ff' }}>$ </span><span style={{ color:'rgba(212,175,55,0.7)' }}>git commit -m </span><span style={{ color:'#88ffaa' }}>"feat: v2.0"</span>{'\n'}
          <span style={{ color:'#50a0ff' }}>$ </span><span style={{ color:'rgba(212,175,55,0.7)' }}>npm run build</span>{'\n'}
          <span style={{ color:'#28c864' }}>✓ </span><span style={{ color:'rgba(212,175,55,0.55)' }}>compiled in 842ms</span>{'\n'}
          <span style={{ color:'#50a0ff' }}>$ </span><span style={{ color:'rgba(212,175,55,0.7)' }}>vercel --prod</span>{'\n'}
          <span style={{ color:'#28c864' }}>🚀 </span><span style={{ color:'#d4af37' }}>deployed to production</span>
        </TermWindow>

        {/* ── mobile terminal strip ── */}
        <div className="term-mobile-strip" style={{
          position:'absolute', bottom:'6%', left:'50%', transform:'translateX(-50%)',
          background:'rgba(5,5,8,0.88)', border:'1px solid rgba(212,175,55,0.28)',
          borderRadius:'10px', padding:'8px 14px', fontFamily:'"Courier New",monospace',
          fontSize:'10px', color:'rgba(212,175,55,0.6)', zIndex:3, pointerEvents:'none',
          backdropFilter:'blur(10px)', whiteSpace:'nowrap', lineHeight:1.7,
          width:'calc(100vw - 48px)', maxWidth:340,
          boxShadow:'0 0 28px rgba(212,175,55,0.1)',
        }}>
          <div style={{ display:'flex', gap:5, marginBottom:7 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#ff5f57', boxShadow:'0 0 5px #ff5f57aa' }}/>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#febc2e', boxShadow:'0 0 5px #febc2eaa' }}/>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#28c840', boxShadow:'0 0 5px #28c840aa' }}/>
            <span style={{ marginLeft:6, fontSize:9, color:'rgba(212,175,55,0.35)', letterSpacing:'0.08em' }}>~ terminal</span>
          </div>
          <span style={{ color:'#50a0ff' }}>$ </span>
          <span>npm run dev </span>
          <span style={{ color:'#28c864' }}>✓ ready on :3000</span>
        </div>

        {/* ══════════ LEFT CONTENT ══════════ */}
        <motion.div
          initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:1, delay:0.3 }}
          className="hero-copy relative flex flex-col items-center md:items-start text-center md:text-left max-w-xl w-full"
          style={{ zIndex:10 }}
        >
          {/* <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }} className="hacker-badge">
            <span className="ping-dot" style={{ background:'#28c864' }} />
            AVAILABLE FOR WORK
          </motion.div> */}

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
            className="text-2xl mb-1 flex items-center gap-2" style={{ color:greetColor }}>
            <span className="text-3xl">👋🏼</span>
            <span className="font-semibold tracking-wide" style={{ color:'white' }}>Hello, I'm</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9, duration:0.8 }}
            className="gold-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-2">
            Imran Shaikh
          </motion.h1>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
            className="hero-role flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1 mb-4 text-lg md:text-2xl font-semibold"
            style={{ color: D ? '#d1d5db' : '#5a3010' }}>
            <span>I'm a</span>
            <ReactTyped
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500"
              strings={["Full Stack Developer","React.js Expert","Node.js Engineer","Programmer"]}
              typeSpeed={50} backSpeed={35} loop={true}
            />
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.35 }} className="sys-strip md:justify-start">
            <span><span style={{ color:'#28c864', fontSize:8 }}>▶</span> SYS ONLINE</span>
            <span><span style={{ color:'#50a0ff', fontSize:8 }}>▶</span> REACT v18</span>
            <span><span style={{ color:'#ff5f57', fontSize:8 }}>▶</span> NODE v20</span>
            <span><span style={{ color:'#d4af37', fontSize:8 }}>▶</span> FULL STACK</span>
          </motion.div>

          <div className="w-full md:w-3/4 mb-6" style={{ height:1, background:dividerBg }} />

          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}
            className="hero-stats grid grid-cols-2 sm:grid-cols-4 md:flex gap-4 md:gap-10 mb-8 px-4 sm:px-5 py-4 rounded-xl backdrop-blur-sm w-full md:w-auto"
            style={{ border:`1px solid ${statBorder}`, background:statBg }}>
            <Stat value="1+" label="Years Exp." delay={0.1} isDark={D} />
            <div className="hidden md:block" style={{ width:1, background:statBorder }} />
            <Stat value="10+" label="Projects" delay={0.2} isDark={D} />
            <div className="hidden md:block" style={{ width:1, background:statBorder }} />
            <Stat value="BCA" label="Graduate" delay={0.3} isDark={D} />
            <div className="hidden md:block" style={{ width:1, background:statBorder }} />
            <Stat value="10+" label="Technologies" delay={0.4} isDark={D} />
          </motion.div>

          {/* Download CV button
          <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:0.3 }} viewport={{ once:true }} className="mb-8">
            <button onClick={handleDownloadPdf} className="glow-btn flex cursor-pointer items-center gap-3 px-7 py-3.5 rounded-lg text-black font-bold text-base tracking-wide">
              <FaFileDownload className="text-lg" /> Download Resume
            </button>
          </motion.div> */}
        </motion.div>

        {/* ══════════ RIGHT — AVATAR ══════════ */}
        <motion.div
          initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:1, delay:0.5 }}
          className="hero-media relative flex justify-center items-center order-first md:order-last mb-4 md:mb-0"
          style={{ zIndex:10 }}
        >
          <TiltCard>
            <div className="relative flex items-center justify-center mt-5 md:mt-0">
              <div className="avatar-ring absolute rounded-full"
                style={{ width:'calc(100% + 8px)', height:'calc(100% + 8px)', top:'-12px', left:'-4px' }} />

              <div className="corner-bracket relative p-2" style={{ transform:'translateZ(20px)' }}>
                <span />
                <div className="hud-pip" style={{ top:6, left:6, animationDelay:'0s' }} />
                <div className="hud-pip" style={{ top:6, right:6, background:'#28c864', animationDelay:'0.6s' }} />
                <div className="hud-pip" style={{ bottom:6, left:6, background:'#50a0ff', animationDelay:'1.2s' }} />
                <div className="hud-pip" style={{ bottom:6, right:6, background:'#ff5f57', animationDelay:'1.8s' }} />

                <motion.div className="avatar-inner hero-avatar rounded-2xl overflow-hidden"
                  style={{
                    width:'250px', height:'270px', position:'relative',
                    boxShadow:'0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1), inset 0 0 20px rgba(0,0,0,0.5)',
                  }}>
                  <img src="./photo/imran-removebg.png" alt="Imran Shaikh"
                    className="w-full h-full object-cover object-center"
                    style={{ filter:'brightness(1.05) contrast(1.05)' }} />
                  <ScanSweep />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-yellow-400/5 pointer-events-none" />
                  <div style={{
                    position:'absolute', bottom:0, left:0, right:0,
                    background:'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    padding:'10px 10px 6px', fontFamily:'"Courier New",monospace',
                    fontSize:'8px', color:'rgba(212,175,55,0.65)', letterSpacing:'0.08em',
                    display:'flex', justifyContent:'space-between',
                  }}>
                    <span><span style={{ color:'#28c864' }}>●</span> ID::IMRAN</span>
                    <span>FULL_STACK</span>
                    <span style={{ color:'#50a0ff' }}>v2.0</span>
                  </div>
                </motion.div>
              </div>

              <motion.div animate={{ y:[0,-6,0] }} transition={{ repeat:Infinity, duration:3, ease:'easeInOut' }}
                className="hero-float-left absolute -bottom-4 -left-8 px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg shadow-yellow-500/30"
                style={{ zIndex:20 }}>
                Full Stack Developer
              </motion.div>

              <motion.div animate={{ y:[0,6,0] }} transition={{ repeat:Infinity, duration:3.5, ease:'easeInOut', delay:0.5 }}
                className="hero-float-right absolute -top-4 -right-8 px-3 py-1.5 rounded-lg text-xs font-bold border border-yellow-500/40 text-yellow-300 bg-black/60 backdrop-blur-sm shadow-lg"
                style={{ zIndex:20 }}>
              </motion.div>
            </div>
          </TiltCard>

          <div className="hero-glow absolute rounded-full pointer-events-none"
            style={{ width:'320px', height:'320px', background:'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', zIndex:0, filter:'blur(20px)' }} />
        </motion.div>

      </motion.div>
    </>
  )
}

export default Body