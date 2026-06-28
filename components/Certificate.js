"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { FiCalendar, FiExternalLink, FiX, FiZoomIn, FiAward } from "react-icons/fi"
import { HiOutlineBadgeCheck } from "react-icons/hi"
import { BsStarFill, BsPatchCheckFill } from "react-icons/bs"
import { RiMedalFill } from "react-icons/ri"

/* ══ CERTIFICATES DATA ════════════════════════════════════════ */
const certificates = [
  {
    id: 1,
    title: "Software Engineer",
    issuer: "HackerRank",
    date: "28 Jan 26",
    url: "https://www.hackerrank.com/certificates/iframe/41c3f1369ca9",
    image: "./photo/softwareengineer.png",
    category: "Software Engineer",
    color: "#00ea64",
    icon: "💻",
    description: "Earned the HackerRank Software Engineer certification, demonstrating proficiency in core computer science fundamentals, problem solving, and software development practices.",
  },
  {
    id: 2,
    title: "SQL Advanced",
    issuer: "HackerRank",
    date: "04 Apr 26",
    url: "https://www.hackerrank.com/certificates/iframe/30ac4b3be982",
    image: "./photo/sql.png",
    category: "SQL",
    color: "#68a063",
    icon: "🗄️",
    description: "Learned Advanced SQL.",
  },
  {
    id: 3,
    title: "Web Development Internship",
    issuer: "Navodita Infotech",
    date: "26 May 25",
    url: "#",
    image: "./photo/web.jpg",
    category: "Web Development",
    color: "#d4af37",
    icon: "🌐",
    description: "Covered server-side rendering, static generation, API routes, and full-stack deployment with Vercel.",
  },
]

const categories = ["All", ...Array.from(new Set(certificates.map(c => c.category)))]

/* ══ Section Heading ══════════════════════════════════════════ */
const SectionHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center mb-12"
  >
    <h2 style={{
      fontFamily: "'Cinzel', serif",
      fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
      fontWeight: 900,
      background: 'linear-gradient(135deg,#f5d060 0%,#d4af37 40%,#fffacd 60%,#b8860b 100%)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.45))',
      letterSpacing: '0.08em', textAlign: 'center',
    }}>Certificates</h2>
    <div style={{ width: 70, height: 2, marginTop: 12, background: 'linear-gradient(90deg,transparent,#d4af37,transparent)' }} />
    <div style={{ width: 30, height: 2, marginTop: 5, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)' }} />
    <p className="cert-sub" style={{
      marginTop: 14, fontSize: '0.88rem', letterSpacing: '0.06em',
      textAlign: 'center', maxWidth: 400, fontFamily: 'Rajdhani, sans-serif',
    }}>
      Courses &amp; certifications I've completed
    </p>
  </motion.div>
)

