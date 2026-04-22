'use client'
import { useRef } from 'react'
import * as LucideIcons from 'lucide-react'
import { MapPin, GraduationCap, BookOpen } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { STATS, EDUCATION } from '@/lib/constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Resolve icon name string → Lucide component
function DynIcon({ name, size = 22, className = '' }: { name: string; size?: number; className?: string }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name]
  if (!Icon) return null
  return <Icon size={size} className={className} />
}

const EDU_ICONS: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={24} />,
  BookOpen:      <BookOpen size={24} />,
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.about-title', {
      x: -60, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-title', start: 'top 80%', toggleActions: 'play none none reverse' },
    })
    gsap.from('.about-bio', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.about-bio', start: 'top 82%', toggleActions: 'play none none reverse' },
    })
    gsap.from('.edu-card', {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.edu-cards', start: 'top 78%', toggleActions: 'play none none reverse' },
    })
    gsap.from('.stat-card', {
      scale: 0.85, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.stat-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="about" className="py-28 px-6 max-w-7xl mx-auto">
      <div className="about-title mb-16">
        <p className="font-mono text-[#4f8ef7] text-sm tracking-widest uppercase mb-3">About me</p>
        <h2 className="section-heading text-white">
          Who I <span className="gradient-text">Am</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: bio + stats */}
        <div>
          <div className="about-bio space-y-5">
            <p className="about-bio font-grotesk text-gray-300 leading-relaxed text-lg">
              I&apos;m Paramveer, a{' '}
              <span className="text-[#4f8ef7] font-medium">BCA student at Chandigarh University</span>{' '}
              (2023–2026), with a background in science (Non-Medical). I specialize in full-stack
              development using the MERN stack and enjoy building interactive and AI-powered applications.
            </p>
            <p className="about-bio font-grotesk text-gray-400 leading-relaxed">
              When I&apos;m not coding, I&apos;m exploring new technologies, contributing to open-source, and
              sharpening my problem-solving skills. I believe in writing clean, scalable code that
              delivers real-world value.
            </p>
          </div>

          {/* Stats grid */}
          <div className="stat-grid grid grid-cols-2 gap-4 mt-10">
            {STATS.map(stat => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(79,142,247,0.2)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="stat-card glass-card rounded-2xl p-5"
              >
                <div className="mb-2 text-[#4f8ef7]">
                  <DynIcon name={stat.icon} size={22} />
                </div>
                <div className="font-syne font-bold text-2xl gradient-text mb-1">{stat.value}</div>
                <div className="font-grotesk text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Education cards */}
        <div className="edu-cards space-y-5">
          <p className="font-mono text-[#4f8ef7] text-sm tracking-widest uppercase mb-6">
            Academic Background
          </p>

          {EDUCATION.map((edu) => (
            <motion.div
              key={edu.degree}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(79,142,247,0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="edu-card glass-card rounded-2xl p-7 relative overflow-hidden group"
            >
              {/* Animated bottom border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed]
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              />

              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f8ef7]/15 to-[#7c3aed]/15 flex items-center justify-center text-[#4f8ef7]">
                  {EDU_ICONS[edu.icon] ?? <GraduationCap size={24} />}
                </div>
                <span
                  className="font-mono text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: edu.status === 'Pursuing' ? 'rgba(34,197,94,0.1)' : 'rgba(79,142,247,0.1)',
                    border:     edu.status === 'Pursuing' ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(79,142,247,0.2)',
                    color:      edu.status === 'Pursuing' ? '#4ade80' : '#4f8ef7',
                  }}
                >
                  {edu.status}
                </span>
              </div>

              <h3 className="font-syne font-bold text-white text-lg mb-2 leading-snug">{edu.degree}</h3>
              <p className="font-grotesk text-[#4f8ef7] font-medium mb-2">{edu.school}</p>
              <p className="font-mono text-gray-500 text-sm">{edu.year}</p>
            </motion.div>
          ))}

          {/* Location badge */}
          <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f8ef7]/20 to-[#7c3aed]/20 flex items-center justify-center text-[#4f8ef7]">
              <MapPin size={18} />
            </div>
            <div>
              <div className="font-grotesk text-white text-sm font-medium">Chandigarh, India</div>
              <div className="font-mono text-xs text-[#4f8ef7] mt-0.5">UTC+5:30</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
