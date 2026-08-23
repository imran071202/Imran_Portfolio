"use client"
import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"

const projects = [
  {
    id: 1,
    title: "Skill Bridge",
    subtitle: "Job Portal Web Application",
    desc: "Built a full-stack job portal where users can register, login, browse jobs, and apply to openings. Developed RESTful APIs in Express.js with MongoDB for job postings, applications, and user profiles.",
    tech: ["React.js", "Next.js", "Tailwind CSS", "Node.js", "Redux", "shadcn ui", "MongoDB", "Express.js"],
    img: "./photo/job.png",
    laptop: "./photo/laptop1.png",
    tag: "Full Stack",
    color: "#228b22",
  },
  {
    id: 2,
    title: "Home Roots",
    subtitle: "Real Estate Website",
    desc: "A fully responsive Real Estate platform where users can explore properties, connect with agents, and either buy or sell homes easily. Built to simulate a real-world platform and sharpen full-stack development skills.",
    tech: ["React.js", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    img: "./photo/homeroots.png",
    laptop: "./photo/laptop1.png",
    tag: "Full Stack",
    color: "#3b82f6",
  },
  {
    id: 3,
    title: "Netflix Clone",
    subtitle: "Streaming UI Replica",
    desc: "A pixel-perfect Netflix Clone focused on frontend design and layout skills. Replicates the clean and stylish interface of Netflix while demonstrating responsive web design and modern UI structure.",
    tech: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    img: "./photo/net.png",
    laptop: "./photo/laptop1.png",
    tag: "Frontend",
    color: "#e50914",
  },
  {
    id: 4,
    title: "MSI Website",
    subtitle: "Gaming Brand Homepage",
    desc: "A recreation of the MSI (Micro-Star International) homepage capturing the gaming aesthetic and layout style of a leading hardware company, using modern frontend tools and design principles.",
    tech: ["HTML", "CSS"],
    img: "./photo/Msi.png",
    laptop: "./photo/laptop1.png",
    tag: "UI Design",
    color: "#a855f7",
  },
  {
    id: 5,
    title: "Amazon Clone",
    subtitle: "E-Commerce Platform",
    desc: "A detailed replica of Amazon's layout and key components — one of the largest e-commerce platforms. Great exercise in building clean, scalable UIs and understanding product listing structure.",
    tech: ["HTML", "CSS"],
    img: "./photo/amazon.png",
    laptop: "./photo/laptop1.png",
    tag: "Frontend",
    color: "#06b6d4",
  },
]

/* ── Section Heading ─────────────────────────────────────────── */
const SectionHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center mb-16"
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
    }}>My Projects</h2>
    <div style={{ width: 70, height: 2, marginTop: 12, background: 'linear-gradient(90deg,transparent,#228b22,transparent)' }} />
    <div style={{ width: 30, height: 2, marginTop: 5,  background: 'linear-gradient(90deg,transparent,rgba(34,139,34,0.4),transparent)' }} />
  </motion.div>
)

/* ── Tech Badge ──────────────────────────────────────────────── */
const TechBadge = ({ label, isDark }) => (
  <span style={{
    display: 'inline-block',
    padding: '3px 11px',
    borderRadius: 7,
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    border: `1px solid ${isDark ? 'rgba(34,139,34,0.25)' : 'rgba(27,94,32,0.28)'}`,
    background: isDark ? 'rgba(34,139,34,0.08)' : 'rgba(27,94,32,0.08)',
    color: isDark ? 'rgba(34,139,34,0.8)' : '#1b5e20',
    fontFamily: 'Rajdhani, sans-serif',
  }}>{label}</span>
)

