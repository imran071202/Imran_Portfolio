"use client"
import React, { useState, useEffect } from 'react'
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub, FaFacebookSquare, FaInternetExplorer, FaStickyNote } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { BiSolidSun } from "react-icons/bi";
import { FaRegMoon } from "react-icons/fa";
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from "motion/react"
import { FiHome, FiUser, FiBriefcase, FiFileText, FiMail } from "react-icons/fi"

/* ════════════ DATA — unchanged ════════════ */
const navItems = [
  { id: 1, text: "Home",    icon: <FiHome />,      to: "Body"    },
  { id: 2, text: "About",   icon: <FiUser />,      to: "About"   },
  { id: 3, text: "Experience", icon: <FaInternetExplorer />, to: "Experience" },
  { id: 4, text: "Project", icon: <FiBriefcase />, to: "Project" },
  { id: 5, text: "Certificates",  icon: <FaStickyNote />,  to: "Certificate"  },
  { id: 6, text: "Contact", icon: <FiMail />,      to: "Contact" },
]

const socials = [
  { href: "https://github.com/imran071202",                       icon: <FaGithub />,         colorDark: "#e2e8f0", colorLight: "#1f2937", label: "GitHub"      },
  { href: "https://www.linkedin.com/in/imran-shaikh-163372241/", icon: <BsLinkedin />,       colorDark: "#38bdf8", colorLight: "#0284c7", label: "LinkedIn"    },
  { href: "https://x.com/Imran___02",                            icon: <FaXTwitter />,       colorDark: "#e2e8f0", colorLight: "#1f2937", label: "X / Twitter" },
  { href: "https://www.facebook.com/imran.shaikh.562433",        icon: <FaFacebookSquare />, colorDark: "#3b82f6", colorLight: "#1d4ed8", label: "Facebook"    },
  // { href: "mailto:imran@example.com",                            icon: <FaEnvelope />,       colorDark: "#d4af37", colorLight: "#92650a", label: "Email"       },
]

/* ════════════ SUB-COMPONENTS ════════════ */

/* ── animated gold divider ── */
const GDiv = () => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    style={{
      width: 38, height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
    }}
  />
)

/* ── breathing gold orb ── */
const PulseOrb = () => (
  <div className="relative flex items-center justify-center" style={{ width: 22, height: 22 }}>
    {/* outer ring 1 */}
    <motion.div
      animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
      style={{
        position: 'absolute', width: 18, height: 18, borderRadius: '50%',
        background: 'rgba(212,175,55,0.22)',
      }}
    />
    {/* outer ring 2 */}
    <motion.div
      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ repeat: Infinity, duration: 2.8, delay: 0.4, ease: 'easeInOut' }}
      style={{
        position: 'absolute', width: 12, height: 12, borderRadius: '50%',
        background: 'rgba(212,175,55,0.3)',
      }}
    />
    {/* core */}
    <div style={{
      width: 7, height: 7, borderRadius: '50%', position: 'relative', zIndex: 1,
      background: 'radial-gradient(circle, #fffacd 0%, #d4af37 60%)',
      boxShadow: '0 0 10px rgba(212,175,55,0.95), 0 0 20px rgba(212,175,55,0.4)',
    }} />
  </div>
)

