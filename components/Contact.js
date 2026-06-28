"use client"
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { motion } from "motion/react"
import { BsLinkedin } from "react-icons/bs";
import { FaGithub, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const contactInfo = [
  { icon: <FaEnvelope />, label: "Email", value: "imran071202@gmail.com", color: "#d4af37" },
  { icon: <FaPhoneAlt />, label: "Phone", value: "+91 7427928647", color: "#22c55e" },
  { icon: <FaMapMarkerAlt />, label: "Location", value: "West Bengal, India", color: "#f87171" },
]

const socials = [
  { href: "https://github.com/imran071202", icon: <FaGithub />, color: "#e2e8f0", colorL: "#1f2937", label: "GitHub" },
  { href: "https://www.linkedin.com/in/imran-shaikh-163372241/", icon: <BsLinkedin />, color: "#38bdf8", colorL: "#0284c7", label: "LinkedIn" },
  { href: "https://x.com/Imran___02", icon: <FaXTwitter />, color: "#e2e8f0", colorL: "#1f2937", label: "X" },
  { href: "https://www.facebook.com/imran.shaikh.562433", icon: <FaFacebookSquare />, color: "#3b82f6", colorL: "#1d4ed8", label: "Facebook" },
]

const Contact = () => {
  const [result, setResult] = useState("")
  const [isDark, setIsDark] = useState(true)
  const [focused, setFocused] = useState(null)

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

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = {
      name: event.target.name.value,
      phone: event.target.Number.value,
      email: event.target["Mail id"].value,
      message: event.target.message.value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Your Message Submitted Successfully");
        event.target.reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }

    setResult("");
  };

  const D = isDark
  const bg = D ? '#050503' : '#faf6e8'
  const bgCard = D ? 'rgba(10,8,3,0.92)' : 'rgba(255,253,242,0.97)'
  const borderC = D ? 'rgba(212,175,55,0.15)' : 'rgba(160,110,10,0.2)'
  const textH = D ? '#f3f4f6' : '#180e03'
  const textB = D ? '#c9cdd5' : '#2d1a04'
  const textM = D ? '#7a8090' : '#7a4d0a'
  const inputBg = D ? 'rgba(15,12,4,0.8)' : 'rgba(255,251,232,0.9)'
  const inputBdr = D ? 'rgba(212,175,55,0.18)' : 'rgba(160,110,10,0.22)'
  const gridLine = D ? 'rgba(212,175,55,0.035)' : 'rgba(160,120,10,0.06)'
  const labelC = D ? 'rgba(212,175,55,0.75)' : '#7a4008'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');

        #Contact { font-family: 'Rajdhani', sans-serif; }

        .ct-wrap { position: relative; }
        .ct-wrap::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(${gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${gridLine} 1px, transparent 1px);
          background-size: 56px 56px;
        }

        /* input / textarea */
        .ct-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 11px;
          border: 1px solid ${inputBdr};
          background: ${inputBg};
          color: ${textH};
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          outline: none;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }
        .ct-input::placeholder { color: ${D ? 'rgba(156,163,175,0.45)' : 'rgba(120,80,20,0.4)'}; }
        .ct-input:focus {
          border-color: rgba(212,175,55,0.6);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.1), 0 0 18px rgba(212,175,55,0.12);
          background: ${D ? 'rgba(20,16,5,0.95)' : 'rgba(255,253,244,1)'};
        }

        /* label */
        .ct-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: ${labelC};
          margin-bottom: 7px;
          font-family: 'Rajdhani', sans-serif;
        }

        /* submit btn */
        .ct-btn {
          width: 100%;
          padding: 14px 24px;
          border-radius: 12px;
          border: none;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          cursor: pointer;
          background: linear-gradient(135deg, #f5d060, #d4af37, #b8860b);
          color: #0a0800;
          box-shadow: 0 0 20px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .ct-btn::before {
          content: '';
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transition: left 0.5s ease;
        }
        .ct-btn:hover {
          box-shadow: 0 0 35px rgba(212,175,55,0.6), 0 4px 20px rgba(0,0,0,0.3);
          transform: translateY(-2px) scale(1.01);
        }
        .ct-btn:hover::before { left: 100%; }
        .ct-btn:active { transform: translateY(0) scale(0.99); }

        /* info card */
        .info-card {
          border-radius: 14px;
          padding: 18px 20px;
          border: 1px solid ${borderC};
          background: ${bgCard};
          backdrop-filter: blur(12px);
          display: flex; align-items: center; gap: 14px;
          transition: all 0.3s ease;
        }
        .info-card:hover {
          border-color: rgba(212,175,55,0.4);
          box-shadow: 0 0 20px rgba(212,175,55,0.1);
          transform: translateX(4px);
        }

        /* social btn */
        .ct-social {
          width: 46px; height: 46px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          border: 1px solid ${borderC};
          background: ${D ? 'rgba(212,175,55,0.05)' : 'rgba(180,130,10,0.06)'};
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .ct-social:hover {
          border-color: rgba(212,175,55,0.5);
          background: rgba(212,175,55,0.12);
          box-shadow: 0 0 14px rgba(212,175,55,0.25);
          transform: translateY(-4px) scale(1.08);
        }
      `}</style>

      <section
        id="Contact"
        name="Contact"
        className="ct-wrap w-full py-20 md:py-28 px-5 md:px-16 transition-colors duration-400"
        style={{ background: bg }}
      >
        {/* ambient orbs */}
        <div style={{
          position: 'absolute', top: '5%', right: '5%', width: 400, height: 400,
          background: 'radial-gradient(circle,rgba(212,175,55,0.06) 0%,transparent 70%)',
          pointerEvents: 'none', borderRadius: '50%', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '3%', width: 320, height: 320,
          background: 'radial-gradient(circle,rgba(212,175,55,0.04) 0%,transparent 70%)',
          pointerEvents: 'none', borderRadius: '50%', zIndex: 0
        }} />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* heading */}
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
              background: 'linear-gradient(135deg,#f5d060 0%,#d4af37 40%,#fffacd 60%,#b8860b 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.45))',
              letterSpacing: '0.08em', textAlign: 'center',
            }}>Get In Touch</h2>
            <div style={{ width: 70, height: 2, marginTop: 12, background: 'linear-gradient(90deg,transparent,#d4af37,transparent)' }} />
            <div style={{ width: 30, height: 2, marginTop: 5, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)' }} />
            <p style={{ color: textM, fontSize: '0.9rem', marginTop: 14, letterSpacing: '0.06em', textAlign: 'center' }}>
              Have a project in mind? Let's create something awesome together.
            </p>
          </motion.div>

          {/* two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT — info + socials ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {/* intro card */}
              <div style={{
                borderRadius: 18, padding: '28px 30px',
                border: `1px solid ${borderC}`,
                background: bgCard,
                backdropFilter: 'blur(14px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
                  background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.5),transparent)',
                }} />
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: 4, height: 40, background: 'linear-gradient(180deg,#f5d060,#b8860b)', borderRadius: 4 }} />
                  <div>
                    <p style={{
                      fontFamily: 'Rajdhani,sans-serif', fontSize: '0.65rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.22em',
                      color: D ? 'rgba(212,175,55,0.6)' : '#9a6010'
                    }}>Let's Connect</p>
                    <p style={{
                      fontFamily: 'Cinzel,serif', fontSize: '1.2rem', fontWeight: 900,
                      background: 'linear-gradient(135deg,#f5d060,#d4af37,#b8860b)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                    }}>
                      Imran Shaikh
                    </p>
                  </div>
                </div>
                <p style={{ color: textB, lineHeight: 1.85, fontSize: '0.9rem' }}>
                  I'm a <span style={{ color: '#d4af37', fontWeight: 700 }}>Full Stack Developer</span> open to freelance projects, collaborations, and full-time opportunities. Feel free to reach out!
                </p>
              </div>

              {/* contact info items */}
              <div className="flex flex-col gap-3">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    className="info-card"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem',
                      background: `${info.color}15`,
                      border: `1px solid ${info.color}30`,
                      color: info.color,
                    }}>{info.icon}</div>
                    <div>
                      <p style={{
                        fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em',
                        color: textM, fontFamily: 'Rajdhani,sans-serif', fontWeight: 700
                      }}>{info.label}</p>
                      <p style={{ color: textH, fontWeight: 600, fontSize: '0.92rem' }}>{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* socials */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
              >
                <p style={{
                  fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.22em',
                  color: textM, fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, marginBottom: 10
                }}>
                  Find Me On
                </p>
                <div className="flex gap-3 flex-wrap">
                  {socials.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="ct-social" style={{ color: D ? s.color : s.colorL }} aria-label={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT — form ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{
                borderRadius: 20,
                border: `1px solid ${borderC}`,
                background: bgCard,
                backdropFilter: 'blur(16px)',
                padding: '36px 32px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* top shimmer */}
              <div style={{
                position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)',
              }} />
              {/* bottom shimmer */}
              <div style={{
                position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)',
              }} />

              <p style={{
                fontFamily: 'Cinzel,serif', fontWeight: 900, fontSize: '1.1rem', marginBottom: 22,
                background: 'linear-gradient(135deg,#f5d060,#d4af37)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>
                Send a Message
              </p>

              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                {/* name */}
                <div>
                  <label className="ct-label">Your Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    className="ct-input"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* phone */}
                <div>
                  <label className="ct-label">Phone Number</label>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    className="ct-input"
                    type="text"
                    name="Number"
                    placeholder="Enter your phone number"
                    required
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* email */}
                <div>
                  <label className="ct-label">Email Address</label>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    className="ct-input"
                    type="email"
                    name="Mail id"
                    placeholder="Enter your email"
                    required
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* message */}
                <div>
                  <label className="ct-label">Your Message</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.005 }}
                    className="ct-input"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    required
                    onFocus={() => setFocused('msg')}
                    onBlur={() => setFocused(null)}
                    style={{ resize: 'vertical', minHeight: 110 }}
                  />
                </div>

                {/* submit */}
                <motion.button
                  type="submit"
                  className="ct-btn"
                  whileTap={{ scale: 0.98 }}
                >
                  {result === "Sending..." ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        style={{
                          display: 'inline-block', width: 14, height: 14, borderRadius: '50%',
                          border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#0a0800'
                        }}
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message ✦"
                  )}
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <div style={{ height: 0, background: `linear-gradient(90deg,transparent,${D ? 'rgba(212,175,55,0.3)' : 'rgba(160,110,10,0.3)'},transparent)` }} />
    </>
  )
}

export default Contact