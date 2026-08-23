"use client"
import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"

const skills = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "Python", icon: "🐍" },
  { name: "Tailwind CSS", icon: "💨" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Express.js", icon: "📝" },
  { name: "Firebase", icon: "🔥" },
  { name: "GitHub", icon: "🐙" },
  { name: "Responsive Design", icon: "📱" },
]

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institute: "JIS College of Engineering",
    period: "2021 – 2024",
    location: "Kalyani, Nadia, WB",
    passing: "2024",
    icon: "🎓",
    tag: "University",
  },
  {
    degree: "WBCHSE (12th)",
    institute: "Kabi Bijoylal HS Institute",
    period: "2019 – 2021",
    location: "Krishnanagar, Nadia, WB",
    passing: "2021",
    icon: "📚",
    tag: "Higher Secondary",
  },
  {
    degree: "WBBSE (10th)",
    institute: "Don Bosco High School",
    period: "2009 – 2019",
    location: "Krishnanagar, Nadia, WB",
    passing: "2019",
    icon: "🏫",
    tag: "Secondary",
  },
]

/* ── Section heading ─────────────────────────────────────────── */
const SectionHeading = ({ title }) => (
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
      background: 'linear-gradient(135deg, #74c69d 0%, #228b22 40%, #d8f3dc 60%, #1b5e20 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: 'drop-shadow(0 0 12px rgba(34,139,34,0.45))',
      letterSpacing: '0.08em',
      textAlign: 'center',
    }}>{title}</h2>
    <div style={{
      width: 70, height: 2, marginTop: 12,
      background: 'linear-gradient(90deg, transparent, #228b22, transparent)',
    }} />
    <div style={{
      width: 30, height: 2, marginTop: 5,
      background: 'linear-gradient(90deg, transparent, rgba(34, 139, 34,0.4), transparent)',
    }} />
  </motion.div>
)

/* ── Main ────────────────────────────────────────────────────── */
const About = () => {
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

  // ── theme tokens ──────────────────────────────────────────────
  const bg = D ? 'transparent' : '#faf6e8'
  //   const bgCard    = D ? 'rgba(12,10,4,0.9)'                   : 'rgba(232, 245, 233,0.95)'
  const bgCard = D ? 'rgba(30,30,30,0.95)' : 'rgba(245,245,245,0.95)'

  //   const bgCardHov = D ? 'rgba(20,16,5,0.95)'                  : 'rgba(232, 245, 233,1)'
  const bgCardHov = D ? 'rgba(45,45,45,1)' : 'rgba(230,230,230,1)'
  const borderCol = D ? 'rgba(34, 139, 34,0.15)' : 'rgba(27, 94, 32,0.22)'
  const borderHov = D ? 'rgba(34, 139, 34,0.5)' : 'rgba(27, 94, 32,0.55)'
  const textH = D ? '#f3f4f6' : '#1b5e20'   // headings
  const textB = D ? '#d1d5db' : '#1b5e20'   // body
  const textM = D ? '#9ca3af' : '#1b5e20'   // muted
  const gridLine = D ? 'rgba(34,139,34,0.035)' : 'rgba(27,94,32,0.06)'
  const tagBg = D ? 'rgba(34,139,34,0.08)' : 'rgba(27,94,32,0.1)'
  const tagColor = D ? 'rgba(34,139,34,0.75)' : '#1b5e20'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');

        #About { font-family: 'Rajdhani', sans-serif; }

        /* grid bg */
        .ab-wrap { position: relative; }

        /* ── education card ── */
        .edu-card {
          position: relative; overflow: hidden;
          border-radius: 16px;
          border: 1px solid ${borderCol};
          background: ${bgCard};
          backdrop-filter: blur(14px);
          padding: 0;
          transition: all 0.35s ease;
        }
        .edu-card:hover {
          border-color: ${borderHov};
          background: ${bgCardHov};
          box-shadow: 0 0 35px rgba(34, 139, 34,0.14), 0 8px 32px rgba(0,0,0,0.25);
          transform: translateY(-4px);
        }
        /* shimmer left bar */
        .edu-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
          background: linear-gradient(180deg, #81c784, #228b22, #1b5e20);
          border-radius: 16px 0 0 16px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .edu-card:hover::before { opacity: 1; }
        /* top shimmer line */
        .edu-card::after {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(34, 139, 34,0.5), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .edu-card:hover::after { opacity: 1; }

        /* ── skill pill ── */
        .sk-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 15px; border-radius: 9px;
          font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em;
          border: 1px solid ${borderCol};
          background: ${bgCard};
          color: ${D ? '#9ca3af' : '#1b5e20'};
          transition: all 0.25s ease;
          cursor: default;
        }
        .sk-pill:hover {
          border-color: #228b22;
          color: #228b22;
          background: rgba(34,139,34,0.1);
          box-shadow: 0 0 14px rgba(34,139,34,0.22);
          transform: translateY(-3px) scale(1.05);
        }

        /* ── bio card ── */
        .bio-card {
          border-radius: 18px;
          border: 1px solid ${borderCol};
          background: ${bgCard};
          backdrop-filter: blur(16px);
          padding: 36px 40px;
          position: relative; overflow: hidden;
          transition: border-color 0.4s, background 0.4s;
        }
        .bio-card::before {
          content: ''; position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(34, 139, 34,0.65),transparent);
        }
        .bio-card::after {
          content: ''; position: absolute; bottom: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(34, 139, 34,0.3),transparent);
        }

        /* ── cat cards ── */
        .cat-card {
          border-radius: 14px; padding: 22px 18px; text-align: center;
          border: 1px solid ${borderCol};
          background: ${bgCard};
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .cat-card:hover {
          border-color: ${borderHov};
          box-shadow: 0 0 22px rgba(34, 139, 34,0.13);
          transform: translateY(-4px);
        }

        /* number gradient */
        .gold-num {
          background: linear-gradient(135deg,#81c784,#228b22);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
      `}</style>

      <section
        id="About"
        name="About"
        className="ab-wrap w-full py-20 md:py-28 px-5 md:px-20 transition-colors duration-400"
        style={{ background: bg }}
      >
        {/* ambient glow orbs */}
        <div style={{
          position: 'absolute', top: '5%', right: '3%', width: 500, height: 500,
          background: 'radial-gradient(circle,rgba(34, 139, 34,0.055) 0%,transparent 70%)',
          pointerEvents: 'none', borderRadius: '50%', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', left: '2%', width: 350, height: 350,
          background: 'radial-gradient(circle,rgba(34, 139, 34,0.04) 0%,transparent 70%)',
          pointerEvents: 'none', borderRadius: '50%', zIndex: 0
        }} />

        <div className="max-w-5xl mx-auto flex flex-col gap-24 relative z-10">

          {/* ══════════ ABOUT ME ══════════ */}
          <div>
            <SectionHeading title="About Me" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bio-card"
            >
              {/* big quote */}
              <span style={{
                fontSize: '6rem', lineHeight: 1,
                color: D ? 'rgba(34, 139, 34,0.1)' : 'rgba(27, 94, 32,0.1)',
                fontFamily: 'Georgia,serif',
                position: 'absolute', top: 8, left: 18,
                userSelect: 'none', pointerEvents: 'none',
              }}>"</span>

              {/* name tag */}
              <div className="flex items-center gap-3 mb-6 pl-2">
                <div style={{ width: 4, height: 42, background: 'linear-gradient(180deg,#81c784,#1b5e20)', borderRadius: 4 }} />
                <div>
                  <p style={{
                    fontFamily: 'Rajdhani,sans-serif', fontSize: '0.7rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.25em', color: tagColor
                  }}>
                    Full Stack Developer
                  </p>
                  <p style={{
                    fontFamily: 'Cinzel,serif', fontSize: '1.3rem', fontWeight: 900,
                    background: 'linear-gradient(135deg,#81c784,#228b22,#1b5e20)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>Imran Shaikh</p>
                </div>
              </div>

              <p style={{ color: textB, lineHeight: 1.9, fontSize: '1rem', paddingLeft: 6, marginBottom: 12 }}>
                I'm a{' '}
                <span style={{ color: '#228b22', fontWeight: 700 }}>BCA graduate from the class of 2024</span>
                {' '}with a strong passion for web development and technology.
                I enjoy creating responsive, user-friendly websites and applications that deliver great digital experiences.
                Throughout my academic journey, I've worked on multiple projects that helped me strengthen my skills in
                {' '}<span style={{ color: '#228b22', fontWeight: 600 }}>HTML, CSS, JavaScript, React.js, Express JS, Tailwind CSS, PHP, PostgreSQL, MySQL, VB.Net</span> and{' '}
                <span style={{ color: '#228b22', fontWeight: 600 }}>Next.js</span>.
              </p>
              <p style={{ color: textM, lineHeight: 1.9, fontSize: '0.95rem', paddingLeft: 6 }}>
                Thanks for visiting my portfolio — let's connect and create something awesome together. 🚀
              </p>

              {/* stats */}
              <div className="flex flex-wrap gap-8 mt-8 pl-2 pt-6"
                style={{ borderTop: `1px solid ${borderCol}` }}>
                {[
                  { val: '1+', lbl: 'Years Experience' },
                  { val: '10+', lbl: 'Projects Built' },
                  { val: '2024', lbl: 'BCA Graduate' },
                  { val: '10+', lbl: 'Technologies' },

                ].map((s, i) => (
                  <motion.div key={s.lbl}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.09 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                  >
                    <span className="gold-num" style={{ fontSize: '1.7rem', fontWeight: 900 }}>{s.val}</span>
                    <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: textM }}>{s.lbl}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ══════════ EDUCATION ══════════ */}
          <div>
            <SectionHeading title="Education" />

            {/* Timeline wrapper */}
            <div className="relative flex flex-col gap-6">
              {/* vertical line */}
              <div style={{
                position: 'absolute', left: 26, top: 52, bottom: 52, width: 1,
                background: 'linear-gradient(180deg, rgba(34, 139, 34,0.6), rgba(34, 139, 34,0.1))',
                display: 'none',
              }} />

              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="edu-card"
                >
                  <div className="flex items-stretch">
                    {/* left accent number column */}
                    <div className="flex flex-col items-center justify-center px-5 py-5"
                      style={{
                        borderRight: `1px solid ${borderCol}`,
                        minWidth: 68,
                        background: D
                          ? 'linear-gradient(180deg,rgba(34, 139, 34,0.07),rgba(34, 139, 34,0.02))'
                          : 'linear-gradient(180deg,rgba(27, 94, 32,0.08),rgba(27, 94, 32,0.03))',
                      }}>
                      <span style={{ fontSize: '1.8rem' }}>{edu.icon}</span>
                      <span style={{
                        fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.1em', color: tagColor, marginTop: 6, textAlign: 'center',
                        fontFamily: 'Rajdhani,sans-serif',
                      }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>

                    {/* content */}
                    <div className="flex-1 px-6 py-5">
                      {/* tag + passing badge row */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span style={{
                          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.15em', padding: '3px 10px', borderRadius: 99,
                          background: tagBg, color: tagColor,
                          border: `1px solid ${borderCol}`,
                          fontFamily: 'Rajdhani,sans-serif',
                        }}>{edu.tag}</span>
                        <span style={{
                          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.12em', padding: '3px 10px', borderRadius: 99,
                          background: 'rgba(34,197,94,0.1)', color: '#22c55e',
                          border: '1px solid rgba(34,197,94,0.2)',
                          fontFamily: 'Rajdhani,sans-serif',
                        }}>✓ Passed {edu.passing}</span>
                      </div>

                      {/* degree */}
                      <p style={{
                        fontFamily: 'Cinzel,serif',
                        fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
                        fontWeight: 900, lineHeight: 1.35,
                        background: 'linear-gradient(135deg,#81c784,#228b22,#1b5e20)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        marginBottom: 4,
                      }}>{edu.degree}</p>

                      {/* institute */}
                      <p style={{ color: textH, fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
                        {edu.institute}
                      </p>

                      {/* meta row */}
                      <div className="flex flex-wrap gap-x-5 gap-y-1">
                        <span style={{ color: textM, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ color: '#228b22', fontSize: '0.75rem' }}>📅</span> {edu.period}
                        </span>
                        <span style={{ color: textM, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ color: '#228b22', fontSize: '0.75rem' }}>📍</span> {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ══════════ SKILLS ══════════ */}
          <div>
            <SectionHeading title="My Skills" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {skills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  className="sk-pill"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  viewport={{ once: true }}
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>

            {/* category cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {[
                { cat: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'], icon: '🖥️' },
                { cat: 'Backend', items: ['Node.js', 'PHP', 'Python', 'REST APIs', 'Express.js'], icon: '⚙️' },
                { cat: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB','Firebase'], icon: '💽' },
                 { cat: 'Version Control ', items: ['Git', 'GitHub'], icon: '🤖' },
                { cat: 'Code Editors', items: ['Visual Studio Code', 'IntelliJ IDEA', 'PyCharm', 'Antigravity'], icon: '🖱️' },
                 { cat: 'Tools', items: ['Figma', 'DevTools', 'Postman','Jenkins','DataGrip','GitHub Copilot'], icon: '🛠️' },
              ].map((c, i) => (
                <motion.div
                  key={c.cat}
                  className="cat-card"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>{c.icon}</div>
                  <p style={{
                    fontFamily: 'Rajdhani,sans-serif', fontWeight: 900,
                    fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em',
                    background: 'linear-gradient(135deg,#81c784,#228b22)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    marginBottom: 10,
                  }}>{c.cat}</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {c.items.map(item => (
                      <span key={item} style={{
                        fontSize: '0.7rem', fontWeight: 600, padding: '3px 9px', borderRadius: 6,
                        background: D ? 'rgba(34, 139, 34,0.08)' : 'rgba(27, 94, 32,0.08)',
                        border: `1px solid ${borderCol}`,
                        color: textM,
                      }}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      <div style={{ height: 0, background: `linear-gradient(90deg,transparent,${D ? 'rgba(34, 139, 34,0.3)' : 'rgba(27, 94, 32,0.3)'},transparent)` }} />
    </>
  )
}

export default About