/* ══ Lightbox — logic untouched, visuals enhanced ════════════ */
const Lightbox = ({ cert, onClose, isDark }) => {
  const D = isDark
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.93)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, backdropFilter: 'blur(16px)',
        overflowY: 'auto',
      }}
      className="cert-lightbox"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="cert-lightbox-panel"
        style={{
          borderRadius: 24, overflow: 'hidden',
          border: `1px solid ${cert.color}45`,
          background: D ? 'rgba(6,4,1,0.99)' : 'rgba(255,253,242,0.99)',
          maxWidth: 740, width: '100%',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          boxShadow: `0 0 100px ${cert.color}18, 0 0 60px rgba(212,175,55,0.15), 0 30px 80px rgba(0,0,0,0.75)`,
          position: 'relative',
        }}
      >
        {/* full-width gold cap line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 10,
          background: `linear-gradient(90deg, transparent 0%, ${cert.color} 20%, #fffacd 50%, ${cert.color} 80%, transparent 100%)`,
          filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.8))',
        }} />

        {/* close */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.12, background: 'rgba(212,175,55,0.22)' }}
          whileTap={{ scale: 0.88 }}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 20,
            width: 40, height: 40, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(212,175,55,0.38)',
            background: 'rgba(212,175,55,0.09)',
            color: '#d4af37', cursor: 'pointer', fontSize: '1.1rem',
            transition: 'all 0.2s',
          }}
        ><FiX /></motion.button>

        {/* image zone */}
        <div className="cert-lightbox-image" style={{
          width: '100%', height: 340, overflow: 'hidden', position: 'relative',
          background: D
            ? 'linear-gradient(160deg, rgba(10,7,1,0.97) 0%, rgba(18,13,3,0.97) 100%)'
            : 'linear-gradient(160deg, rgba(248,242,220,0.97) 0%, rgba(255,250,230,0.97) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: `1px solid ${cert.color}30`,
        }}>
          {/* grid bg */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(${cert.color}08 1px,transparent 1px),linear-gradient(90deg,${cert.color}08 1px,transparent 1px)`,
            backgroundSize: '32px 32px',
          }} />
          {/* large corner brackets */}
          {[
            { top: 14, left: 14, bw: '2px 0 0 2px' },
            { top: 14, right: 14, bw: '2px 2px 0 0' },
            { bottom: 14, left: 14, bw: '0 0 2px 2px' },
            { bottom: 14, right: 14, bw: '0 2px 2px 0' },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', width: 28, height: 28, zIndex: 2,
              borderColor: `${cert.color}65`, borderStyle: 'solid', borderWidth: s.bw,
              top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            }} />
          ))}
          {/* cert img */}
          <img
            src={cert.image} alt={cert.title}
            style={{
              maxWidth: '88%', maxHeight: '88%', objectFit: 'contain',
              position: 'relative', zIndex: 1, borderRadius: 10,
              boxShadow: `0 0 40px ${cert.color}25, 0 8px 30px rgba(0,0,0,0.5)`,
            }}
            onError={e => { e.target.style.display = 'none' }}
          />
          {/* fallback */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${cert.color}15`, border: `1px solid ${cert.color}35`,
              fontSize: '2.4rem',
            }}>{cert.icon}</div>
            <p style={{ color: `${cert.color}45`, fontSize: '0.7rem', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Certificate Preview
            </p>
          </div>
          {/* glow overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 2, pointerEvents: 'none',
            background: `linear-gradient(transparent, ${D?'rgba(6,4,1,0.6)':'rgba(248,242,220,0.6)'})`,
          }} />
        </div>

        {/* info */}
        <div className="cert-lightbox-info" style={{ padding: '24px 30px 30px', position: 'relative' }}>
          {/* pills row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <span style={{
              padding: '4px 14px', borderRadius: 99, fontSize: '0.6rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.15em',
              background: `${cert.color}18`, border: `1px solid ${cert.color}42`, color: cert.color,
              fontFamily: 'Rajdhani, sans-serif',
            }}>{cert.category}</span>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 12px', borderRadius: 99, fontSize: '0.6rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e',
              fontFamily: 'Rajdhani, sans-serif',
            }}>
              <BsPatchCheckFill style={{ fontSize: '0.65rem' }} /> Verified
            </span>
          </div>

          {/* title + issuer row */}
          <div className="cert-lightbox-title-row" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${cert.color}14`, border: `1px solid ${cert.color}38`,
              fontSize: '1.5rem',
              boxShadow: `0 0 16px ${cert.color}20`,
            }}>{cert.icon}</div>
            <div>
              <h3 style={{
                fontFamily: 'Cinzel, serif', fontSize: 'clamp(1rem,2.5vw,1.15rem)', fontWeight: 900, lineHeight: 1.3, marginBottom: 5,
                background: 'linear-gradient(135deg,#f5d060,#d4af37,#c4961a)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{cert.title}</h3>
              <p style={{ color: D ? '#e5e7eb' : '#180e03', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Rajdhani, sans-serif' }}>
                {cert.issuer}
              </p>
            </div>
          </div>

          <div style={{ height: 1, margin: '14px 0', background: `linear-gradient(90deg,${cert.color}35,rgba(212,175,55,0.15),transparent)` }} />

          {cert.description && (
            <p style={{ color: D ? '#c9cdd5' : '#2d1a04', lineHeight: 1.85, fontSize: '0.88rem', fontFamily: 'Rajdhani, sans-serif', marginBottom: 20 }}>
              {cert.description}
            </p>
          )}

          {/* meta + btn */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: D ? '#7a8090' : '#7a4d0a', fontFamily: 'Rajdhani, sans-serif' }}>
                <FiCalendar style={{ color: '#d4af37', fontSize: '0.85rem' }} /> {cert.date}
              </span>
              {cert.credentialId && (
                <span style={{ fontSize: '0.78rem', color: D ? '#6b7280' : '#7a4d0a', fontFamily: 'Rajdhani, sans-serif' }}>
                  ID: {cert.credentialId}
                </span>
              )}
            </div>
            {cert.url && cert.url !== '#' && (
              <motion.a
                href={cert.url} target="_blank" rel="noopener noreferrer"
                className="cert-lightbox-verify"
                whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(212,175,55,0.55)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '10px 22px', borderRadius: 12,
                  background: 'linear-gradient(135deg,#f5d060,#d4af37,#b8860b)',
                  color: '#050300', fontWeight: 800, fontSize: '0.72rem',
                  textTransform: 'uppercase', letterSpacing: '0.18em',
                  textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif',
                  boxShadow: '0 0 20px rgba(212,175,55,0.38)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <FiExternalLink style={{ fontSize: '0.88rem' }} /> Verify Certificate
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══ Certificate Card ═════════════════════════════════════════ */
const CertCard = ({ cert, index, isDark, onOpen }) => {
  const D = isDark
  const bgCard  = D ? 'rgba(9,7,2,0.94)'       : 'rgba(255,253,242,0.97)'
  const borderC = D ? 'rgba(212,175,55,0.12)'   : 'rgba(160,110,10,0.18)'
  const textH   = D ? '#f3f4f6'                 : '#180e03'
  const textM   = D ? '#6b7280'                 : '#7a4d0a'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      onClick={() => onOpen(cert)}
      className="cert-card"
      style={{
        borderRadius: 20,
        border: `1px solid ${borderC}`,
        background: bgCard,
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.38s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── top shimmer line (on hover) ── */}
      <div className="cert-shimmer" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 5,
        background: `linear-gradient(90deg,transparent 0%,${cert.color} 25%,#fffacd 50%,${cert.color} 75%,transparent 100%)`,
        opacity: 0, transition: 'opacity 0.38s',
        filter: `drop-shadow(0 0 4px ${cert.color})`,
      }} />

      {/* ── left color bar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, zIndex: 4,
        background: `linear-gradient(180deg,${cert.color}40 0%,${cert.color}dd 40%,${cert.color}dd 60%,${cert.color}40 100%)`,
        borderRadius: '20px 0 0 20px',
        boxShadow: `3px 0 18px ${cert.color}35`,
      }} />

      {/* ══ IMAGE SECTION ══ */}
      <div style={{
        width: '100%', height: 185, overflow: 'hidden', position: 'relative',
        background: D
          ? `linear-gradient(160deg, rgba(12,9,2,0.97) 0%, rgba(7,5,1,0.99) 100%)`
          : `linear-gradient(160deg, rgba(248,243,222,0.98) 0%, rgba(255,251,234,0.98) 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${cert.color}25`,
        flexShrink: 0,
      }}>
        {/* fine grid bg */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${cert.color}07 1px,transparent 1px),linear-gradient(90deg,${cert.color}07 1px,transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />

        {/* radial glow center */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 50%, ${cert.color}12 0%, transparent 70%)`,
        }} />

        {/* corner brackets */}
        {[
          { top: 9, left: 9, borderWidth: '1.5px 0 0 1.5px' },
          { top: 9, right: 9, borderWidth: '1.5px 1.5px 0 0' },
          { bottom: 9, left: 9, borderWidth: '0 0 1.5px 1.5px' },
          { bottom: 9, right: 9, borderWidth: '0 1.5px 1.5px 0' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', width: 16, height: 16, zIndex: 3,
            borderColor: `${cert.color}55`, borderStyle: 'solid',
            borderWidth: s.borderWidth,
            top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            transition: 'border-color 0.35s',
          }} className="cert-bracket" />
        ))}

        {/* ── CERTIFICATE IMAGE ── */}
        <img
          src={cert.image}
          alt={cert.title}
          className="cert-img"
          style={{
            maxWidth: '86%', maxHeight: '80%',
            objectFit: 'contain',
            position: 'relative', zIndex: 2,
            borderRadius: 7,
            transition: 'transform 0.48s ease, filter 0.35s ease, box-shadow 0.35s ease',
            filter: `drop-shadow(0 4px 16px rgba(0,0,0,0.4))`,
          }}
          onError={e => { e.target.style.display = 'none' }}
        />

        {/* fallback */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${cert.color}12`, border: `1px solid ${cert.color}30`,
            fontSize: '1.9rem',
          }}>{cert.icon}</div>
          <p style={{
            color: `${cert.color}50`, fontSize: '0.56rem',
            fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>{cert.issuer}</p>
        </div>

        {/* zoom overlay */}
        <div className="cert-zoom" style={{
          position: 'absolute', inset: 0, zIndex: 6,
          background: 'rgba(0,0,0,0.52)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity 0.32s',
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${cert.color}22`,
            border: `1px solid ${cert.color}60`,
            color: cert.color, fontSize: '1.3rem',
            boxShadow: `0 0 24px ${cert.color}40`,
          }}>
            <FiZoomIn />
          </div>
        </div>

        {/* category pill */}
        <span style={{
          position: 'absolute', top: 11, right: 13, zIndex: 7,
          padding: '3px 11px', borderRadius: 99,
          fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
          background: `${cert.color}20`, border: `1px solid ${cert.color}52`,
          color: cert.color, fontFamily: 'Rajdhani, sans-serif',
          backdropFilter: 'blur(10px)',
        }}>{cert.category}</span>

        {/* issuer label */}
        <span style={{
          position: 'absolute', bottom: 9, left: 13, zIndex: 7,
          fontSize: '0.54rem', fontWeight: 700,
          color: D ? 'rgba(212,175,55,0.45)' : 'rgba(130,80,10,0.5)',
          fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>{cert.issuer}</span>

        {/* bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, zIndex: 5, pointerEvents: 'none',
          background: `linear-gradient(transparent, ${D ? 'rgba(7,5,1,0.55)' : 'rgba(248,243,222,0.55)'})`,
        }} />
      </div>

      {/* ══ CONTENT SECTION ══ */}
      <div style={{ padding: '16px 18px 20px', paddingLeft: 22, flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* top row — verified + medal icon + stars */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <BsPatchCheckFill style={{ color: '#22c55e', fontSize: '0.95rem', flexShrink: 0 }} />
            <span style={{
              fontSize: '0.57rem', color: '#22c55e', fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em',
            }}>Verified</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {[...Array(3)].map((_, i) => (
              <BsStarFill key={i} style={{ fontSize: '0.52rem', color: `${cert.color}80` }} />
            ))}
            <RiMedalFill style={{ fontSize: '0.9rem', color: cert.color, marginLeft: 4, filter: `drop-shadow(0 0 4px ${cert.color}70)` }} />
          </div>
        </div>

        {/* title */}
        <h3 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
          fontWeight: 900, lineHeight: 1.35, marginBottom: 5,
          background: 'linear-gradient(135deg,#f5d060,#d4af37,#c4961a)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>{cert.title}</h3>

        {/* issuer */}
        <p style={{
          color: textH, fontWeight: 700, fontSize: '0.84rem',
          fontFamily: 'Rajdhani, sans-serif', marginBottom: 12,
        }}>{cert.issuer}</p>

        {/* colored divider */}
        <div style={{
          height: 1, marginBottom: 13,
          background: `linear-gradient(90deg,${cert.color}50,${cert.color}18,transparent)`,
        }} />

        {/* bottom — date + hint */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4, marginTop: 'auto' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: textM, fontSize: '0.76rem', fontFamily: 'Rajdhani, sans-serif' }}>
            <FiCalendar style={{ color: '#d4af37', fontSize: '0.72rem', flexShrink: 0 }} />
            {cert.date}
          </span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.57rem', letterSpacing: '0.08em',
            color: D ? `${cert.color}60` : 'rgba(130,80,10,0.5)',
            fontFamily: 'Rajdhani, sans-serif',
          }}>
            <FiZoomIn style={{ fontSize: '0.62rem' }} /> Click to view
          </span>
        </div>
      </div>

      {/* hover styles per-card */}
      <style>{`
        .cert-card:hover {
          border-color: ${cert.color}50 !important;
          box-shadow: 0 0 50px ${cert.color}14, 0 0 0 1px ${cert.color}22, 0 16px 50px rgba(0,0,0,0.32);
          transform: translateY(-8px) !important;
        }
        .cert-card:hover .cert-shimmer { opacity: 1 !important; }
        .cert-card:hover .cert-zoom    { opacity: 1 !important; }
        .cert-card:hover .cert-img     { transform: scale(1.1) !important; filter: drop-shadow(0 8px 24px rgba(0,0,0,0.55)) brightness(1.06) !important; }
        .cert-card:hover .cert-bracket { border-color: ${cert.color}90 !important; }
      `}</style>
    </motion.div>
  )
}

/* ══ Main Component — logic 100% untouched ════════════════════ */
const Certificate = () => {
  const [isDark, setIsDark] = useState(true)
  const [activeFilter, setActiveFilter] = useState("All")
  const [selected, setSelected] = useState(null)

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

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const D = isDark
  const bg       = D ? '#050503'                  : '#faf6e8'
  const gridLine = D ? 'rgba(212,175,55,0.035)'   : 'rgba(160,120,10,0.055)'
  const filterBg = D ? 'rgba(10,8,3,0.9)'         : 'rgba(255,253,242,0.95)'
  const filterBdr= D ? 'rgba(212,175,55,0.14)'    : 'rgba(160,110,10,0.2)'
  const subColor = D ? '#6b7280'                  : '#7a4d0a'

  const filtered = activeFilter === "All"
    ? certificates
    : certificates.filter(c => c.category === activeFilter)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        #Certificate { font-family: 'Rajdhani', sans-serif; }
        .cert-wrap { position: relative; overflow: hidden; max-width: 100vw; }
        .cert-wrap::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(${gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${gridLine} 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .cert-sub { color: ${subColor}; }
        .f-pill {
          padding: 7px 20px; border-radius: 99px; cursor: pointer;
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.15em; transition: all 0.22s ease;
          font-family: 'Rajdhani', sans-serif;
          border: 1px solid ${filterBdr}; background: transparent;
          color: ${D ? '#4b5563' : '#92700a'};
        }
        .f-pill:hover { border-color: rgba(212,175,55,0.42); color: #d4af37; background: rgba(212,175,55,0.07); }
        .f-pill.active {
          background: linear-gradient(135deg,rgba(212,175,55,0.2),rgba(212,175,55,0.07));
          border-color: rgba(212,175,55,0.52); color: #d4af37;
          box-shadow: 0 0 16px rgba(212,175,55,0.18), inset 0 0 8px rgba(212,175,55,0.06);
        }
        @media (max-width: 640px) {
          .f-pill {
            padding: 6px 12px;
            font-size: 0.58rem;
            letter-spacing: 0.08em;
          }
          .cert-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 20px !important;
          }
          .cert-stats {
            gap: 12px !important;
            padding: 14px 16px !important;
          }
          .cert-stats-divider {
            display: none !important;
          }
          .cert-lightbox {
            padding: 12px !important;
            align-items: center !important;
          }
          .cert-lightbox-panel {
            border-radius: 16px !important;
            max-height: calc(100vh - 24px) !important;
          }
          .cert-lightbox-image {
            height: clamp(190px, 56vw, 260px) !important;
          }
          .cert-lightbox-info {
            padding: 18px 16px 20px !important;
          }
          .cert-lightbox-title-row {
            gap: 10px !important;
          }
          .cert-lightbox-verify {
            width: 100% !important;
            justify-content: center !important;
            padding: 10px 14px !important;
            letter-spacing: 0.12em !important;
          }
        }
      `}</style>

      <section
        id="Certificate" name="Certificate"
        className="cert-wrap w-full py-20 md:py-28 px-5 md:px-16 transition-colors duration-400"
        style={{ background: bg }}
      >
        <div style={{ position:'absolute', top:'6%', left:'4%', width:400, height:400, background:'radial-gradient(circle,rgba(212,175,55,0.055) 0%,transparent 70%)', pointerEvents:'none', borderRadius:'50%', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'8%', right:'3%', width:320, height:320, background:'radial-gradient(circle,rgba(212,175,55,0.04) 0%,transparent 70%)', pointerEvents:'none', borderRadius:'50%', zIndex:0 }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading />

          {/* stats */}
          <motion.div
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5 }} viewport={{ once:true }}
            className="cert-stats"
            style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:20, padding:'16px 28px', borderRadius:16, border:`1px solid ${filterBdr}`, background:filterBg, backdropFilter:'blur(12px)', maxWidth:440, margin:'0 auto 44px' }}
          >
            {[
              { val:`${certificates.length}`,                                         lbl:'Total Certs' },
              { val:`${Array.from(new Set(certificates.map(c=>c.issuer))).length}`,   lbl:'Platforms'   },
              { val:`${Array.from(new Set(certificates.map(c=>c.category))).length}`, lbl:'Categories'  },
            ].map((s,i)=>(
              <React.Fragment key={s.lbl}>
                {i>0 && <div className="cert-stats-divider" style={{ width:1, background:D?'rgba(212,175,55,0.2)':'rgba(160,110,10,0.2)' }}/>}
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontSize:'1.65rem', fontWeight:900, lineHeight:1, background:'linear-gradient(135deg,#f5d060,#d4af37)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{s.val}</p>
                  <p style={{ fontSize:'0.59rem', textTransform:'uppercase', letterSpacing:'0.18em', color:D?'#6b7280':'#7a4d0a', marginTop:3, fontFamily:'Rajdhani, sans-serif' }}>{s.lbl}</p>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* filter pills */}
          <motion.div
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.45, delay:0.1 }} viewport={{ once:true }}
            style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8, marginBottom:40 }}
          >
            {categories.map(cat=>(
              <button key={cat} className={`f-pill ${activeFilter===cat?'active':''}`} onClick={()=>setActiveFilter(cat)}>
                {cat==='All'&&<span style={{ marginRight:5 }}>🏅</span>}{cat}
              </button>
            ))}
          </motion.div>

          {/* grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
              transition={{ duration:0.3 }}
              className="cert-grid"
              style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:26 }}
            >
              {filtered.map((cert,i)=>(
                <CertCard key={cert.id} cert={cert} index={i} isDark={D} onOpen={setSelected} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* footer */}
          <motion.p
            initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.3 }} viewport={{ once:true }}
            style={{ textAlign:'center', marginTop:56, fontSize:'0.78rem', letterSpacing:'0.14em', textTransform:'uppercase', color:D?'rgba(212,175,55,0.3)':'rgba(140,90,10,0.38)', fontFamily:'Rajdhani, sans-serif' }}
          >── More certificates coming soon ──</motion.p>
        </div>
      </section>

      <div style={{ height:0, background:`linear-gradient(90deg,transparent,${D?'rgba(212,175,55,0.3)':'rgba(160,110,10,0.3)'},transparent)` }} />

      <AnimatePresence>
        {selected && <Lightbox cert={selected} onClose={()=>setSelected(null)} isDark={D} />}
      </AnimatePresence>
    </>
  )
}

export default Certificate
