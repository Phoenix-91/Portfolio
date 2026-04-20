'use client'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Mail, X, Send } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'

// Inline SVG for GitHub (not in this lucide-react version)
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

// Inline SVG for LinkedIn (not in this lucide-react version)
function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}


gsap.registerPlugin(useGSAP, ScrollTrigger)

const ICON_MAP: Record<string, React.ReactNode> = {
  mail: <Mail size={20} />,
  github: <GithubIcon size={20} />,
  linkedin: <LinkedinIcon size={20} />,
  twitter: <X size={20} />,
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useGSAP(() => {
    gsap.from('.contact-title', {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.from(['.social-links-col', '.contact-form-col'], {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending (replace with actual API call)
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-28 px-6 relative overflow-hidden">
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(79,142,247,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="contact-title mb-16">
          <p className="font-mono text-[#4f8ef7] text-sm tracking-widest uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="section-heading text-white">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <div className="contact-grid grid md:grid-cols-2 gap-10">
          {/* Left: Social links */}
          <div className="social-links-col space-y-4">
            <p className="font-grotesk text-gray-400 mb-8 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be
              part of your visions.
            </p>
            {SOCIAL_LINKS.map(link => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ x: 6, boxShadow: '0 0 24px rgba(79,142,247,0.15)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center gap-4 glass-card rounded-2xl px-6 py-4 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: 'rgba(79,142,247,0.1)' }}
                >
                  <span className="text-[#4f8ef7] group-hover:text-[#22d3ee] transition-colors">
                    {ICON_MAP[link.icon]}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-grotesk text-xs text-gray-500 mb-0.5">{link.label}</div>
                  <div className="font-grotesk text-sm text-gray-200 truncate group-hover:text-white transition-colors">
                    {link.display}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right: Contact form */}
          <form onSubmit={handleSubmit} className="contact-form-col space-y-5">
            {/* Name */}
            <div className="floating-label-group">
              <input
                id="contact-name"
                type="text"
                placeholder=" "
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <label htmlFor="contact-name">Your Name</label>
            </div>

            {/* Email */}
            <div className="floating-label-group">
              <input
                id="contact-email"
                type="email"
                placeholder=" "
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <label htmlFor="contact-email">Email Address</label>
            </div>

            {/* Message */}
            <div className="floating-label-group">
              <textarea
                id="contact-message"
                placeholder=" "
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
              />
              <label htmlFor="contact-message">Your Message</label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status !== 'idle'}
              whileHover={{ scale: status === 'idle' ? 1.03 : 1, boxShadow: status === 'idle' ? '0 0 24px rgba(79,142,247,0.3)' : 'none' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-grotesk font-semibold text-sm text-white transition-opacity disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}
            >
              {status === 'idle' && (
                <><Send size={16} />Send Message</>
              )}
              {status === 'sending' && (
                <><span className="animate-spin">⟳</span>Sending...</>
              )}
              {status === 'sent' && (
                <>✓ Message Sent!</>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  )
}
