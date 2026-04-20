'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial states (from SKILL.md §13 Loading screen)
    gsap.set('#loader-logo', { opacity: 0, y: 20 })
    gsap.set('#loader-bar-fill', { width: '0%' })

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      }
    })

    tl.to('#loader-logo', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    .to('#loader-bar-fill', {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    }, '-=0.2')
    .to('#loader', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }, '+=0.2')

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div id="loader" ref={loaderRef}>
      <div id="loader-logo">PR</div>
      <div id="loader-bar-track">
        <div id="loader-bar-fill" />
      </div>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.3)',
        marginTop: '1rem',
        letterSpacing: '0.1em'
      }}>
        paramveer.dev
      </p>
    </div>
  )
}
