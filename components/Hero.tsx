'use client'
import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(useGSAP)

// Lazy load Three.js character — no SSR
const Character3D = dynamic(() => import('@/components/Character3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 500 }}>
      <div className="w-24 h-24 rounded-full border-2 border-[#4f8ef7]/30 border-t-[#4f8ef7] animate-spin" />
    </div>
  ),
})

// Floating particle canvas (left column background)
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string
    }> = []
    const colors = ['#4f8ef7', '#7c3aed', '#22d3ee']

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * 3)],
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Set initial states (SKILL.md §14 — avoid invisible before animation)
    gsap.set(['.hero-badge', '.hero-name', '.hero-role', '.hero-sub', '.hero-btns', '.hero-scroll'], {
      opacity: 0,
      y: 40,
    })
    gsap.set('.hero-3d', { opacity: 0, scale: 0.92 })

    const tl = gsap.timeline({ delay: 0.3 })

    tl.to('.hero-badge',  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('.hero-name',   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.hero-role',   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.hero-sub',    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to('.hero-btns',   { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .to('.hero-3d',     { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' }, '-=0.8')
      .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2')
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Particle canvas background */}
      <ParticleCanvas />

      {/* Radial mask overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 30% 50%, transparent 0%, #26282e 80%)',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-6 min-h-[80vh]">

          {/* ── LEFT: Info column ── */}
          <div className="flex-1 min-w-0 overflow-hidden flex flex-col justify-center" style={{ maxWidth: '50%' }}>

            {/* Availability badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card mb-8 w-fit">
              <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              <span className="font-mono text-xs text-green-400 tracking-widest uppercase">
                Available for Opportunities
              </span>
            </div>

            {/* Name */}
            <h1 className="hero-name font-syne font-extrabold leading-none mb-5 whitespace-nowrap"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.6rem)' }}>
              <span className="gradient-text">Paramveer</span>
            </h1>

            {/* Role */}
            <div className="hero-role font-mono text-[#4f8ef7] mb-6 tracking-wider"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}>
              {'< Full Stack Developer (MERN) />'}
            </div>

            {/* Subtext */}
            <p className="hero-sub font-grotesk text-gray-400 max-w-lg mb-10 leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)' }}>
              I build scalable web apps, AI&#8209;powered tools,{' '}
              and real&#8209;world solutions.
            </p>

            {/* CTA buttons */}
            <div className="hero-btns flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(79,142,247,0.45)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-8 py-3.5 rounded-full font-grotesk font-semibold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}
              >
                View My Work
              </motion.a>

              <motion.a
                href="#contact"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05, borderColor: '#4f8ef7', color: '#4f8ef7' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-8 py-3.5 rounded-full font-grotesk font-semibold text-gray-300 text-sm border border-white/20 transition-colors"
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll flex items-center gap-3 mt-14">
              <div className="scroll-indicator-line">
                <ArrowDown size={14} className="text-[#4f8ef7]" />
              </div>
              <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                Scroll to explore
              </span>
            </div>
          </div>

          {/* ── RIGHT: 3D character column ── */}
          <div className="hero-3d flex-1 flex items-center justify-center lg:max-w-[45%] w-full"
            style={{ minHeight: '520px' }}>
            {/* Outer glow ring */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(79,142,247,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)',
                }}
              />

              {/* 3D canvas */}
              <div className="w-full" style={{ height: '560px', maxWidth: '500px' }}>
                <Character3D />
              </div>

              {/* Floating badge — Frontend: React + Next.js */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 right-0 glass-card rounded-xl px-4 py-2.5 hidden md:flex items-center gap-2.5"
                style={{ border: '1px solid rgba(79,142,247,0.3)' }}
              >
                <div className="flex items-center gap-1.5">
                  <Image
                    src="https://cdn.simpleicons.org/react/61dafb"
                    alt="React"
                    width={18} height={18}
                    className="w-4 h-4"
                    unoptimized
                  />
                  <Image
                    src="https://cdn.simpleicons.org/nextdotjs/ffffff"
                    alt="Next.js"
                    width={18} height={18}
                    className="w-4 h-4"
                    unoptimized
                  />
                </div>
                <span className="font-mono text-xs text-[#4f8ef7]">React · Next.js</span>
              </motion.div>

              {/* Floating badge — Backend: Node.js + MongoDB */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-16 left-0 glass-card rounded-xl px-4 py-2.5 hidden md:flex items-center gap-2.5"
                style={{ border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <div className="flex items-center gap-1.5">
                  <Image
                    src="https://cdn.simpleicons.org/nodedotjs/339933"
                    alt="Node.js"
                    width={18} height={18}
                    className="w-4 h-4"
                    unoptimized
                  />
                  <Image
                    src="https://cdn.simpleicons.org/mongodb/47a248"
                    alt="MongoDB"
                    width={18} height={18}
                    className="w-4 h-4"
                    unoptimized
                  />
                </div>
                <span className="font-mono text-xs text-[#7c3aed]">Node.js · MongoDB</span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
