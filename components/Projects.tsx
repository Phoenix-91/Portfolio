'use client'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'

// Inline SVG for GitHub (not in this version of lucide-react)
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}
import { PROJECTS } from '@/lib/constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useGSAP(() => {
    gsap.from('.projects-title', {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    if (isMobile || !trackRef.current) return

    const track = trackRef.current
    const totalWidth = track.scrollWidth - window.innerWidth

    // HORIZONTAL SCROLL with GSAP pin (SKILL.md §6 Horizontal Scroll)
    const horizontalScroll = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: '#projects-section',
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,        // reduces pin-jump jitter (SKILL.md §14)
        invalidateOnRefresh: true, // recalculates on window resize (SKILL.md §12)
      },
    })

    return () => {
      horizontalScroll.kill()
    }
  }, { scope: sectionRef, dependencies: [isMobile] })

  return (
    <section ref={sectionRef} id="projects">
      <div id="projects-section">
        {/* Title — outside the pinned section so it animates in first */}
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
          <div className="projects-title">
            <p className="font-mono text-[#4f8ef7] text-sm tracking-widest uppercase mb-3">
              Featured Work
            </p>
            <h2 className="section-heading text-white">
              Selected <span className="gradient-text">Projects</span>
            </h2>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className={`projects-track ${isMobile ? 'flex-col' : ''}`}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: '0 20px 60px rgba(79,142,247,0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="project-card glass-card rounded-3xl overflow-hidden flex flex-col relative group"
    >
      {/* Gradient top border (hover reveal) */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.gradient} 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Card content */}
      <div className="p-8 flex flex-col h-full">
        {/* Number */}
        <div className="font-mono text-5xl font-bold text-white/5 leading-none mb-6 select-none">
          {project.id}
        </div>

        {/* Title */}
        <h3 className="font-syne font-extrabold text-2xl text-white mb-3 group-hover:text-[#4f8ef7] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-grotesk text-gray-400 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map(t => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(79,142,247,0.1)',
                border: '1px solid rgba(79,142,247,0.2)',
                color: '#4f8ef7',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-grotesk font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}
            >
              <ExternalLink size={14} />
              Live Demo
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: '#4f8ef7' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-grotesk font-medium text-gray-300 border border-white/15 transition-colors"
            >
              <GithubIcon size={14} />
              GitHub
            </motion.a>
          )}
          {!project.github && !project.live && (
            <span className="flex items-center gap-2 font-mono text-xs text-gray-500">
              <ArrowRight size={12} />
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
