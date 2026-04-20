'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCE } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.exp-title', {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.exp-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Timeline line draws from top (SKILL.md §11 SVG & Canvas)
    gsap.to('.timeline-line', {
      scaleY: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    })

    // Card slides in from left
    gsap.from('.exp-card', {
      x: -60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.exp-card',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Dot pop
    gsap.from('.timeline-dot', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '.timeline-dot',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="experience" className="py-28 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="exp-title mb-16">
          <p className="font-mono text-[#4f8ef7] text-sm tracking-widest uppercase mb-3">
            Work History
          </p>
          <h2 className="section-heading text-white">
            <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="timeline-container relative pl-10 md:pl-20">
          {/* Vertical timeline line */}
          <div
            className="timeline-line absolute left-4 md:left-8 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(180deg, #4f8ef7, #7c3aed)',
              transform: 'scaleY(0)',
              transformOrigin: 'top',
            }}
          />

          {EXPERIENCE.map((exp) => (
            <div key={exp.role} className="relative mb-12">
              {/* Dot */}
              <div
                className="timeline-dot absolute -left-[calc(2.5rem-2px)] md:-left-[calc(5rem-2px)] top-6 w-4 h-4 rounded-full border-2 border-[#4f8ef7] bg-[#26282e] shadow-glow"
                style={{ transform: 'translateX(-50%)' }}
              />

              {/* Card */}
              <div className="exp-card glass-card rounded-2xl p-8">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-syne font-extrabold text-xl text-white mb-1">{exp.role}</h3>
                    <p className="font-grotesk text-[#4f8ef7] font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-gray-500 block">{exp.period}</span>
                    <span
                      className="font-mono text-xs px-3 py-1 rounded-full mt-1 inline-block"
                      style={{
                        background: 'rgba(79,142,247,0.1)',
                        border: '1px solid rgba(79,142,247,0.2)',
                        color: '#4f8ef7',
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ArrowRight
                        size={14}
                        className="text-[#4f8ef7] flex-shrink-0 mt-1"
                      />
                      <span className="font-grotesk text-gray-300 text-sm leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