/* ── Project Card ────────────────────────────────────────────── */
const ProjectCard = ({ project, index, isDark }) => {
  const isEven = index % 2 === 0

  const bgCard  = isDark ? 'rgba(10,8,3,0.92)'         : 'rgba(232, 245, 233,0.97)'
  const border  = isDark ? 'rgba(34, 139, 34,0.14)'      : 'rgba(27, 94, 32,0.2)'
  const textH   = isDark ? '#f3f4f6'                   : '#1b5e20'
  const textB   = isDark ? '#c9cdd5'                   : '#1b5e20'
  const textM   = isDark ? '#8b929e'                   : '#1b5e20'

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      className="proj-card group"
      style={{
        borderRadius: 20,
        border: `1px solid ${border}`,
        background: bgCard,
        backdropFilter: 'blur(16px)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.4s ease',
      }}
    >
      {/* top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(34, 139, 34,0.5),transparent)',
        opacity: 0, transition: 'opacity 0.3s',
      }} className="card-shimmer" />

      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch`}>

        {/* ── IMAGE SIDE ── */}
        <div className="relative lg:w-[52%] overflow-hidden" style={{ minHeight: 300 }}>
          {/* number watermark */}
          <span style={{
            position: 'absolute', top: 12, left: isEven ? 'auto' : 12, right: isEven ? 12 : 'auto',
            fontFamily: 'Cinzel, serif', fontSize: '5rem', fontWeight: 900, lineHeight: 1,
            color: isDark ? 'rgba(34, 139, 34,0.07)' : 'rgba(27, 94, 32,0.06)',
            userSelect: 'none', zIndex: 0,
          }}>{String(index + 1).padStart(2, '0')}</span>

          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 h-full"
            style={{ padding: '24px 24px 0 24px' }}
          >
            {/* laptop frame */}
            <div className="relative mt-20 mb-1 md:mt-20 md:mb-17 ">
              {/* screen */}
              <div className=''
              style={{
                borderRadius: '5px 5px 0 0',
                overflow: 'hidden',
                border: `2px solid ${isDark ? 'rgba(34, 139, 34,0.3)' : 'rgba(27, 94, 32,0.3)'}`,
                borderBottom: 'none',
                margin: '10px 20px 0 20px',
                padding:'10px 10px 12px 10px',
                boxShadow: isDark
                  ? '0 0 30px rgba(34, 139, 34,0.12), 0 -4px 20px rgba(0,0,0,0.4)'
                  : '0 0 20px rgba(27, 94, 32,0.1), 0 -4px 16px rgba(0,0,0,0.1)',
              }}>
                <img 
                  src={project.img}
                  alt={project.title}
                  className="w-full object-cover object-top h-30 md:h-52 block"
                  // style={{ height: 130,  display: 'block' }}
                />
              </div>
              {/* laptop base */}
              <img src={project.laptop} alt="" className="w-full" style={{ display: 'block', marginTop: -2 }} />
            </div>
          </motion.div>
        </div>

        {/* ── CONTENT SIDE ── */}
        <div className="lg:w-[48%] flex flex-col justify-center px-7 py-8">

          {/* tag + index */}
          <div className="flex items-center gap-3 mb-4">
            <span style={{
              padding: '3px 12px', borderRadius: 99,
              fontSize: '0.62rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              background: `${project.color}18`,
              border: `1px solid ${project.color}45`,
              color: project.color,
              fontFamily: 'Rajdhani, sans-serif',
            }}>{project.tag}</span>
            <span style={{ fontSize: '0.6rem', color: textM, letterSpacing: '0.15em', fontFamily: 'Rajdhani, sans-serif' }}>
              Project {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* title */}
          <div className="mb-1">
            <h3 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
              fontWeight: 900, lineHeight: 1.2,
              background: 'linear-gradient(135deg,#81c784,#228b22,#1b5e20)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{project.title}</h3>
            <p style={{ color: textM, fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em', marginTop: 2 }}>
              — {project.subtitle}
            </p>
          </div>

          {/* divider */}
          <div style={{ height: 1, margin: '14px 0', background: `linear-gradient(90deg,${isDark ? 'rgba(34, 139, 34,0.2)' : 'rgba(27, 94, 32,0.18)'},transparent)` }} />

          {/* description */}
          <p style={{ color: textB, lineHeight: 1.85, fontSize: '0.9rem', marginBottom: 18 }}>
            {project.desc}
          </p>

          {/* tech */}
          <div>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: textM, marginBottom: 8, fontFamily: 'Rajdhani, sans-serif' }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => <TechBadge key={t} label={t} isDark={isDark} />)}
            </div>
          </div>
        </div>
      </div>

      {/* hover glow border overlay */}
      <style>{`
        .proj-card:hover {
          border-color: rgba(34, 139, 34,0.35) !important;
          box-shadow: 0 0 40px rgba(34, 139, 34,0.1), 0 12px 40px rgba(0,0,0,0.25);
          transform: translateY(-4px);
        }
        .proj-card:hover .card-shimmer { opacity: 1 !important; }
      `}</style>
    </motion.div>
  )
}

/* ── Main Component ──────────────────────────────────────────── */
const Project = () => {
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
  const bg       = D ? 'transparent'  : '#faf6e8'
  const gridLine = D ? 'rgba(34, 139, 34,0.035)' : 'rgba(27, 94, 32,0.06)'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        #Project { font-family: 'Rajdhani', sans-serif; }
        .proj-wrap { position: relative; }
      `}</style>

      <section
        id="Project"
        name="Project"
        className="proj-wrap w-full py-20 md:py-28 px-5 md:px-16 transition-colors duration-400"
        style={{ background: bg }}
      >
        {/* ambient glow orbs */}
        <div style={{ position:'absolute', top:'8%', left:'3%', width:450, height:450,
          background:'radial-gradient(circle,rgba(34, 139, 34,0.055) 0%,transparent 70%)',
          pointerEvents:'none', borderRadius:'50%', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'10%', right:'3%', width:350, height:350,
          background:'radial-gradient(circle,rgba(34, 139, 34,0.04) 0%,transparent 70%)',
          pointerEvents:'none', borderRadius:'50%', zIndex:0 }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading />

          {/* project count badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mb-10"
          >
            <span style={{
              padding: '6px 20px', borderRadius: 99,
              fontSize: '0.65rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              border: '1px solid rgba(34, 139, 34,0.25)',
              background: 'rgba(34, 139, 34,0.06)',
              color: D ? 'rgba(34, 139, 34,0.7)' : '#1b5e20',
              fontFamily: 'Rajdhani, sans-serif',
            }}>
              {projects.length} Featured Projects
            </span>
          </motion.div>

          {/* cards */}
          <div className="flex flex-col gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} isDark={D} />
            ))}
          </div>

          {/* footer note */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-14"
            style={{
              fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: D ? 'rgba(34, 139, 34,0.35)' : 'rgba(27, 94, 32,0.4)',
              fontFamily: 'Rajdhani, sans-serif',
            }}
          >
            ── More projects coming soon ──
          </motion.p>
        </div>
      </section>

      <div style={{ height: 0, background: `linear-gradient(90deg,transparent,${D?'rgba(34, 139, 34,0.3)':'rgba(27, 94, 32,0.3)'},transparent)` }} />
    </>
  )
}

export default Project