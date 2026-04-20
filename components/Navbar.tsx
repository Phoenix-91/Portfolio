'use client'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV_LINKS } from '@/lib/constants'
import { Menu, X } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useGSAP(() => {
    // Slide down on mount — no loader delay needed
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, { scope: navRef })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      // Active link highlighting
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#26282e]/90 backdrop-blur-xl border-b border-white/5 shadow-glass'
          : 'py-5'
      }`}
      style={!scrolled ? {
        background: 'linear-gradient(180deg, rgba(38,40,46,0.85) 0%, rgba(38,40,46,0) 100%)'
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-syne font-extrabold text-xl gradient-text"
        >
          Paramveer
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`font-grotesk text-sm font-medium transition-all duration-200 relative group ${
                    isActive ? 'text-[#4f8ef7]' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <a
          href="mailto:paramveerpc2211@gmail.com"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium font-grotesk bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] text-white hover:opacity-90 transition-opacity"
        >
          Hire Me
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#2e3038]/95 backdrop-blur-xl border-b border-white/5 py-4">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 font-grotesk transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="px-6 pt-2">
            <a
              href="mailto:paramveerpc2211@gmail.com"
              className="block text-center py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] text-white"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
