'use client'
import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { SKILLS_FLAT } from '@/lib/constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function SkillIcon({ slug, name, color }: { slug: string; name: string; color: string }) {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{ background: color }}
    >
      <Image
        src={`https://cdn.simpleicons.org/${slug}/ffffff`}
        alt={name}
        width={28}
        height={28}
        className="w-7 h-7 object-contain"
        unoptimized
        onError={(e) => {
          // Fallback to first letter if icon missing
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.skills-heading', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-heading',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    })

    // Stagger each skill card with scale from 0.9 (SKILL.md §13 revealOnScroll)
    gsap.from('.skill-grid-card', {
      y: 30,
      opacity: 0,
      scale: 0.92,
      duration: 0.5,
      stagger: {
        amount: 0.8,
        from: 'start',
      },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skill-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading — matches screenshot style */}
        <div className="skills-heading mb-10">
          <h2 className="font-syne font-extrabold text-white mb-2"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Tools &amp; Technologies
          </h2>
          <p className="font-grotesk text-gray-400 text-sm">My Professional Skills</p>
        </div>

        {/* 4-column grid of skill cards */}
        <div className="skill-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SKILLS_FLAT.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{
                scale: 1.03,
                borderColor: 'rgba(79,142,247,0.5)',
                boxShadow: '0 0 20px rgba(79,142,247,0.12)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="skill-grid-card flex items-center gap-4 rounded-xl px-4 py-4 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Colored icon box */}
              <SkillIcon slug={skill.slug} name={skill.name} color={skill.color} />

              {/* Name + type */}
              <div className="min-w-0">
                <p className="font-grotesk font-semibold text-white text-sm leading-tight truncate">
                  {skill.name}
                </p>
                <p className="font-grotesk text-gray-500 text-xs mt-0.5 truncate">
                  {skill.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
