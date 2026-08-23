"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { FiBriefcase, FiCalendar, FiMapPin, FiCode, FiExternalLink } from "react-icons/fi"

/* ══ DEMO DATA — replace with your real experience later ══════ */
const experiences = [
     {
    id: 2,
    role: "Full Stack Developer",
    company: "Microace Software",
    type: "Full Time",
    period: "Sep 2025 – Present",
    duration: "Ongoing",
    location: "Kolkata, West Bengal",
    url: "#",
    description:
      "Worked on building and maintaining full-stack web applications using React.js and Node.js. Collaborated with a cross-functional team to deliver responsive UI components and RESTful APIs. Improved page load performance by optimizing frontend assets.",
    highlights: [
    //   "Built 5+ reusable React components used across the product",
      "Developed REST APIs with Node.js & Express for user authentication",
      "Reduced API response time by 30% through query optimization",
      "Participated in daily stand-ups and agile sprint planning",
    ],
    tech: ["React.js", "Node.js", "PostgreSQl", "Tailwind CSS", "Express.js", 'Firebase'],
    color: "#228b22",
    current: true,
  },
  {
    id: 1,
    role: "Web Developer",
    company: "Navodita Infotech",
    type: "Internship",
    period: "Apr – May 25",
     duration: "1 months",
    location: "Remote",
    url: "#",
    description:
      "Designing and developing custom websites and web applications. Focused on delivering clean, modern, and responsive interfaces with great user experience.",
    highlights: [
      "Worked remotely on developing web applications using HTML, CSS, JavaScript, and React.js for the front end",
      "Supported back-end development using Node.js, Next JS, and MongoDB",
      "Building a Real Estate web site as part of a internship project",
      "Enhanced debugging and coding practices in both front-end and back-end environments",
    ],
    tech: ["Next.js", "React.js", "Tailwind CSS", "JavaScript", "MongoDB"],
    color: "#3b82f6",
    current: false,
  },
  
 
]

/* ══ Section Heading ══════════════════════════════════════════ */
const SectionHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center mb-14"
  >
    <h2 style={{
      fontFamily: "'Cinzel', serif",
      fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
      fontWeight: 900,
      background: 'linear-gradient(135deg, #74c69d 0%, #228b22 40%, #d8f3dc 60%, #1b5e20 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: 'drop-shadow(0 0 12px rgba(34,139,34,0.45))',
      letterSpacing: '0.08em',
      textAlign: 'center',
    }}>Experience</h2>
    <div style={{ width: 70, height: 2, marginTop: 12, background: 'linear-gradient(90deg,transparent,#228b22,transparent)' }} />
    <div style={{ width: 30, height: 2, marginTop: 5, background: 'linear-gradient(90deg,transparent,rgba(34,139,34,0.4),transparent)' }} />
    <p style={{
      marginTop: 14, fontSize: '0.88rem', letterSpacing: '0.06em',
      textAlign: 'center', maxWidth: 420,
      fontFamily: 'Rajdhani, sans-serif',
    }} className="exp-subtext">
      My professional journey and work experience
    </p>
  </motion.div>
)

/* ══ Tech Badge ═══════════════════════════════════════════════ */
const TechBadge = ({ label, isDark }) => (
  <span style={{
    display: 'inline-block', padding: '3px 11px', borderRadius: 7,
    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em',
    border: `1px solid ${isDark ? 'rgba(34,139,34,0.22)' : 'rgba(27,94,32,0.25)'}`,
    background: isDark ? 'rgba(34,139,34,0.07)' : 'rgba(27,94,32,0.08)',
    color: isDark ? 'rgba(34,139,34,0.8)' : '#1b5e20',
    fontFamily: 'Rajdhani, sans-serif',
  }}>{label}</span>
)

