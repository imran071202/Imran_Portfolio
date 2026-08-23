"use client"
import React, { useState, useEffect, useRef } from 'react'
import { ReactTyped } from "react-typed";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react"
import { FaFileDownload } from "react-icons/fa";
import { Link } from 'react-scroll';



/* ─── Matrix Rain ─────────────────────────────────────────────── */
const MatrixRain = ({ enabled = true }) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = canvas.parentElement?.offsetHeight || 700
    const chars = ['const', 'let', 'var', '=>', '{}', '[]', 'fn', '01', '10', '//', '&&', '||', '!=', '==', '</>', 'null', 'true', '#']
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
      if (type === 'gold') return `rgba(34, 139, 34,${alpha})`
      if (type === 'green') return `rgba(40,200,100,${alpha * 0.8})`
      if (type === 'blue') return `rgba(80,160,255,${alpha * 0.7})`
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
  if (!enabled) return null
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, opacity: 0.5 }} />
}

/* ─── Circuit Board ───────────────────────────────────────────── */
const CircuitBoard = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2, opacity: 0.18 }} viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="glow-gold"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <filter id="glow-green"><feGaussianBlur stdDeviation="1.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <g stroke="#228b22" strokeWidth="1" fill="none" filter="url(#glow-gold)">
      <path d="M0,100 L200,100 L230,70 L420,70" /><path d="M0,260 L140,260 L170,290 L340,290 L370,260 L650,260" />
      <path d="M1000,260 L1180,260 L1210,230 L1400,230" /><path d="M0,520 L110,520 L140,490 L280,490 L310,520 L500,520" />
      <path d="M800,680 L950,680 L980,650 L1100,650 L1130,680 L1400,680" />
      <path d="M340,0 L340,70 L370,100 L370,200" /><path d="M840,800 L840,520 L870,490 L870,260" />
      <path d="M1100,0 L1100,140 L1130,170 L1130,260" /><path d="M560,800 L560,680 L590,650 L590,520" />
      <path d="M230,70 L230,30" /><path d="M370,260 L370,220" />
      <circle cx="230" cy="70" r="4" fill="#228b22" /><circle cx="170" cy="290" r="4" fill="#228b22" />
      <circle cx="370" cy="260" r="4" fill="#228b22" /><circle cx="1130" cy="170" r="4" fill="#228b22" />
      <circle cx="140" cy="490" r="4" fill="#228b22" /><circle cx="1210" cy="230" r="4" fill="#228b22" />
      <circle cx="980" cy="650" r="4" fill="#228b22" />
      <circle cx="230" cy="30" r="3" fill="none" stroke="#228b22" strokeWidth="1" />
      <circle cx="370" cy="220" r="3" fill="none" stroke="#228b22" strokeWidth="1" />
    </g>
    <g stroke="#28c864" strokeWidth="0.8" fill="none" filter="url(#glow-green)" opacity="0.7">
      <path d="M0,400 L80,400 L110,370 L250,370" /><path d="M1200,400 L1320,400 L1350,430 L1400,430" />
      <path d="M700,0 L700,60 L730,90 L730,180" />
      <circle cx="110" cy="370" r="3" fill="#28c864" /><circle cx="730" cy="90" r="3" fill="#28c864" />
    </g>
    <g stroke="#50a0ff" strokeWidth="0.8" fill="none" opacity="0.5">
      <path d="M400,800 L400,720 L430,690 L430,600" /><path d="M1050,0 L1050,80 L1020,110 L1020,200" />
      <circle cx="430" cy="690" r="3" fill="#50a0ff" /><circle cx="1020" cy="110" r="3" fill="#50a0ff" />
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
      background: 'linear-gradient(to bottom, transparent 0%, rgba(34, 139, 34,0.15) 20%, rgba(34, 139, 34,0.25) 50%, rgba(34, 139, 34,0.15) 80%, transparent 100%)',
    }} />

    {/* animated sweep beam — gold */}
    {/* <div style={{
      position: 'absolute',
      left: 0,
      width: '1px',
      height: '120px',
      background: 'linear-gradient(to bottom, transparent, rgba(222, 83, 55 ,0.9), transparent)',
      boxShadow: '0 0 8px 2px rgba(34, 139, 34,0.5)',
      animation: 'lineBeam 4s ease-in-out infinite',
    }} /> */}

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
      { color: '#228b22', delay: '0s',   dur: '3s'  },
      { color: '#28c864', delay: '1s',   dur: '3.5s'},
      { color: '#50a0ff', delay: '2s',   dur: '2.8s'},
      { color: '#ff5f57', delay: '1.5s', dur: '4s'  },
      { color: '#228b22', delay: '2.5s', dur: '3.2s'},
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
      border: '1px solid #228b22',
      background: 'rgba(34, 139, 34,0.15)',
      boxShadow: '0 0 12px rgba(34, 139, 34,0.5)',
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
        background: i % 3 === 0 ? '#28c864' : i % 3 === 1 ? '#50a0ff' : 'rgba(34, 139, 34,0.5)',
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
      border: '1px solid rgba(34, 139, 34,0.25)', borderTop: '1px solid rgba(34, 139, 34,0.5)',
      borderRadius: '10px', fontFamily: '"Courier New", monospace', fontSize: '11px',
      color: 'rgba(34, 139, 34,0.65)', zIndex: 3, pointerEvents: 'none',
      backdropFilter: 'blur(12px)', whiteSpace: 'pre', lineHeight: 1.75,
      boxShadow: '0 0 40px rgba(34, 139, 34,0.08), 0 12px 40px rgba(0,0,0,0.7)',
      overflow: 'hidden', animation: `termFloat ${duration}s ease-in-out infinite`,
      animationDelay: `${delay * 0.25}s`, minWidth: 210, ...style,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', background: 'rgba(34, 139, 34,0.06)', borderBottom: '1px solid rgba(34, 139, 34,0.12)' }}>
      <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57', boxShadow: '0 0 6px #ff5f57bb' }} />
      <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e', boxShadow: '0 0 6px #febc2ebb' }} />
      <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840', boxShadow: '0 0 6px #28c840bb' }} />
      <span style={{ marginLeft: 8, fontSize: 9, color: 'rgba(34, 139, 34,0.38)', letterSpacing: '0.1em' }}>~ {title}</span>
    </div>
    <div style={{ padding: '10px 14px' }}>{children}</div>
  </motion.div>
)

/* ─── Scan Sweep ──────────────────────────────────────────────── */
const ScanSweep = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', overflow: 'hidden', borderRadius: 'inherit' }}>
    <div style={{
      position: 'absolute', left: 0, right: 0, height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(34, 139, 34, 0.8), rgba(80, 160, 255, 0.6), transparent)',
      animation: 'scanSweep 4s ease-in-out infinite', boxShadow: '0 0 12px rgba(34, 139, 34, 0.7)',
    }} />
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
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="cursor-pointer">
      {children}
    </motion.div>
  )
}

const Badge = ({ label, delay }) => (
  <motion.span initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }} viewport={{ once: true }} whileHover={{ scale: 1.1, y: -3 }}
    className="badge px-3 py-1 text-xs font-semibold rounded-full border border-green-500/40 text-green-300 bg-green-500/10 backdrop-blur-sm hover:bg-green-500/20 transition-colors duration-200">
    {label}
  </motion.span>
)

const Stat = ({ value, label, delay, isDark, color = "green" }) => {
  const grad = color === "blue"
    ? "from-blue-200 to-blue-500"
    : color === "red"
      ? "from-red-300 to-red-500"
      : color === "purple"
        ? "from-purple-200 to-purple-500"
        : "from-green-200 to-green-500";
  const lblColor = color === "blue"
    ? "text-blue-400/60"
    : color === "red"
      ? "text-red-400/60"
      : color === "purple"
        ? "text-purple-400/60"
        : "text-green-400/60";
  const borderCol = color === "blue"
    ? "rgba(59, 130, 246, 0.12)"
    : color === "purple"
      ? "rgba(168, 85, 247, 0.12)"
      : "rgba(34, 139, 34, 0.12)";
  const bgCol = color === "blue"
    ? "rgba(59, 130, 246, 0.01)"
    : color === "purple"
      ? "rgba(168, 85, 247, 0.01)"
      : "rgba(34, 139, 34, 0.01)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.04, borderColor: color === 'blue' ? 'rgba(59, 130, 246, 0.4)' : color === 'purple' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(40, 200, 100, 0.4)', boxShadow: color === 'blue' ? '0 10px 25px -10px rgba(59, 130, 246, 0.15)' : color === 'purple' ? '0 10px 25px -10px rgba(168, 85, 247, 0.15)' : '0 10px 25px -10px rgba(34, 139, 34, 0.15)' }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      viewport={{ once: true }}
      style={{
        border: `1px solid ${borderCol}`,
        background: bgCol,
        backdropFilter: 'blur(4px)',
      }}
      className="px-4 py-5 rounded-xl flex flex-col items-center justify-center transition-shadow duration-300 select-none w-full"
    >
      <div className={`text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b ${grad}`}>{value}</div>
      <div className={`text-[10px] md:text-xs uppercase tracking-widest mt-1.5 font-mono ${isDark ? 'text-gray-400' : lblColor}`}>{label}</div>
    </motion.div>
  );
}

const IDEDashboard = ({ isDark }) => {
  const [activeFile, setActiveFile] = useState('About.md')
  const [terminalOutput, setTerminalOutput] = useState('cat About.md')

  const files = [
    { name: 'About.md', icon: '📝', color: '#50a0ff' },
    { name: 'Skills.json', icon: '⚙️', color: '#81c784' },
    { name: 'Projects.js', icon: '🚀', color: '#f5d060' },
    { name: 'Contact.py', icon: '🐍', color: '#ff5f57' },
    { name: 'package.json', icon: '📦', color: '#a855f7' }
  ]

  const getCode = () => {
    switch (activeFile) {
      case 'About.md':
        return (
          <div style={{ color: '#d1d5db' }}>
            <span style={{ color: '#6b7280' }}># About Me</span>{'\n\n'}
            <span style={{ color: '#ff5f57' }}>- Name:</span> <span style={{ color: '#81c784' }}>Imran Shaikh</span>{'\n'}
            <span style={{ color: '#ff5f57' }}>- Role:</span> <span style={{ color: '#81c784' }}>Full Stack Developer</span>{'\n'}
            <span style={{ color: '#ff5f57' }}>- Degree:</span> <span style={{ color: '#81c784' }}>BCA Graduate</span>{'\n'}
            <span style={{ color: '#ff5f57' }}>- Exp:</span> <span style={{ color: '#81c784' }}>1+ Years</span>{'\n\n'}
            <span style={{ color: '#6b7280' }}>### Bio</span>{'\n'}
            <span style={{ color: '#9ca3af' }}>Passionate full-stack developer specializing in modern web apps.</span>{'\n'}
            <span style={{ color: '#9ca3af' }}>Building performant, interactive, and responsive user experiences.</span>
          </div>
        )
      case 'Skills.json':
        return (
          <div style={{ color: '#81c784' }}>
            <span style={{ color: '#50a0ff' }}>{'{'}</span>{'\n'}
            <span>  <span style={{ color: '#ff5f57' }}>"frontend"</span>: <span style={{ color: '#50a0ff' }}>[</span><span style={{ color: '#88ffaa' }}>"React"</span>, <span style={{ color: '#88ffaa' }}>"Next"</span>, <span style={{ color: '#88ffaa' }}>"Tailwind"</span><span style={{ color: '#50a0ff' }}>]</span>,</span>{'\n'}
            <span>  <span style={{ color: '#ff5f57' }}>"backend"</span>: <span style={{ color: '#50a0ff' }}>[</span><span style={{ color: '#88ffaa' }}>"Node"</span>, <span style={{ color: '#88ffaa' }}>"Express"</span>, <span style={{ color: '#88ffaa' }}>"APIs"</span><span style={{ color: '#50a0ff' }}>]</span>,</span>{'\n'}
            <span>  <span style={{ color: '#ff5f57' }}>"database"</span>: <span style={{ color: '#50a0ff' }}>[</span><span style={{ color: '#88ffaa' }}>"MongoDB"</span>, <span style={{ color: '#88ffaa' }}>"PostgreSQL"</span><span style={{ color: '#50a0ff' }}>]</span>,</span>{'\n'}
            <span>  <span style={{ color: '#ff5f57' }}>"tools"</span>: <span style={{ color: '#50a0ff' }}>[</span><span style={{ color: '#88ffaa' }}>"Git"</span>, <span style={{ color: '#88ffaa' }}>"GitHub"</span>, <span style={{ color: '#88ffaa' }}>"Vercel"</span><span style={{ color: '#50a0ff' }}>]</span></span>{'\n'}
            <span style={{ color: '#50a0ff' }}>{'}'}</span>
          </div>
        )
      case 'Projects.js':
        return (
          <div style={{ color: '#d1d5db' }}>
            <span style={{ color: '#50a0ff' }}>const</span> <span style={{ color: '#f5d060' }}>projects</span> = <span style={{ color: '#50a0ff' }}>[</span>{'\n'}
            <span>  {'{'} <span style={{ color: '#ff5f57' }}>name</span>: <span style={{ color: '#88ffaa' }}>"Skill Bridge"</span>, <span style={{ color: '#ff5f57' }}>type</span>: <span style={{ color: '#88ffaa' }}>"Job Portal"</span> {'}'},</span>{'\n'}
            <span>  {'{'} <span style={{ color: '#ff5f57' }}>name</span>: <span style={{ color: '#88ffaa' }}>"Home Roots"</span>, <span style={{ color: '#ff5f57' }}>type</span>: <span style={{ color: '#88ffaa' }}>"Real Estate"</span> {'}'},</span>{'\n'}
            <span>  {'{'} <span style={{ color: '#ff5f57' }}>name</span>: <span style={{ color: '#88ffaa' }}>"Netflix Clone"</span>, <span style={{ color: '#ff5f57' }}>type</span>: <span style={{ color: '#88ffaa' }}>"Streaming UI"</span> {'}'},</span>{'\n'}
            <span>  {'{'} <span style={{ color: '#ff5f57' }}>name</span>: <span style={{ color: '#88ffaa' }}>"MSI Website"</span>, <span style={{ color: '#ff5f57' }}>type</span>: <span style={{ color: '#88ffaa' }}>"Gaming Brand"</span> {'}'}</span>{'\n'}
            <span style={{ color: '#50a0ff' }}>]</span>
          </div>
        )
      case 'Contact.py':
        return (
          <div style={{ color: '#d1d5db' }}>
            <span style={{ color: '#ff5f57' }}>def</span> <span style={{ color: '#a855f7' }}>get_contact_info</span>():{'\n'}
            <span style={{ color: '#228b22' }}>    # Blazing-fast networking coords</span>{'\n'}
            <span>    email = <span style={{ color: '#88ffaa' }}>"imran071202@gmail.com"</span></span>{'\n'}
            <span>    phone = <span style={{ color: '#88ffaa' }}>"+91 7427928647"</span></span>{'\n'}
            <span>    status = <span style={{ color: '#28c864' }}>"READY_TO_BUILD"</span></span>{'\n'}
            <span style={{ color: '#ff5f57' }}>    return</span> {'{'} <span style={{ color: '#88ffaa' }}>"email"</span>: email, <span style={{ color: '#88ffaa' }}>"phone"</span>: phone, <span style={{ color: '#88ffaa' }}>"status"</span>: status {'}'}
          </div>
        )
      case 'package.json':
        return (
          <div style={{ color: '#81c784' }}>
            <span style={{ color: '#50a0ff' }}>{'{'}</span>{'\n'}
            <span>  <span style={{ color: '#ff5f57' }}>"name"</span>: <span style={{ color: '#88ffaa' }}>"imran-portfolio"</span>,</span>{'\n'}
            <span>  <span style={{ color: '#ff5f57' }}>"version"</span>: <span style={{ color: '#88ffaa' }}>"2.0.0"</span>,</span>{'\n'}
            <span>  <span style={{ color: '#ff5f57' }}>"dependencies"</span>: <span style={{ color: '#50a0ff' }}>{'{'}</span></span>{'\n'}
            <span>    <span style={{ color: '#ff5f57' }}>"next"</span>: <span style={{ color: '#88ffaa' }}>"^16.2.2"</span>,</span>{'\n'}
            <span>    <span style={{ color: '#ff5f57' }}>"react"</span>: <span style={{ color: '#88ffaa' }}>"^19.2.4"</span>,</span>{'\n'}
            <span>    <span style={{ color: '#ff5f57' }}>"tailwindcss"</span>: <span style={{ color: '#88ffaa' }}>"^4.0"</span></span>{'\n'}
            <span>  <span style={{ color: '#50a0ff' }}>{'}'}</span></span>{'\n'}
            <span style={{ color: '#50a0ff' }}>{'}'}</span>
          </div>
        )
      default:
        return null
    }
  }

  const getLines = () => {
    switch (activeFile) {
      case 'About.md': return [1, 2, 3, 4, 5, 6, 7, 8, 9]
      case 'Skills.json': return [1, 2, 3, 4, 5, 6, 7]
      case 'Projects.js': return [1, 2, 3, 4, 5, 6, 7]
      case 'Contact.py': return [1, 2, 3, 4, 5, 6]
      case 'package.json': return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      default: return [1, 2, 3, 4, 5]
    }
  }

  const handleFileClick = (name) => {
    setActiveFile(name)
    setTerminalOutput(`cat ${name}`)
  }

  return (
    <div className="ide-container">
      {/* Window Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', background: 'rgba(3,3,5,0.98)', borderBottom: '1px solid rgba(34,139,34,0.12)', fontSize: 11, color: 'rgba(34,139,34,0.5)', position: 'relative' }}>
        <div style={{ display: 'flex', gap: 6, zIndex: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(34, 139, 34, 0.65)' }}>
          imran@workspace: ~/portfolio_v2.0
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'rgba(34, 139, 34, 0.45)' }}>
          <span>IDE::ONLINE</span>
        </div>
      </div>

      {/* Main Inner Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div className="ide-sidebar">
          <div style={{ padding: '0 16px 8px', fontSize: 11, fontWeight: 700, color: 'rgba(34, 139, 34, 0.55)', borderBottom: '1px solid rgba(34, 139, 34, 0.12)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Workspace
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
            {files.map(f => (
              <button
                key={f.name}
                onClick={() => handleFileClick(f.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px',
                  fontSize: 12, color: activeFile === f.name ? '#ffffff' : 'rgba(34, 139, 34, 0.7)',
                  background: activeFile === f.name ? 'rgba(34, 139, 34, 0.15)' : 'transparent',
                  borderLeft: activeFile === f.name ? '3px solid #28c864' : '3px solid transparent',
                  textAlign: 'left', cursor: 'pointer', outline: 'none', transition: 'all 0.2s', borderRight: 'none', borderTop: 'none', borderBottom: 'none'
                }}
              >
                <span style={{ fontSize: 13, color: f.color }}>{f.icon}</span>
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="ide-editor">
          {/* Editor Tabs */}
          <div style={{ display: 'flex', background: 'rgba(3, 3, 5, 0.98)', borderBottom: '1px solid rgba(34, 139, 34, 0.12)', height: 32, overflowX: 'auto' }}>
            {files.map(f => (
              <button
                key={f.name}
                onClick={() => handleFileClick(f.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px',
                  fontSize: 11, color: activeFile === f.name ? '#ffffff' : 'rgba(34, 139, 34, 0.5)',
                  background: activeFile === f.name ? 'rgba(5, 5, 8, 0.94)' : 'transparent',
                  borderBottom: activeFile === f.name ? '2px solid #28c864' : '2px solid transparent',
                  cursor: 'pointer', outline: 'none', whiteSpace: 'nowrap', borderLeft: 'none', borderRight: 'none', borderTop: 'none'
                }}
              >
                <span>{f.name}</span>
              </button>
            ))}
          </div>

          {/* Editor Code Pane */}
          <div style={{ flex: 1, display: 'flex', padding: 16, overflowY: 'auto', textAlign: 'left', lineHeight: 1.6, fontSize: 13 }}>
            {/* Line Numbers */}
            <div style={{ width: 28, display: 'flex', flexDirection: 'column', color: 'rgba(34, 139, 34, 0.35)', userSelect: 'none', paddingRight: 8, borderRight: '1px solid rgba(34, 139, 34, 0.08)' }}>
              {getLines().map(l => <span key={l}>{l}</span>)}
            </div>
            {/* Code */}
            <div style={{ flex: 1, paddingLeft: 16, whiteSpace: 'pre', overflowX: 'auto' }}>
              {getCode()}
            </div>
          </div>

          {/* Terminal/Output footer */}
          <div style={{ background: 'rgba(3, 3, 5, 0.96)', borderTop: '1px solid rgba(34, 139, 34, 0.12)', padding: '6px 16px', fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#28c864' }}>● Terminal</span>
              <span style={{ color: 'rgba(34, 139, 34, 0.45)' }}>imran@macbook:~ $ {terminalOutput}</span>
            </div>
            <span style={{ color: '#50a0ff' }}>UTF-8</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main ────────────────────────────────────────────────────── */
const Body = () => {
  const [isOpen, setIsOpen] = useState()
  const [isDark, setIsDark] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const check = () => { const t = document.documentElement.getAttribute('data-theme'); setIsDark(t !== 'light') }
    const updateSize = () => setIsSmallScreen(window.innerWidth <= 767)
    check()
    updateSize()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', updateSize)
    return () => { obs.disconnect(); window.removeEventListener('resize', updateSize) }
  }, [])

  const handleDownloadPdf = () => {
    const link = document.createElement('a'); link.href = './photo/Imran_Shaikh_cv.pdf'
    link.download = './photo/Imran_Shaikh_cv.pdf'; link.click()
  }

  const D = isDark
  const sectionBg = D ? 'transparent' : '#faf6e8'
  const gridColor = D ? 'rgba(34, 139, 34,0.04)' : 'rgba(27, 94, 32,0.06)'
  const glowColor = D ? 'rgba(34, 139, 34,0.07)' : 'rgba(27, 94, 32,0.07)'
  const greetColor = D ? '#d1d5db' : '#3d1f04'
  const statBorder = D ? 'rgba(34, 139, 34,0.15)' : 'rgba(27, 94, 32,0.22)'
  const statBg = D ? 'rgba(34, 139, 34,0.05)' : 'rgba(27, 94, 32,0.07)'
  const dividerBg = D
    ? 'linear-gradient(90deg, transparent, #228b22, transparent)'
    : 'linear-gradient(90deg, transparent, #1b5e20, transparent)'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        #Body {
          font-family: 'Rajdhani', sans-serif;
          position: relative; overflow: hidden; overflow-x: clip;
          width: 100%; max-width: 100vw; transition: background 0.4s;
        }

        .gold-title {
          font-family: 'Cinzel Decorative', serif;
          background: linear-gradient(120deg, #74c69d 0%, #228b22 25%, #d8f3dc 50%, #228b22 75%, #74c69d 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 20px rgba(34,139,34,0.4));
          animation: shineGradient 8s linear infinite;
        }
        @keyframes shineGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .hero-copy, .hero-media, .hero-stats { max-width: 100%; min-width: 0; }

        .avatar-ring {
          border: 2px dashed rgba(34, 139, 34, 0.45);
          border-top-color: #50a0ff;
          border-bottom-color: #ff5f57;
          animation: spin-ring 14s linear infinite;
          background: transparent;
        }
        .avatar-ring-inner {
          border: 1px dotted rgba(80, 160, 255, 0.55);
          border-left-color: #228b22;
          border-right-color: #ff5f57;
          animation: spin-ring-reverse 9s linear infinite;
          background: transparent;
        }
        @keyframes spin-ring { to { transform: rotate(360deg); } }
        @keyframes spin-ring-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .avatar-inner { transform: translateZ(30px); }

        .glow-btn { background: linear-gradient(135deg, #228b22, #1b5e20); box-shadow: 0 0 20px rgba(34, 139, 34,0.4), inset 0 1px 0 rgba(255,255,255,0.2); transition: all 0.3s ease; }
        .glow-btn:hover { box-shadow: 0 0 35px rgba(34, 139, 34,0.7), inset 0 1px 0 rgba(255,255,255,0.3); transform: translateY(-2px) scale(1.03); }

        .social-btn { width:44px; height:44px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:1px solid rgba(34,139,34,0.3); background:rgba(34,139,34,0.05); backdrop-filter:blur(8px); transition:all 0.3s ease; color:#228b22; font-size:1.2rem; }
        .social-btn:hover { border-color:#228b22; background:rgba(34,139,34,0.15); box-shadow:0 0 16px rgba(34,139,34,0.5); transform:translateY(-4px) scale(1.1); }

        .status-dot { width:8px; height:8px; background:#22c55e; border-radius:50%; box-shadow:0 0 8px #22c55e; animation:pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100% { box-shadow:0 0 6px #22c55e; } 50% { box-shadow:0 0 14px #22c55e, 0 0 24px #22c55e55; } }

        .corner-bracket::before, .corner-bracket::after,
        .corner-bracket > span::before, .corner-bracket > span::after {
          content:''; position:absolute; width:22px; height:22px; border-color:#228b22; border-style:solid;
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
          0%,100% { box-shadow:0 0 12px rgba(34, 139, 34,0.5); transform:translate(-50%,-50%) rotate(45deg) scale(1); }
          50%      { box-shadow:0 0 24px rgba(34, 139, 34,0.9); transform:translate(-50%,-50%) rotate(45deg) scale(1.3); }
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
          display:inline-flex; align-items:center; gap:8px; padding:6px 14px;
          border-radius:6px; font-family:'Courier New',monospace; font-size:11px;
          font-weight:700; letter-spacing:0.08em;
          border:1px solid rgba(40,200,100,0.45); background:rgba(5, 10, 5, 0.85);
          color:rgba(40,200,100,0.95); margin-bottom:16px;
          box-shadow: 0 0 12px rgba(40,200,100,0.08);
          animation:badgePulse 3s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%,100% { border-color:rgba(40,200,100,0.45); box-shadow: 0 0 12px rgba(40,200,100,0.08); }
          50%      { border-color:rgba(40,200,100,0.85); box-shadow: 0 0 20px rgba(40,200,100,0.25); }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink-cursor 1s step-end infinite;
          color: #28c864;
          font-weight: bold;
        }
        .ping-dot { width:8px; height:8px; border-radius:50%; display:inline-block; animation:pingAnim 1.8s ease-in-out infinite; }
        @keyframes pingAnim { 0%,100% { box-shadow:0 0 0 0 rgba(40,200,100,0.7); } 50% { box-shadow:0 0 0 6px rgba(40,200,100,0); } }

        .hud-pip { position:absolute; width:6px; height:6px; border-radius:50%; background:#228b22; animation:pipBlink 2s ease-in-out infinite; z-index:10; }

        .data-label {
          position:absolute; font-family:'Courier New',monospace; font-size:9px;
          letter-spacing:0.12em; color:rgba(34, 139, 34,0.38);
          writing-mode:vertical-rl; text-orientation:mixed;
          pointer-events:none; user-select:none; z-index:4;
        }

        .sys-strip { display:flex; gap:18px; margin-bottom:14px; font-family:'Courier New',monospace; font-size:10px; color:rgba(34, 139, 34,0.45); flex-wrap:wrap; }
        .sys-strip span { display:flex; align-items:center; gap:5px; }

        .ide-container {
          width: 100%;
          max-width: 650px;
          height: 480px;
          background: rgba(5, 5, 8, 0.94);
          border: 1px solid rgba(34, 139, 34, 0.3);
          border-radius: 12px;
          box-shadow: 0 0 60px rgba(34, 139, 34, 0.18), inset 0 0 24px rgba(0, 0, 0, 0.85);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Courier New', monospace;
          z-index: 10;
        }
        .ide-sidebar {
          width: 190px;
          background: rgba(3, 3, 5, 0.96);
          border-right: 1px solid rgba(34, 139, 34, 0.12);
          display: flex;
          flex-direction: column;
          padding: 12px 0;
        }
        .ide-editor {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* center divider hidden on mobile/tablet */
        .center-divider { display:block; }

        /* Hide desktop terminals on medium screen widths to avoid overlap with split layout */
        @media (max-width: 1279px) {
          .term-desktop { display: none !important; }
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          #Body { padding-top:86px; width:100vw; max-width:100vw; align-items:center; overflow-x:hidden; }
          .hero-copy { width:100% !important; max-width:calc(100vw - 32px) !important; overflow: visible !important; }
          .hero-media { width:100% !important; max-width:calc(100vw - 32px) !important; overflow: visible !important; }
          .gold-title { width:100%; max-width:100%; font-size:clamp(2rem,10vw,3rem) !important; line-height:1.12 !important; text-align:center; overflow-wrap:anywhere; }
          .hero-role { width:100%; max-width:100%; overflow-wrap:anywhere; }
          .sys-strip { width:100%; justify-content:center; }
          .hero-stats { width:100% !important; max-width:100% !important; }
          .ide-sidebar {
            display: none !important;
          }
          .ide-container {
            height: 420px !important;
          }
          .term-desktop { display:none !important; }
          .bracket-bg { display:none !important; }
          .data-label { display:none !important; }
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
        @media (max-width: 767px) {
          .scanlines-overlay { display: none !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        id='Body' name="Home"
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 md:px-16 lg:px-28 py-16 md:py-0"
        style={{ background: sectionBg, color: D ? '#ffffff' : '#1b5e20' }}
      >


        {/* Drifting Multi-Color Coding Symbols */}
        {[
          { text: "const",   top: "14%", left: "7%",   delay: 0,   color: "rgba(80, 160, 255, 0.22)" },
          { text: "{ }",     top: "70%", left: "8%",   delay: 3,   color: "rgba(255, 200, 60, 0.22)"  },
          { text: "=>",      top: "38%", left: "5%",   delay: 1.5, color: "rgba(255, 100, 80, 0.20)"  },
          { text: "import",  top: "80%", right: "8%",  delay: 4.5, color: "rgba(80, 160, 255, 0.20)"  },
          { text: "[ ]",     top: "22%", right: "9%",  delay: 2,   color: "rgba(255, 200, 60, 0.20)"  },
          { text: "async",   top: "60%", right: "6%",  delay: 5.5, color: "rgba(80, 160, 255, 0.18)"  },
          { text: "return",  top: "48%", left: "4%",   delay: 6,   color: "rgba(34, 200, 100, 0.18)"  },
          { text: "( )",     top: "10%", right: "20%", delay: 7,   color: "rgba(255, 200, 60, 0.16)"  },
          { text: "export",  top: "55%", right: "18%", delay: 3.5, color: "rgba(80, 160, 255, 0.15)"  },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -14, 0] }}
            transition={{ duration: 6 + idx * 0.4, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            className="absolute font-mono text-[12px] font-semibold pointer-events-none select-none hidden md:block"
            style={{
              top: item.top, left: item.left, right: item.right,
              color: item.color,
              zIndex: 1,
              letterSpacing: '0.06em',
              textShadow: `0 0 8px ${item.color}`,
              willChange: 'transform, opacity',
            }}
          >
            {item.text}
          </motion.div>
        ))}

        {/* ── Centered Hero Layout ── */}
        <div className="w-full max-w-[900px] mx-auto z-10 flex flex-col items-center justify-center text-center gap-6 pt-28 pb-16 md:py-24 lg:py-32 select-none">

          {/* Main Greeting Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2 text-white">
            Hi, I'm <br />
            <span className="gold-title mt-2 inline-block">Imran Shaikh</span>
          </h1>

          {/* Dynamic Typing Subtitle */}
          <div className="text-2xl md:text-3xl font-mono text-gray-300 mb-4 flex items-center justify-center gap-2">
            <span className="text-[#28c864]">&gt;</span>
            <ReactTyped
              strings={[
                "Full Stack Developer",
                // "Next.js & React Specialist",
                // "PERN Stack Developer",
                "Problem Solver"
              ]}
              typeSpeed={60}
              backSpeed={40}
              backDelay={1200}
              loop
            />
          </div>

          {/* Professional Bio */}
          <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed font-sans max-w-2xl mx-auto">
            Passionate full-stack developer specializing in modern web applications.
            Building performant, interactive, and responsive user experiences with clean code.
          </p>

          {/* Stats Area */}
          <div className="w-full max-w-xl mx-auto grid grid-cols-3 gap-6 border-t border-[#228b22]/15 pt-8 mt-4">
            <Stat value="1+" label="Years Exp" delay={0.4} isDark={D} color="green" />
            <Stat value="10+" label="Projects" delay={0.5} isDark={D} color="blue" />
            <Stat value="100%" label="Commitment" delay={0.6} isDark={D} color="purple" />
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300"
        >
          <Link to="About" smooth={true} duration={500} className="flex flex-col items-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#81c784] mb-1.5">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-[#228b22]/30 rounded-full flex justify-center pt-1"
            >
              <div className="w-1.5 h-1.5 bg-[#28c864] rounded-full" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Body