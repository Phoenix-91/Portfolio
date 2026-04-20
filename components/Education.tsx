'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import { EDUCATION } from '@/lib/constants'

function DynIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name]
  if (!Icon) return null
  return <Icon size={size} />
}

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.edu-title', {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.edu-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.from('.edu-card', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.edu-cards',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="education" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="edu-title mb-16">
          <p className="font-mono text-[#4f8ef7] text-sm tracking-widest uppercase mb-3">
            Academic Background
          </p>
          <h2 className="section-heading text-white">
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="edu-cards grid md:grid-cols-2 gap-6">
          {EDUCATION.map((edu) => (
            <motion.div
              key={edu.degree}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 40px rgba(79,142,247,0.15)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="edu-card glass-card rounded-2xl p-8 relative overflow-hidden group"
            >
              {/* Animated bottom border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] 
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              />

              {/* Status badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f8ef7]/15 to-[#7c3aed]/15 flex items-center justify-center text-[#4f8ef7]">
                  <DynIcon name={edu.icon} size={24} />
                </div>
                <span
                  className="font-mono text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background:
                      edu.status === 'Pursuing'
                        ? 'rgba(34,197,94,0.1)'
                        : 'rgba(79,142,247,0.1)',
                    border:
                      edu.status === 'Pursuing'
                        ? '1px solid rgba(34,197,94,0.3)'
                        : '1px solid rgba(79,142,247,0.2)',
                    color: edu.status === 'Pursuing' ? '#4ade80' : '#4f8ef7',
                  }}
                >
                  {edu.status}
                </span>
              </div>

              <h3 className="font-syne font-bold text-white text-xl mb-2 leading-snug">
                {edu.degree}
              </h3>
              <p className="font-grotesk text-[#4f8ef7] font-medium mb-3">{edu.school}</p>
              <p className="font-mono text-gray-500 text-sm">{edu.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