/* ══ Experience Card ══════════════════════════════════════════ */
const ExperienceCard = ({ exp, index, isDark }) => {
  const [expanded, setExpanded] = useState(false)

  const D = isDark
  const bgCard   = D ? 'rgba(10,8,3,0.92)'        : 'rgba(232, 245, 233,0.97)'
  const borderC  = D ? 'rgba(34, 139, 34,0.14)'     : 'rgba(27, 94, 32,0.2)'
  const borderHv = D ? 'rgba(34, 139, 34,0.45)'     : 'rgba(27, 94, 32,0.5)'
  const textH    = D ? '#f3f4f6'                   : '#1b5e20'
  const textB    = D ? '#c9cdd5'                   : '#1b5e20'
  const textM    = D ? '#7a8090'                   : '#1b5e20'
  const hlBg     = D ? 'rgba(34, 139, 34,0.06)'     : 'rgba(27, 94, 32,0.07)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        borderRadius: 18,
        border: `1px solid ${borderC}`,
        background: bgCard,
        backdropFilter: 'blur(16px)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        cursor: 'default',
      }}
      whileHover={{
        borderColor: borderHv,
        boxShadow: `0 0 35px rgba(34, 139, 34,0.12), 0 8px 32px rgba(0,0,0,0.25)`,
        y: -4,
      }}
    >
      {/* top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: '6%', right: '6%', height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(34, 139, 34,0.5),transparent)',
      }} />

      {/* left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: `linear-gradient(180deg, ${exp.color}80, ${exp.color}, ${exp.color}40)`,
        borderRadius: '18px 0 0 18px',
        boxShadow: `2px 0 12px ${exp.color}40`,
      }} />

      {/* watermark number */}
      <span style={{
        position: 'absolute', right: 20, top: 10,
        fontFamily: 'Cinzel, serif', fontSize: '5.5rem', fontWeight: 900, lineHeight: 1,
        color: D ? 'rgba(34, 139, 34,0.05)' : 'rgba(27, 94, 32,0.05)',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>{String(index + 1).padStart(2, '0')}</span>

      <div className="relative z-10 p-6 md:p-8">

        {/* ── TOP ROW ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div className="flex items-start gap-4">
            {/* icon circle */}
            <div style={{
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${exp.color}14`,
              border: `1px solid ${exp.color}35`,
              color: exp.color,
              fontSize: '1.2rem',
              boxShadow: `0 0 14px ${exp.color}20`,
            }}>
              <FiBriefcase />
            </div>

            <div>
              {/* role */}
              <h3 style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: 900, lineHeight: 1.2, marginBottom: 3,
                background: 'linear-gradient(135deg,#81c784,#228b22,#1b5e20)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{exp.role}</h3>

              {/* company */}
              <p style={{ color: textH, fontWeight: 700, fontSize: '1rem', fontFamily: 'Rajdhani, sans-serif' }}>
                {exp.company}
                {exp.url && exp.url !== '#' && (
                  <a href={exp.url} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'rgba(34,139,34,0.5)', marginLeft: 6, fontSize: '0.75rem', verticalAlign: 'middle' }}>
                    <FiExternalLink style={{ display: 'inline' }} />
                  </a>
                )}
              </p>
            </div>
          </div>

          {/* badges top-right */}
          <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
            {/* type pill */}
            <span style={{
              padding: '3px 12px', borderRadius: 99,
              fontSize: '0.6rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.16em',
              background: `${exp.color}18`,
              border: `1px solid ${exp.color}40`,
              color: exp.color,
              fontFamily: 'Rajdhani, sans-serif',
              whiteSpace: 'nowrap',
            }}>{exp.type}</span>

            {/* current badge */}
            {exp.current && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '3px 10px', borderRadius: 99,
                fontSize: '0.6rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                color: '#22c55e',
                fontFamily: 'Rajdhani, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
                    display: 'inline-block', boxShadow: '0 0 6px #22c55e' }}
                />
                Current
              </span>
            )}
          </div>
        </div>

        {/* ── META ROW ── */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5" style={{ zIndex: 10, position: 'relative' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: textM, fontFamily: 'Rajdhani, sans-serif' }}>
            <FiCalendar style={{ color: '#228b22', fontSize: '0.8rem', flexShrink: 0 }} />
            {exp.period}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: textM, fontFamily: 'Rajdhani, sans-serif' }}>
            <FiMapPin style={{ color: '#228b22', fontSize: '0.8rem', flexShrink: 0 }} />
            {exp.location}
          </span>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height: 1, marginBottom: 18, background: `linear-gradient(90deg,${borderC},transparent)` }} />

        {/* ── DESCRIPTION ── */}
        <p style={{ color: textB, lineHeight: 1.85, fontSize: '0.9rem', marginBottom: 18, fontFamily: 'Rajdhani, sans-serif' }}>
          {exp.description}
        </p>

        {/* ── KEY HIGHLIGHTS (expand/collapse) ── */}
        <div style={{ marginBottom: 18 }}>
          <button
            onClick={() => setExpanded(p => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.18em', cursor: 'pointer', border: 'none',
              background: 'transparent', padding: 0, marginBottom: 10,
              color: D ? 'rgba(34,139,34,0.7)' : '#228b22',
              fontFamily: 'Rajdhani, sans-serif',
              transition: 'color 0.2s',
            }}
          >
            <FiCode style={{ fontSize: '0.8rem' }} />
            Key Highlights
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ fontSize: '0.6rem', marginLeft: 2, display: 'inline-block' }}
            >▼</motion.span>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden', listStyle: 'none', padding: 0, margin: 0 }}
              >
                  {exp.highlights.map((hl, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2.5" 
                      style={{ 
                        color: textB, 
                        padding: '8px 12px', borderRadius: 9, marginBottom: 6,
                        background: hlBg,
                        border: `1px solid ${borderC}`,
                        fontSize: '0.84rem', fontFamily: 'Rajdhani, sans-serif', lineHeight: 1.6
                      }}
                    >
                      <span style={{ color: '#228b22', fontSize: '0.55rem', marginTop: 5, flexShrink: 0 }}>◆</span>
                      <span>{hl}</span>
                    </motion.li>
                  ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* ── TECH STACK ── */}
        <div>
          <p style={{
            fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em',
            color: textM, marginBottom: 8, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
          }}>Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {exp.tech.map(t => <TechBadge key={t} label={t} isDark={D} />)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ══ Main Component ═══════════════════════════════════════════ */
const Experience = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const check = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      setIsDark(theme !== 'light')
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const D = isDark
  const bg       = D ? 'transparent'                   : '#faf6e8'
  const gridLine = D ? 'rgba(34, 139, 34,0.035)'        : 'rgba(27, 94, 32,0.055)'
  const subText  = D ? '#6b7280'                       : '#1b5e20'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        #Experience { font-family: 'Rajdhani', sans-serif; }
        .exp-wrap { position: relative; }
        .exp-subtext { color: ${subText}; }
      `}</style>

      <section
        id="Experience"
        name="Experience"
        className="exp-wrap w-full py-20 md:py-28 px-5 md:px-16 transition-colors duration-400"
        style={{ background: bg }}
      >
        {/* ambient glow orbs */}
        <div style={{
          position: 'absolute', top: '8%', right: '4%', width: 420, height: 420,
          background: 'radial-gradient(circle,rgba(34, 139, 34,0.055) 0%,transparent 70%)',
          pointerEvents: 'none', borderRadius: '50%', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: '12%', left: '3%', width: 300, height: 300,
          background: 'radial-gradient(circle,rgba(34, 139, 34,0.04) 0%,transparent 70%)',
          pointerEvents: 'none', borderRadius: '50%', zIndex: 0,
        }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading />

          {/* total experience summary strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mb-12 px-6 py-4 rounded-2xl"
            style={{
              border: `1px solid ${D ? 'rgba(34, 139, 34,0.14)' : 'rgba(27, 94, 32,0.2)'}`,
              background: D ? 'rgba(10,8,3,0.7)' : 'rgba(232, 245, 233,0.85)',
              backdropFilter: 'blur(12px)',
              maxWidth: 480, margin: '0 auto 48px',
            }}
          >
            {[
              { val: `${experiences.length}`,                              lbl: 'Positions'    },
              { val: experiences.filter(e => e.current).length ? '1'  :'0', lbl: 'Current Role' },
              { val: '1+',                                                  lbl: 'Years Total'  },
            ].map((s, i) => (
              <React.Fragment key={s.lbl}>
                {i > 0 && <div style={{ width: 1, background: D ? 'rgba(34, 139, 34,0.2)' : 'rgba(27, 94, 32,0.2)' }} />}
                <div className="text-center">
                  <p style={{
                    fontSize: '1.6rem', fontWeight: 900, lineHeight: 1,
                    background: 'linear-gradient(135deg,#81c784,#228b22)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{s.val}</p>
                  <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: D ? '#6b7280' : '#1b5e20', marginTop: 2, fontFamily: 'Rajdhani, sans-serif' }}>{s.lbl}</p>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* timeline vertical line (decorative) */}
          <div className="relative">
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
              background: `linear-gradient(180deg, transparent, ${D ? 'rgba(34, 139, 34,0.15)' : 'rgba(27, 94, 32,0.18)'}, transparent)`,
              display: 'none', // hidden on mobile, shown on xl
            }} className="hidden xl:block" />

            {/* cards */}
            <div className="flex flex-col gap-7">
              {experiences.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} index={i} isDark={D} />
              ))}
            </div>
          </div>

          {/* footer note */}
          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-14"
            style={{
              fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: D ? 'rgba(34, 139, 34,0.3)' : 'rgba(27, 94, 32,0.38)',
              fontFamily: 'Rajdhani, sans-serif',
            }}
          >── More experience coming soon ──</motion.p> */}
        </div>
      </section>

      <div style={{ height: 0.5, background: `linear-gradient(90deg,transparent,${D ? 'rgba(34, 139, 34,0.055)' : 'rgba(34, 139, 34,0.055)'},transparent)` }} />
    </>
  )
}

export default Experience