/* ── theme toggle with morphing icon ── */
const ThemeBtn = ({ isDark, onToggle }) => (
  <motion.button
    onClick={onToggle}
    whileHover="hov"
    whileTap={{ scale: 0.85 }}
    style={{
      width: 42, height: 42, borderRadius: 14, cursor: 'pointer',
      border: '1px solid rgba(212,175,55,0.35)',
      background: isDark
        ? 'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03))'
        : 'linear-gradient(135deg,rgba(180,140,20,0.12),rgba(180,140,20,0.06))',
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    aria-label="Toggle theme"
  >
    {/* hover glow bg */}
    <motion.span
      style={{ position: 'absolute', inset: 0, borderRadius: 14, pointerEvents: 'none' }}
      variants={{ hov: { background: 'rgba(212,175,55,0.18)', boxShadow: '0 0 20px rgba(212,175,55,0.4)' } }}
      transition={{ duration: 0.2 }}
    />
    {/* inner ring decoration */}
    <motion.span
      style={{
        position: 'absolute', inset: 3, borderRadius: 10, pointerEvents: 'none',
        border: '1px solid rgba(212,175,55,0.12)',
      }}
    />
    <AnimatePresence mode="wait">
      {isDark
        ? <motion.span key="sun"
            initial={{ rotate: -120, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 120, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.28, ease: 'backOut' }}
            style={{ position: 'relative', zIndex: 1, fontSize: '1.15rem', color: '#f5d060',
              filter: 'drop-shadow(0 0 6px rgba(245,208,96,0.8))' }}>
            <BiSolidSun />
          </motion.span>
        : <motion.span key="moon"
            initial={{ rotate: 120, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -120, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.28, ease: 'backOut' }}
            style={{ position: 'relative', zIndex: 1, fontSize: '0.95rem', color: '#92650a',
              filter: 'drop-shadow(0 0 4px rgba(146,101,10,0.6))' }}>
            <FaRegMoon />
          </motion.span>
      }
    </AnimatePresence>
  </motion.button>
)

/* ── LEFT sidebar: Social Button ── */
const SocialBtn = ({ href, icon, colorDark, colorLight, label, delay = 0, isDark }) => (
  <motion.a
    href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.45, ease: 'backOut' }}
    whileHover="hov"
    style={{
      position: 'relative', width: 40, height: 40, borderRadius: 12, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: isDark ? '1px solid rgba(212,175,55,0.15)' : '1px solid rgba(180,140,20,0.22)',
      background: isDark
        ? 'linear-gradient(135deg,rgba(212,175,55,0.05),rgba(212,175,55,0.02))'
        : 'linear-gradient(135deg,rgba(180,140,20,0.08),rgba(180,140,20,0.04))',
      color: isDark ? colorDark : colorLight,
      overflow: 'hidden',
    }}
  >
    {/* shimmer sweep on hover */}
    <motion.span
      style={{ position: 'absolute', inset: 0, borderRadius: 12, pointerEvents: 'none' }}
      variants={{ hov: { background: 'rgba(212,175,55,0.14)', boxShadow: '0 0 18px rgba(212,175,55,0.32)' } }}
      transition={{ duration: 0.2 }}
    />
    {/* inner border ring */}
    <motion.span
      style={{ position: 'absolute', inset: 2, borderRadius: 10, pointerEvents: 'none',
        border: '1px solid rgba(212,175,55,0.08)' }}
      variants={{ hov: { borderColor: 'rgba(212,175,55,0.25)' } }}
      transition={{ duration: 0.2 }}
    />
    <span style={{ position: 'relative', zIndex: 1, fontSize: '0.95rem', lineHeight: 1 }}>{icon}</span>

    {/* tooltip RIGHT */}
    <motion.span
      initial={{ opacity: 0, x: -8, scale: 0.92 }}
      variants={{ hov: { opacity: 1, x: 0, scale: 1 } }}
      transition={{ duration: 0.16 }}
      style={{
        position: 'absolute', left: 'calc(100% + 12px)',
        padding: '4px 10px', borderRadius: 8,
        fontSize: '0.68rem', fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'none',
        background: isDark ? 'rgba(4,3,1,0.96)' : 'rgba(255,251,235,0.97)',
        border: '1px solid rgba(212,175,55,0.38)',
        color: '#c9950a',
        backdropFilter: 'blur(12px)',
        fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em',
        textTransform: 'uppercase',
        zIndex: 60,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      {label}
    </motion.span>
  </motion.a>
)

/* ── RIGHT sidebar: Nav Icon Pill ── */
const pillVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.08, y: -2 },
  active: { scale: 1.06, y: -1 },
}
const underlineVariants = {
  rest: { width: 0, opacity: 0 },
  hover: { width: 26, opacity: 1 },
  active: { width: 26, opacity: 1 },
}
const NavPill = ({ item, active, index, isDark, onActivate }) => (
  <Link to={item.to} smooth duration={500} offset={-20} spy onSetActive={() => onActivate(item.text)}>
    <motion.div
      variants={pillVariants}
      initial="rest"
      whileHover="hover"
      animate={active ? 'active' : 'rest'}
      onClick={() => onActivate(item.text)}
      transition={{ delay: 0.18 + index * 0.07, duration: 0.45, ease: 'backOut' }}
      style={{ position: 'relative', width: 44, height: 44,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
    >
      {/* background spacer, no visible hover fill */}
      <motion.span
        style={{ position: 'absolute', inset: 0, borderRadius: 13, overflow: 'hidden' }}
        animate={{
          background: 'transparent',
          border: '1px solid transparent',
          boxShadow: 'none',
        }}
      />

      {/* hover / active underline */}
      <motion.span
        variants={underlineVariants}
        animate={active ? 'active' : 'rest'}
        style={{
          position: 'absolute', left: '50%', bottom: 8, transform: 'translateX(-50%)',
          height: 2, borderRadius: 99,
          background: '#d4af37',
          boxShadow: '0 0 12px rgba(212,175,55,0.5)',
          transformOrigin: 'center',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, duration: 0.18 }}
      />

      {/* active left accent bar with layoutId for smooth movement */}

      {/* icon */}
      <motion.span
        style={{ position: 'relative', zIndex: 1, fontSize: '1.15rem', lineHeight: 1 }}
        animate={{
          color: active ? '#d4af37' : isDark ? '#3f4652' : '#9a7d3a',
          rotate: active ? [0, 4, 0] : 0,
        }}
        variants={{ hov: { color: '#d4af37', filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.6))' } }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >{item.icon}</motion.span>

      {/* tooltip LEFT */}
      <motion.span
        initial={{ opacity: 0, x: 8, scale: 0.92 }}
        variants={{ hov: { opacity: 1, x: 0, scale: 1 } }}
        transition={{ duration: 0.16 }}
        style={{
          position: 'absolute', right: 'calc(100% + 12px)',
          padding: '4px 12px', borderRadius: 8,
          fontSize: '0.68rem', fontWeight: 800, whiteSpace: 'nowrap', pointerEvents: 'none',
          background: isDark ? 'rgba(4,3,1,0.96)' : 'rgba(255,251,235,0.97)',
          border: '1px solid rgba(212,175,55,0.38)',
          color: '#c9950a',
          backdropFilter: 'blur(12px)',
          fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.14em',
          textTransform: 'uppercase',
          zIndex: 60,
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        }}
      >{item.text}</motion.span>
    </motion.div>
  </Link>
)

/* ════════════ MAIN NAVBAR ════════════ */
const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState("Home")
  const [isDark, setIsDark] = useState(true)

  /* ── body scroll lock — logic unchanged ── */
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [menu])

  /* ── data-theme broadcast — logic unchanged ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const D = isDark

  /* sidebar bg tokens */
  const sbBg    = D
    ? 'linear-gradient(180deg,rgba(5,4,2,0.97) 0%,rgba(9,7,2,0.98) 100%)'
    : 'linear-gradient(180deg,rgba(255,253,242,0.98) 0%,rgba(250,246,224,0.99) 100%)'
  const sbBdrL  = D ? 'rgba(212,175,55,0.12)' : 'rgba(180,140,20,0.2)'
  const sbBdrR  = D ? 'rgba(212,175,55,0.12)' : 'rgba(180,140,20,0.2)'
  const sbShdL  = D ? '3px 0 30px rgba(0,0,0,0.6), 1px 0 0 rgba(212,175,55,0.06)' : '3px 0 24px rgba(180,140,20,0.1)'
  const sbShdR  = D ? '-3px 0 30px rgba(0,0,0,0.6), -1px 0 0 rgba(212,175,55,0.06)' : '-3px 0 24px rgba(180,140,20,0.1)'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');

        /* ── shared sidebar base ── */
        .nb {
          position: fixed; top: 0; bottom: 0; width: 66px; z-index: 50;
          display: flex; flex-direction: column;
          align-items: center; justify-content: space-between;
          padding: 26px 12px;
          backdrop-filter: blur(28px) saturate(1.4);
          -webkit-backdrop-filter: blur(28px) saturate(1.4);
        }

        /* top gold cap line */
        .nb::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, #d4af37 35%, #fffacd 50%, #d4af37 65%, transparent 100%);
          filter: drop-shadow(0 0 4px rgba(212,175,55,0.7));
        }
        /* bottom gold cap line */
        .nb::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.5) 50%, transparent 90%);
        }

        .nb-l { left: 0; }
        .nb-r { right: 0; }

        /* ── logo ── */
        .nb-logo {
          font-family: 'Cinzel', serif; font-weight: 900; font-size: 0.78rem;
          background: linear-gradient(180deg, #fffacd 0%, #f5d060 20%, #d4af37 50%, #fffacd 70%, #b8860b 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 8px rgba(212,175,55,0.6));
          writing-mode: vertical-rl; transform: rotate(180deg);
          letter-spacing: 0.16em; text-decoration: none;
          transition: filter 0.35s;
        }
        .nb-logo:hover {
          filter: drop-shadow(0 0 18px rgba(212,175,55,1)) drop-shadow(0 0 4px rgba(255,250,200,0.8));
        }

        .nb-sub {
          font-family: 'Rajdhani', sans-serif; font-size: 0.43rem;
          text-transform: uppercase; letter-spacing: 0.3em;
          writing-mode: vertical-rl; transform: rotate(180deg);
        }
        .nb-sub-d { color: rgba(212,175,55,0.3); }
        .nb-sub-l { color: rgba(130,90,8,0.55); }

        /* ── mobile top bar ── */
        .nb-top {
          position: fixed; top: 0; left: 0; right: 0; height: 62px; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 18px;
          backdrop-filter: blur(24px) saturate(1.4);
        }
        /* full-width top cap */
        .nb-top::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, #fffacd, #d4af37, transparent);
          filter: drop-shadow(0 0 4px rgba(212,175,55,0.7));
        }
        /* center bottom accent */
        .nb-top::after {
          content: '';
          position: absolute; bottom: 0; left: 12%; right: 12%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent);
        }
        .nb-top-d { background: rgba(4,3,1,0.97); border-bottom: 1px solid rgba(212,175,55,0.1); }
        .nb-top-l { background: rgba(255,253,242,0.98); border-bottom: 1px solid rgba(180,140,20,0.18); }

        .nb-mLogo {
          font-family: 'Cinzel', serif; font-size: 1.05rem; font-weight: 900;
          background: linear-gradient(135deg, #fffacd 0%, #f5d060 25%, #d4af37 55%, #b8860b 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 7px rgba(212,175,55,0.55));
          text-decoration: none;
        }
        .nb-ham {
          width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          border: 1px solid rgba(212,175,55,0.32);
          cursor: pointer; font-size: 1.2rem;
          transition: all 0.25s; position: relative; overflow: hidden;
        }
        .nb-ham::before {
          content: ''; position: absolute; inset: 0; border-radius: 12px;
          border: 1px solid rgba(212,175,55,0.1);
        }
        .nb-ham-d { color: #d4af37; background: linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03)); }
        .nb-ham-l { color: #92650a; background: linear-gradient(135deg,rgba(180,140,20,0.1),rgba(180,140,20,0.04)); }
        .nb-ham:hover {
          border-color: rgba(212,175,55,0.6);
          box-shadow: 0 0 18px rgba(212,175,55,0.32), inset 0 0 10px rgba(212,175,55,0.08);
        }
        .nb-ham::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: radial-gradient(circle at center, rgba(255,255,255,0.14), transparent 35%);
          opacity: 0.16;
          pointer-events: none;
        }
        .nb-ham::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: radial-gradient(circle at center, rgba(212,175,55,0.14), transparent 48%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .nb-ham-on::after {
          opacity: 1;
          animation: nbHamPulse 1.6s ease-in-out infinite;
        }
        .nb-ham .nb-ham-ring {
          position: absolute;
          inset: 4px;
          border-radius: 10px;
          border: 1px solid rgba(212,175,55,0.14);
          opacity: 0.65;
          pointer-events: none;
        }
        .nb-ham-on .nb-ham-ring {
          opacity: 1;
          box-shadow: 0 0 14px rgba(212,175,55,0.45);
          transform: scale(1.05);
        }
        @keyframes nbHamPulse {
          0%, 100% { transform: scale(1); opacity: 0.88; }
          50% { transform: scale(1.08); opacity: 0.52; }
        }

        /* ── mobile overlay ── */
        .nb-overlay {
          position: fixed; inset: 0; top: 62px; z-index: 49;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          overflow: hidden;
          backdrop-filter: blur(18px);
          border-top: 1px solid rgba(212,175,55,0.08);
        }
        .nb-overlay::before {
          content: ''; position: absolute; top: -90px; left: -88px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 62%);
          filter: blur(2px);
          pointer-events: none;
        }
        .nb-overlay::after {
          content: ''; position: absolute; bottom: -90px; right: -88px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%);
          filter: blur(2px);
          pointer-events: none;
        }
        .nb-ol-d {
          background: radial-gradient(circle at 20% 20%, rgba(212,175,55,0.08), transparent 28%),
                      radial-gradient(circle at 80% 80%, rgba(212,175,55,0.05), transparent 30%),
                      rgba(3,2,1,0.98);
        }
        .nb-ol-l {
          background: radial-gradient(circle at 20% 20%, rgba(180,140,20,0.08), transparent 28%),
                      radial-gradient(circle at 80% 80%, rgba(180,140,20,0.05), transparent 30%),
                      rgba(255,253,242,0.99);
        }

        .nb-ol-d::before { background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%) !important; }

        .nb-mi {
          display: flex; align-items: center; gap: 18px;
          padding: 18px 22px; width: 300px;
          border-bottom: 1px solid rgba(212,175,55,0.08);
          border-radius: 18px;
          margin-bottom: 12px;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          font-family: 'Rajdhani', sans-serif; font-size: 1.05rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          cursor: pointer; transition: all 0.26s ease;
          position: relative;
        }
        .nb-mi-d { color: #b8b8b8; }
        .nb-mi-l { color: #8c6c1a; }
        .nb-mi .ic { font-size: 1.15rem; transition: all 0.2s; flex-shrink: 0; }
        .nb-mi-d .ic { color: rgba(212,175,55,0.35); }
        .nb-mi-l .ic { color: rgba(140,100,10,0.45); }
        .nb-mi:hover, .nb-mi.on { color: #d4af37; transform: translateX(6px); background: rgba(212,175,55,0.08); border-color: rgba(212,175,55,0.12); }
        .nb-mi:hover .ic, .nb-mi.on .ic {
          color: #d4af37;
          filter: drop-shadow(0 0 6px rgba(212,175,55,0.7));
        }
        .nb-mi.on {
          box-shadow: inset 0 0 24px rgba(212,175,55,0.08);
        }
        .nb-mi.on::before {
          content: '';
          position: absolute; left: 0; top: 10%; bottom: 10%;
          width: 4px;
          border-radius: 999px;
          background: linear-gradient(180deg, #fffacd, #d4af37, #b8860b);
          box-shadow: 0 0 12px rgba(212,175,55,0.45);
        }

        /* ── breakpoint visibility — logic unchanged ── */
        .nb-mi {
          display: flex; align-items: center; gap: 18px;
          padding: 16px 0; width: 280px;
          border-bottom: 1px solid rgba(212,175,55,0.07);
          font-family: 'Rajdhani', sans-serif; font-size: 1.05rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          cursor: pointer; transition: all 0.22s ease; position: relative;
        }
        .nb-mi-d { color: #3f4652; }
        .nb-mi-l { color: #92700a; }
        .nb-mi .ic { font-size: 1.15rem; transition: all 0.2s; flex-shrink: 0; }
        .nb-mi-d .ic { color: rgba(212,175,55,0.3); }
        .nb-mi-l .ic { color: rgba(140,100,10,0.4); }
        .nb-mi:hover, .nb-mi.on { color: #d4af37; padding-left: 16px; }
        .nb-mi:hover .ic, .nb-mi.on .ic {
          color: #d4af37;
          filter: drop-shadow(0 0 4px rgba(212,175,55,0.6));
        }
        /* active left accent */
        .nb-mi.on::before {
          content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 3px; height: 55%;
          background: linear-gradient(180deg, #fffacd, #d4af37, #b8860b);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(212,175,55,0.7);
        }

        /* ── breakpoint visibility — logic unchanged ── */
        @media (max-width: 767px)  { .nb { display: none !important; } }
        @media (min-width: 768px)  { .nb-top, .nb-overlay { display: none !important; } }
      `}</style>

      {/* ══════════════════════════════════════════
          LEFT SIDEBAR — Logo + Socials (desktop)
      ══════════════════════════════════════════ */}
      <motion.aside
        className="nb nb-l"
        initial={{ x: -66, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: sbBg,
          borderRight: `1px solid ${sbBdrL}`,
          boxShadow: sbShdL,
        }}
      >
        {/* Logo block */}
        <div className="flex flex-col items-center gap-2">
          <motion.a href="/" className="nb-logo"
            whileHover={{ scale: 1.07 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
            Imran
          </motion.a>
          <span className={`nb-sub ${D ? 'nb-sub-d' : 'nb-sub-l'}`}>Full Stack</span>
        </div>

        <GDiv />

        {/* Socials — desktop only, hidden on mobile via .nb CSS */}
        <div className="flex flex-col items-center gap-2.5">
          <p className={`nb-sub ${D ? 'nb-sub-d' : 'nb-sub-l'} mb-0.5`} style={{ fontSize: '0.4rem' }}>Find Me</p>
          {socials.map((s, i) => (
            <SocialBtn key={s.label} {...s} delay={0.3 + i * 0.07} isDark={D} />
          ))}
        </div>

        <GDiv />

        <span className={`nb-sub ${D ? 'nb-sub-d' : 'nb-sub-l'}`}>2024</span>
      </motion.aside>

      {/* ══════════════════════════════════════════
          RIGHT SIDEBAR — Theme toggle + Nav icons
      ══════════════════════════════════════════ */}
      <motion.aside
        className="nb nb-r"
        initial={{ x: 66, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: sbBg,
          borderLeft: `1px solid ${sbBdrR}`,
          boxShadow: sbShdR,
        }}
      >
        {/* Theme toggle */}
        {/* <ThemeBtn isDark={D} onToggle={() => setIsDark(p => !p)} /> */}

        <GDiv />

        {/* Nav pills centered */}
        <div className="flex flex-col items-center gap- flex-1 justify-center">
          {navItems.map((item, i) => (
            <NavPill
              key={item.id}
              item={item}
              active={active === item.text}
              index={i}
              isDark={D}
              onActivate={setActive}
            />
          ))}
        </div>

        <GDiv />

        <PulseOrb />
      </motion.aside>

      {/* ══════════════════════════════════════════
          MOBILE TOP BAR
      ══════════════════════════════════════════ */}
      <motion.header
        className={`nb-top ${D ? 'nb-top-d' : 'nb-top-l'}`}
        initial={{ y: -62, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="/" className="nb-mLogo">&lt;Imran /&gt;</a>

        <div className="flex items-center gap-2.5  mr-0 md:mr-0">
          {/* <ThemeBtn isDark={D} onToggle={() => setIsDark(p => !p)} /> */}

          <div style={{ width: 1, height: 24,
            background: D ? 'rgba(212,175,55,0.22)' : 'rgba(180,140,20,0.25)' }} />

          <motion.button
            className={`nb-ham ${D ? 'nb-ham-d' : 'nb-ham-l'} ${menu ? 'nb-ham-on' : ''}`}
            onClick={() => setMenu(!menu)}
            aria-label="menu"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            animate={{ rotate: menu ? 4 : 0, scale: menu ? 1.02 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <span className="nb-ham-ring" aria-hidden="true" />
            <AnimatePresence mode="wait">
              {menu
                ? <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <IoClose />
                  </motion.span>
                : <motion.span key="h"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <TiThMenu />
                  </motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          MOBILE MENU — nav links only, NO socials
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className={`nb-overlay ${D ? 'nb-ol-d' : 'nb-ol-l'}`}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* section label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: 'Rajdhani, sans-serif', fontSize: '0.52rem',
                color: D ? 'rgba(212,175,55,0.3)' : 'rgba(140,100,10,0.5)',
                letterSpacing: '0.38em', textTransform: 'uppercase', marginBottom: 20,
              }}
            >── Navigation ──</motion.p>

            {navItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.17 + i * 0.065, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={item.to} smooth duration={500} offset={-20}
                  onClick={() => { setMenu(false); setActive(item.text) }}>
                  <div className={`nb-mi ${D ? 'nb-mi-d' : 'nb-mi-l'} ${active === item.text ? 'on' : ''}`}>
                    <span className="ic">{item.icon}</span>
                    {item.text}
                    {active === item.text && (
                      <motion.span
                        layoutId="mActive"
                        className="ml-auto"
                        style={{
                          fontSize: '0.55rem', color: '#d4af37',
                          filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.7))',
                        }}
                      >◆</motion.span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* NO SOCIALS on mobile — as requested */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar