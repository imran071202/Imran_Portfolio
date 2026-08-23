"use client"
import React, { useState, useEffect } from 'react'
import { FaCopyright } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-scroll';
import { motion } from "motion/react"

const navLinks = [
  { label: "Home", to: "Body" },
  { label: "About", to: "About" },
  { label: "Experience", to: "Experience" },
  { label: "Project", to: "Project" },
  { label: "Certificates", to: "Certificate" },
  { label: "Contact", to: "Contact" },
]



const socials = [
  { href: "https://www.linkedin.com/in/imran-shaikh-163372241/", icon: <FaLinkedin />, colorD: "#38bdf8", colorL: "#0284c7", label: "LinkedIn" },
  { href: "https://github.com/imran071202", icon: <FaGithub />, colorD: "#e2e8f0", colorL: "#1f2937", label: "GitHub" },
  { href: "https://x.com/Imran___02", icon: <FaXTwitter />, colorD: "#e2e8f0", colorL: "#1f2937", label: "X" },
  { href: "#1", icon: <FaInstagram />, colorD: "#f472b6", colorL: "#db2777", label: "Instagram" },
  { href: "https://www.facebook.com/imran.shaikh.562433", icon: <FaFacebookSquare />, colorD: "#3b82f6", colorL: "#1d4ed8", label: "Facebook" },
]

const Footer = () => {
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
  const bg = D ? 'transparent' : '#faf6e8'
  const bgDeep = D ? '#020201' : '#f5f0dc'
  const bgCopy = D ? '#000000' : '#efe8cc'
  const borderC = D ? 'rgba(34, 139, 34,0.12)' : 'rgba(27, 94, 32,0.18)'
  const textH = D ? '#f3f4f6' : '#1b5e20'
  const textM = D ? '#6b7280' : '#1b5e20'
  const textSub = D ? 'rgba(34,139,34,0.35)' : 'rgba(27,94,32,0.45)'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');

        .ft-root { font-family: 'Rajdhani', sans-serif; }

        .ft-logo {
          font-family: 'Cinzel', serif; font-size: 1.35rem; font-weight: 900;
          background: linear-gradient(135deg, #81c784, #228b22, #e8f5e9, #1b5e20);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 8px rgba(34,139,34,0.5));
          text-decoration: none; transition: filter 0.3s;
        }
        .ft-logo:hover { filter: drop-shadow(0 0 16px rgba(34,139,34,0.85)); }

        .ft-nav-link {
          font-size: 0.82rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em;
          color: ${textM};
          cursor: pointer; text-decoration: none;
          transition: color 0.2s, letter-spacing 0.2s;
          position: relative;
        }
        .ft-nav-link::after {
          content: ''; position: absolute; bottom: -3px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, #81c784, #1b5e20);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .ft-nav-link:hover { color: #228b22; letter-spacing: 0.2em; }
        .ft-nav-link:hover::after { transform: scaleX(1); }

        .ft-social {
          width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 11px;
          border: 1px solid ${borderC};
          background: ${D ? 'rgba(34, 139, 34,0.05)' : 'rgba(27, 94, 32,0.06)'};
          font-size: 1.05rem;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .ft-social:hover {
          border-color: rgba(34, 139, 34,0.5);
          background: rgba(34, 139, 34,0.13);
          box-shadow: 0 0 14px rgba(34, 139, 34,0.28);
          transform: translateY(-4px) scale(1.1);
        }

        .back-top {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 28px; border-radius: 99px;
          font-size: 0.7rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.2em;
          cursor: pointer; text-decoration: none;
          border: 1px solid rgba(34,139,34,0.3);
          background: ${D ? 'rgba(34,139,34,0.06)' : 'rgba(27,94,32,0.07)'};
          color: ${D ? 'rgba(34,139,34,0.7)' : '#1b5e20'};
          transition: all 0.3s ease;
          font-family: 'Rajdhani', sans-serif;
        }
        .back-top:hover {
          border-color: #228b22;
          background: rgba(34,139,34,0.13);
          box-shadow: 0 0 18px rgba(34,139,34,0.25);
          color: #228b22;
          transform: translateY(-2px);
        }
      `}</style>

      <footer className="ft-root" style={{ background: bg }}>

        {/* ── top divider ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${D ? 'rgba(34, 139, 34,0.35)' : 'rgba(27, 94, 32,0.3)'},transparent)` }} />

        {/* ── back to top ── */}
        <div style={{
          background: D ? 'rgba(5,5,3,0.96)' : 'rgba(250,245,225,0.98)',
          borderBottom: `1px solid ${borderC}`,
          padding: '14px 20px',
          display: 'flex', justifyContent: 'center',
        }}>
          <Link to="Body" smooth duration={600}>
            <motion.div
              className="back-top"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                style={{ fontSize: '0.75rem' }}
              >▲</motion.span>
              Back to Top
            </motion.div>
          </Link>
        </div>

        {/* ── main footer body ── */}
        <div style={{
          background: bgDeep,
          padding: '52px 32px 40px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(${D ? 'rgba(34, 139, 34,0.03)' : 'rgba(27, 94, 32,0.05)'} 1px,transparent 1px),linear-gradient(90deg,${D ? 'rgba(34, 139, 34,0.03)' : 'rgba(27, 94, 32,0.05)'} 1px,transparent 1px)`,
            backgroundSize: '56px 56px',
          }} />
          {/* ambient glow */}
          <div style={{
            position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)',
            width: 600, height: 200,
            background: 'radial-gradient(ellipse,rgba(34, 139, 34,0.07) 0%,transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

              {/* ── col 1 — brand ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-start gap-3"
              >
                <a href="/" className="ft-logo">&lt;Imran Shaikh/&gt;</a>
                <p style={{
                  fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.22em', color: textSub
                }}>Full Stack Developer</p>

                <div style={{
                  width: 48, height: 1, margin: '4px 0',
                  background: 'linear-gradient(90deg,#228b22,transparent)'
                }} />

                <p style={{
                  color: textM, fontSize: '0.84rem', lineHeight: 1.8,
                  textAlign: 'center', maxWidth: 240
                }}
                  className="md:text-left">
                  Crafting responsive, high-performance web experiences with modern technologies.
                </p>

                {/* location */}
                <div className="flex items-center gap-2 mt-1">
                  <FaLocationDot style={{ color: '#ef4444', fontSize: '0.85rem', flexShrink: 0 }} />
                  <span style={{ color: textM, fontSize: '0.8rem' }}>Krishnanagar, Nadia, West Bengal. India</span>
                </div>
              </motion.div>

              {/* ── col 2 — navigation ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-start"
              >
                <p style={{
                  fontFamily: 'Cinzel,serif', fontSize: '0.78rem', fontWeight: 900,
                  letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18,
                  background: 'linear-gradient(135deg,#81c784,#228b22)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>
                  Navigation
                </p>
                <div style={{
                  width: 36, height: 1, marginBottom: 16,
                  background: 'linear-gradient(90deg,#228b22,transparent)'
                }} />

                <ul className="flex flex-col gap-3 items-center md:items-start">
                  {navLinks.map(link => (
                    <li key={link.label}>
                      <Link to={link.to} smooth duration={500} offset={-20}>
                        <span className="ft-nav-link flex items-center gap-2">
                          <span style={{ color: 'rgba(34,139,34,0.4)', fontSize: '0.6rem' }}>◆</span>
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ── col 3 — social ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-start"
              >
                <p style={{
                  fontFamily: 'Cinzel,serif', fontSize: '0.78rem', fontWeight: 900,
                  letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18,
                  background: 'linear-gradient(135deg,#81c784,#228b22)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>
                  Find Me On
                </p>
                <div style={{
                  width: 36, height: 1, marginBottom: 16,
                  background: 'linear-gradient(90deg,#228b22,transparent)'
                }} />

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="ft-social"
                      style={{ color: D ? s.colorD : s.colorL }}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.06 }}
                      viewport={{ once: true }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>

                {/* available badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
                  style={{
                    border: `1px solid rgba(34,197,94,0.3)`,
                    background: 'rgba(34,197,94,0.07)',
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: '#22c55e', boxShadow: '0 0 6px #22c55e',
                      display: 'inline-block', flexShrink: 0
                    }}
                  />
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.15em', color: '#22c55e'
                  }}>
                    Available for Work
                  </span>
                </motion.div>
              </motion.div>

            </div>

            {/* ── divider ── */}
            <div style={{
              height: 1, margin: '36px 0',
              background: `linear-gradient(90deg,transparent,${D ? 'rgba(34, 139, 34,0.25)' : 'rgba(27, 94, 32,0.22)'},transparent)`
            }} />

            {/* ── bottom row ── */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2" style={{ color: textM, fontSize: '0.78rem' }}>
                <FaCopyright style={{ fontSize: '0.75rem', color: D ? 'rgba(34,139,34,0.5)' : 'rgba(27,94,32,0.5)' }} />
                <span>Copyright 2025 ·</span>
                {/* <motion.span
                  animate={{ scale:[1,1.25,1] }}
                  transition={{ repeat:Infinity, duration:1.5, ease:'easeInOut' }}
                  style={{ color:'#ef4444' }}
                >♥</motion.span> */}
                {/* <span style={{
                  fontFamily:'Cinzel,serif', fontWeight:700,
                  background:'linear-gradient(135deg,#81c784,#228b22)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                }}>Imran Shaikh</span> */}
              </div>


              <div style={{
                fontSize: '0.68rem', color: textSub, letterSpacing: '0.12em',
                textTransform: 'uppercase', fontFamily: 'Rajdhani,sans-serif', fontWeight: 700
              }}>
                <span style={{
                  fontFamily: 'Cinzel,serif', fontWeight: 700,
                  background: 'linear-gradient(135deg,#81c784,#228b22)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Imran Shaikh</span>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer