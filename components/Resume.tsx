'use client'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, X } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useGSAP(() => {
    gsap.from('.resume-content', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.resume-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  // Since no actual resume file exists yet, we'll use a placeholder Google Docs embed
  const resumeUrl = 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlvv/view'

  return (
    <section ref={sectionRef} id="resume" className="py-28 px-6 relative overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.5) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="resume-content">
          <p className="font-mono text-[#4f8ef7] text-sm tracking-widest uppercase mb-3">
            My Resume
          </p>
          <h2 className="section-heading text-white mb-4">
            View My <span className="gradient-text">Resume</span>
          </h2>
          <p className="font-grotesk text-gray-400 mb-12 max-w-md mx-auto">
            A summary of my skills, experience, and education — available to view or download.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            {/* View Resume */}
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(79,142,247,0.4)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-grotesk font-semibold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}
            >
              <FileText size={16} />
              View Resume
            </motion.button>

            {/* Download Resume */}
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: '#4f8ef7', color: '#4f8ef7' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-grotesk font-semibold text-gray-300 text-sm border border-white/20 transition-colors"
            >
              <Download size={16} />
              Download Resume
            </motion.a>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 flex-shrink-0">
                <h3 className="font-syne font-bold text-white">Resume — Paramveer Rana</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 bg-[#1a1c21] flex items-center justify-center">
                <div className="text-center p-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4f8ef7]/20 to-[#7c3aed]/20 flex items-center justify-center text-[#4f8ef7] mb-4 mx-auto">
                  <FileText size={32} />
                </div>
                  <p className="font-grotesk text-gray-300 mb-2">Resume preview</p>
                  <p className="font-grotesk text-gray-500 text-sm mb-6">
                    Add your resume PDF link to enable preview
                  </p>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-grotesk font-medium text-white"
                    style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}
                  >
                    <ExternalLinkIcon />
                    Open in New Tab
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
